import sharp from "sharp";
import fs from "fs";
import path from "path";

const size = 512;
const MOLT_BLACK = "#070501";
const MOLT_WHITE = "#f7f1e7";

const fontUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Moulay-Bold-ImdOVJ0KXNOAMvzR8dMEc4mK5BWgQK.ttf";

async function generateFavicon() {
  // Fetch the font from blob storage and base64-encode it
  const response = await fetch(fontUrl);
  const fontArrayBuffer = await response.arrayBuffer();
  const fontBase64 = Buffer.from(fontArrayBuffer).toString("base64");

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
      y="52%"
      dominant-baseline="central"
      text-anchor="middle"
      font-family="MoulayBold"
      font-weight="bold"
      font-size="380"
      fill="${MOLT_WHITE}"
    >M</text>
  </svg>
  `;

  const pngBuffer = await sharp(Buffer.from(svg))
    .resize(512, 512)
    .png()
    .toBuffer();

  // Output as base64 so we can capture and write it
  console.log("BASE64_START");
  console.log(pngBuffer.toString("base64"));
  console.log("BASE64_END");
}

generateFavicon().catch((err) => console.error("Error:", err));
