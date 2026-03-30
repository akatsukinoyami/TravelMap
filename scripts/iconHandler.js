import fs from "fs";
import path from "path";
import sharp from "sharp";

async function* walk(dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) {
      await handleFolder(entry);
      yield* walk(entry);
    }
    else if (d.isFile()) {
      yield entry;
    }
  }
}

async function main() {
  await fs.promises.mkdir('public/thumb', { recursive: true });

  for await (const filepath of walk('public/icon/')) {
    sharp(filepath)
      .resize({ height: 46 })
      .toFile(filepath.replace('icon/', 'thumb/'))
  }
}

main()
