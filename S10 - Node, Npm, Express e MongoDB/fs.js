const fs = require("fs").promises;
const path = require("path");

async function readdir(rootDir) {
  const correctDir = rootDir || path.resolve(__dirname);
  const files = await fs.readdir(correctDir);

  walk(files, correctDir);
}

async function walk(files, dir) {
  for (const file of files) {
    const fileFullPath = path.resolve(dir, file);
    const stats = await fs.stat(fileFullPath);

    if (/\.git/g.test(fileFullPath) || /node_modules/g.test(fileFullPath)) continue;

    if (stats.isDirectory()) {
      readdir(fileFullPath);
      continue;
    }

    if (!/\.css$/g.test(fileFullPath)) continue;

    console.log(fileFullPath);
  }
}

readdir("./");
