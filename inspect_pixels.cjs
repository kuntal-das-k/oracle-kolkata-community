const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const imgPath = path.join(__dirname, 'src', 'assets', 'kolkata_skyline_red.png');

if (!fs.existsSync(imgPath)) {
  console.log('File does not exist:', imgPath);
  process.exit(1);
}

const buffer = fs.readFileSync(imgPath);

// Parse PNG chunks
let offset = 8; // skip signature
let width = 0;
let height = 0;
let bitDepth = 0;
let colorType = 0;
let idatBuffers = [];

while (offset < buffer.length) {
  const length = buffer.readUInt32BE(offset);
  const type = buffer.toString('ascii', offset + 4, offset + 8);
  const data = buffer.slice(offset + 8, offset + 8 + length);
  
  if (type === 'IHDR') {
    width = data.readUInt32BE(0);
    height = data.readUInt32BE(4);
    bitDepth = data.readUInt8(8);
    colorType = data.readUInt8(9);
    console.log(`PNG IHDR: ${width}x${height}, bitDepth=${bitDepth}, colorType=${colorType}`);
  } else if (type === 'IDAT') {
    idatBuffers.push(data);
  } else if (type === 'IEND') {
    break;
  }
  
  offset += 12 + length;
}

if (idatBuffers.length === 0) {
  console.log('No IDAT chunks found');
  process.exit(1);
}

const compressedData = Buffer.concat(idatBuffers);
try {
  const decompressed = zlib.inflateSync(compressedData);
  console.log('Decompressed data length:', decompressed.length);
  
  // PNG layout: each scanline starts with a filter byte (1 byte), followed by pixel data.
  // For RGBA (colorType=6, bitDepth=8), each pixel is 4 bytes (R, G, B, A).
  // Total bytes per scanline = 1 + width * 4.
  const bytesPerPixel = 4;
  const stride = 1 + width * bytesPerPixel;
  
  let transparentPixels = 0;
  let coloredPixels = 0;
  let whitePixels = 0;
  let uniqueColors = new Set();
  
  for (let y = 0; y < height; y++) {
    const rowOffset = y * stride + 1; // skip filter byte
    for (let x = 0; x < width; x++) {
      const p = rowOffset + x * bytesPerPixel;
      if (p + 3 >= decompressed.length) break;
      const r = decompressed.readUInt8(p);
      const g = decompressed.readUInt8(p + 1);
      const b = decompressed.readUInt8(p + 2);
      const a = decompressed.readUInt8(p + 3);
      
      if (a === 0) {
        transparentPixels++;
      } else {
        if (r === 255 && g === 255 && b === 255) {
          whitePixels++;
        } else {
          coloredPixels++;
          if (uniqueColors.size < 10) {
            uniqueColors.add(`rgb(${r},${g},${b})`);
          }
        }
      }
    }
  }
  
  const totalPixels = width * height;
  console.log(`Total pixels: ${totalPixels}`);
  console.log(`Transparent pixels: ${transparentPixels} (${(transparentPixels/totalPixels*100).toFixed(1)}%)`);
  console.log(`White/opaque pixels: ${whitePixels} (${(whitePixels/totalPixels*100).toFixed(1)}%)`);
  console.log(`Non-white colored pixels: ${coloredPixels} (${(coloredPixels/totalPixels*100).toFixed(1)}%)`);
  console.log('Sample non-white colors:', Array.from(uniqueColors));
  
} catch (e) {
  console.log('Failed to decompress IDAT:', e.message);
}
