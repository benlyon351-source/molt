from PIL import Image, ImageDraw, ImageFont

# MOLT brand colours
MOLT_BLACK = (7, 5, 1)
MOLT_WHITE = (247, 241, 231)

# Create 512x512 square canvas
size = 512
img = Image.new("RGB", (size, size), MOLT_BLACK)
draw = ImageDraw.Draw(img)

# Load Moulay-Bold font at a large size
import os
project_root = "/vercel/share/v0-project"
font_path = os.path.join(project_root, "public", "fonts", "Moulay-Bold.ttf")
font = ImageFont.truetype(font_path, 360)

# Measure the "M" glyph
text = "M"
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]

# Centre the glyph on the canvas
x = (size - text_width) / 2 - bbox[0]
y = (size - text_height) / 2 - bbox[1]

draw.text((x, y), text, fill=MOLT_WHITE, font=font)

# Save as PNG (Next.js app/icon.png is auto-detected as favicon)
output_path = os.path.join(project_root, "app", "icon.png")
img.save(output_path, "PNG")
print(f"Favicon saved to {output_path}")
