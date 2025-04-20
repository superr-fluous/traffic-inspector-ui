import fs from "fs-extra";
import path from "path";

/**
 * @typedef {Object} CopyParams
 * @property {string} from - The starting value of the range.
 * @property {string} to - The ending value of the range.
 */

/**
 * @param {CopyParams|CopyParams[]} filepaths
 *
 * @example
 * copy({ from: './index.html', to: 'static/index.html' });
 * processRange([{ from: './1.index.html', to: 'static/1.index.html' }, { from: './2.index.html', to: 'static/2.index.html' }]);
 * */
export const copy = (params) => ({
  name: "copy",
  setup(build) {
    build.onEnd(() => {
      /**
       * @param {string} from - filepath to copy
       * @param {string} to - filepath to copy to
       * */
      const _copy = (from, to) => {
        try {
          const srcPath = path.resolve(from);
          const destPath = path.resolve(to);
          fs.copy(srcPath, destPath, {
            overwrite: true,
            errorOnExist: false,
          });
          console.log(`📄 Copied ${from} to ${to}`);
        } catch (err) {
          console.error("❌ Failed to copy:", err);
        }
      };

      if (Array.isArray(params)) {
        params.forEach(({ from, to }) => _copy(from, to));
      } else {
        _copy(params.from, params.to);
      }
    });
  },
});
