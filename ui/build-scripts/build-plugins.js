import fs from 'fs';
import path from 'path';

export const copy = ({ from, to }) => ({
  name: "copy",
  setup(build) {
    build.onEnd(() => {
      try {
        const srcPath = path.resolve(from);
        const destPath = path.resolve(to);
        fs.copyFileSync(srcPath, destPath);
        console.log(`📄 Copied ${from} to ${to}`);
      } catch (err) {
        console.error("❌ Failed to copy HTML:", err);
      }
    });
  },
});
