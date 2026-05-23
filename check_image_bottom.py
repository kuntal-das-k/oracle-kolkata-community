import os
from PIL import Image

assets_dir = r"d:\Oracle-Community\src\assets"
img_path = os.path.join(assets_dir, "kolkata_skyline_red.png")

if os.path.exists(img_path):
    with Image.open(img_path) as img:
        width, height = img.size
        print(f"Image Dimensions: {width}x{height}")
        
        # Let's inspect the bottom rows to find the first row containing actual artwork.
        # We start from the very bottom (y = height - 1) and go upwards.
        first_artwork_row = -1
        for y in range(height - 1, -1, -1):
            row_has_artwork = False
            for x in range(width):
                pixel = img.getpixel((x, y))
                if len(pixel) == 4:
                    r, g, b, a = pixel
                else:
                    r, g, b = pixel
                
                # Detect red artwork pixel or non-white pixel (since bg is white)
                is_red = (abs(r - g) >= 12 or abs(g - b) >= 12)
                is_artwork = is_red or (r < 245 or g < 245 or b < 245)
                if is_artwork:
                    row_has_artwork = True
                    first_artwork_row = y
                    break
            if row_has_artwork:
                break
                
        if first_artwork_row != -1:
            empty_bottom_rows = (height - 1) - first_artwork_row
            print(f"First row from the bottom containing artwork: y={first_artwork_row}")
            print(f"Empty/White margin height at the bottom: {empty_bottom_rows} pixels ({(empty_bottom_rows/height*100):.1f}% of total height)")
        else:
            print("No artwork found in the image!")
else:
    print("File not found")
