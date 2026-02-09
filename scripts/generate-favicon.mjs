import sharp from "sharp";
import fs from "fs";
import path from "path";

const size = 512;
const MOLT_BLACK = "#070501";
const MOLT_WHITE = "#f7f1e7";

// Read the font file and base64-encode it for embedding in SVG
const projectRoot = "/vercel/share/v0-project";
const fontPath = path.join(projectRoot, "public", "fonts", "Moulay-Bold.ttf");
const fontBuffer = fs.readFileSync(fontPath);
const fontBase64 = fontBuffer.toString("base64");

const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face {
        font-family: 'MoulayBold';
        src: url('data:font/truetype;base64,${fontBase64}');
        font-weight: bold;
        font-style: normal;
      }
    </style>
  </defs>
  <rect width="${size}" height="${size}" fill="${MOLT_BLACK}" />
  <text
    x="50%"
    y="50%"
    dominant-baseline="central"
    text-anchor="middle"
    font-family="MoulayBold"
    font-weight="bold"
    font-size="380"
    fill="${MOLT_WHITE}"
  >M</text>
</svg>
`;

const outputPath = path.join(projectRoot, "app", "icon.png");

sharp(Buffer.from(svg))
  .resize(512, 512)
  .png()
  .toFile(outputPath)
  .then(() => console.log("Favicon saved to", outputPath))
  .catch((err) => console.error("Error:", err));
