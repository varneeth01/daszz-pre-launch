import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const zipPath = '/home/runner/workspace/attached_assets/Founder-Vision_1781130871711.zip';
const destDir = '/home/runner/workspace';

const buf = fs.readFileSync(zipPath);

// Find end of central directory record
let eocdOffset = -1;
for (let i = buf.length - 22; i >= 0; i--) {
  if (buf[i] === 0x50 && buf[i+1] === 0x4b && buf[i+2] === 0x05 && buf[i+3] === 0x06) {
    eocdOffset = i;
    break;
  }
}

const cdSize = buf.readUInt32LE(eocdOffset + 12);
const cdOffset = buf.readUInt32LE(eocdOffset + 16);

let pos = cdOffset;
const targetPrefix = 'Founder-Vision/artifacts/daszz/';

while (pos < cdOffset + cdSize) {
  if (buf[pos] !== 0x50 || buf[pos+1] !== 0x4b || buf[pos+2] !== 0x01 || buf[pos+3] !== 0x02) break;
  
  const compression = buf.readUInt16LE(pos + 10);
  const compressedSize = buf.readUInt32LE(pos + 20);
  const uncompressedSize = buf.readUInt32LE(pos + 24);
  const fnLen = buf.readUInt16LE(pos + 28);
  const extraLen = buf.readUInt16LE(pos + 30);
  const commentLen = buf.readUInt16LE(pos + 32);
  const localHeaderOffset = buf.readUInt32LE(pos + 42);
  
  const name = buf.slice(pos + 46, pos + 46 + fnLen).toString('utf8');
  pos += 46 + fnLen + extraLen + commentLen;
  
  if (!name.startsWith(targetPrefix)) continue;
  if (name.endsWith('/')) continue;
  if (name.includes('/dist/') || name.includes('node_modules') || name.includes('.tsbuildinfo')) continue;
  
  // Read local file header
  let lhPos = localHeaderOffset;
  const lhFnLen = buf.readUInt16LE(lhPos + 26);
  const lhExtraLen = buf.readUInt16LE(lhPos + 28);
  const dataStart = lhPos + 30 + lhFnLen + lhExtraLen;
  
  const compressedData = buf.slice(dataStart, dataStart + compressedSize);
  let data;
  if (compression === 0) {
    data = compressedData;
  } else if (compression === 8) {
    data = zlib.inflateRawSync(compressedData);
  } else {
    console.log('Unsupported compression for', name);
    continue;
  }
  
  const relativePath = name.slice('Founder-Vision/'.length);
  const fullDest = path.join(destDir, relativePath);
  fs.mkdirSync(path.dirname(fullDest), { recursive: true });
  fs.writeFileSync(fullDest, data);
  console.log('Extracted:', relativePath);
}

// Also extract api-server routes
const apiPrefix = 'Founder-Vision/artifacts/api-server/src/routes/';
pos = cdOffset;
while (pos < cdOffset + cdSize) {
  if (buf[pos] !== 0x50 || buf[pos+1] !== 0x4b || buf[pos+2] !== 0x01 || buf[pos+3] !== 0x02) break;
  
  const compression = buf.readUInt16LE(pos + 10);
  const compressedSize = buf.readUInt32LE(pos + 20);
  const uncompressedSize = buf.readUInt32LE(pos + 24);
  const fnLen = buf.readUInt16LE(pos + 28);
  const extraLen = buf.readUInt16LE(pos + 30);
  const commentLen = buf.readUInt16LE(pos + 32);
  const localHeaderOffset = buf.readUInt32LE(pos + 42);
  
  const name = buf.slice(pos + 46, pos + 46 + fnLen).toString('utf8');
  pos += 46 + fnLen + extraLen + commentLen;
  
  if (!name.startsWith(apiPrefix)) continue;
  if (name.endsWith('/')) continue;
  
  let lhPos = localHeaderOffset;
  const lhFnLen = buf.readUInt16LE(lhPos + 26);
  const lhExtraLen = buf.readUInt16LE(lhPos + 28);
  const dataStart = lhPos + 30 + lhFnLen + lhExtraLen;
  
  const compressedData = buf.slice(dataStart, dataStart + compressedSize);
  let data;
  if (compression === 0) data = compressedData;
  else if (compression === 8) data = zlib.inflateRawSync(compressedData);
  else continue;
  
  const relativePath = name.slice('Founder-Vision/'.length);
  const fullDest = path.join(destDir, relativePath);
  fs.mkdirSync(path.dirname(fullDest), { recursive: true });
  fs.writeFileSync(fullDest, data);
  console.log('Extracted API:', relativePath);
}

console.log('All done!');
