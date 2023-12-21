import fs from 'fs';
import zlib from 'zlib';
import brotli from 'brotli';
import { glob } from 'glob';

[
  [zlib.gzipSync, {level: 9}, '.gz'],
  [brotli.compress, { mode: 1, quality: 11, lgwin: 22 }, '.br'],
].forEach(([compressFunction, options, extension]) => {
  console.log(`Compressing bundle with ${extension}`);
  
  glob
    .sync('dist/**/*.?(js|json|html|css)')
    .forEach(filepath => {
      fs.readFile(filepath, (err, buffer) => {
        fs.writeFileSync(
          filepath + extension, // compressedFilePath
          compressFunction(buffer, options), // compressedBuffer
        );
      });
    });

});