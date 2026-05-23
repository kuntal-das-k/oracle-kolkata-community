import os
from PIL import Image
from collections import Counter

assets_dir = r"d:\Oracle-Community\src\assets"
brain_dir = r"C:\Users\VICTUS\.gemini\antigravity-ide\brain\a9c0ffe6-f2d8-4089-a5e3-65fc9746d017"

def inspect_image(filepath, name):
    if not os.path.exists(filepath):
        print(f"{name} does not exist: {filepath}")
        return
    
    print(f"\n--- Inspecting {name} ({filepath}) ---")
    try:
        with Image.open(filepath) as img:
            print(f"Format: {img.format}, Size: {img.size}, Mode: {img.mode}")
            
            # Let's count some pixel colors to see what's in here
            # Resize a copy to 100x100 to quickly count colors
            small_img = img.resize((100, 100))
            pixels = list(small_img.getdata())
            
            transparent_count = 0
            white_count = 0
            gray_count = 0
            other_count = 0
            color_counter = Counter()
            
            for p in pixels:
                if img.mode == 'RGBA':
                    r, g, b, a = p
                    if a == 0:
                        transparent_count += 1
                        continue
                elif img.mode == 'LA':
                    l, a = p
                    if a == 0:
                        transparent_count += 1
                        continue
                else:
                    r, g, b = p[:3]
                
                # Check for white, gray, or other
                if r > 245 and g > 245 and b > 245:
                    white_count += 1
                elif abs(r - g) < 5 and abs(g - b) < 5 and abs(r - b) < 5:
                    # Gray scale pixel
                    gray_count += 1
                else:
                    other_count += 1
                    color_counter[f"rgb({r},{g},{b})"] += 1
            
            print(f"Sample (10,000 pixels):")
            print(f"  Transparent: {transparent_count} ({transparent_count/100}%)")
            print(f"  White/Near-white: {white_count} ({white_count/100}%)")
            print(f"  Gray/Monochrome: {gray_count} ({gray_count/100}%)")
            print(f"  Colored: {other_count} ({other_count/100}%)")
            if other_count > 0:
                print(f"  Top colors: {color_counter.most_common(5)}")
                
    except Exception as e:
        print(f"Failed to inspect {name}: {e}")

inspect_image(os.path.join(assets_dir, "kolkata_skyline.png"), "assets/kolkata_skyline.png")
inspect_image(os.path.join(assets_dir, "kolkata_skyline_red.png"), "assets/kolkata_skyline_red.png")

# Also let's check what images are in the brain folder
if os.path.exists(brain_dir):
    for f in os.listdir(brain_dir):
        if f.endswith('.png') or f.endswith('.jpg'):
            inspect_image(os.path.join(brain_dir, f), f"brain/{f}")
