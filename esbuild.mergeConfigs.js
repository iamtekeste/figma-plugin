const { basename } = require("node:path");
const { parseArgs } = require("node:util");
const baseConfig = require('./esbuild.base.config');

const camelCase = str => str.replace(/(?<!-)-\w/g, m => m[1].toUpperCase());

const esbuildArgs = process.argv.slice(2)
    .map(o => camelCase(o.replace(/^(--)esb-|.*/, '$1')))
    .filter(Boolean);

const { values: cliOptions } = parseArgs({
  args: esbuildArgs,
  strict: false,
  allowPositionals: false
});

/**
 * Creates a function that will merge esbuild configs in the following order:
 * 
 * 1. Build options from `build-figma-plugin` tool from `@create-figma-plugin/build`
 * 2. Base esbuild config from from `esbuild.base.config.(js|json)` in this folder
 * 3. The {@param overrides}
 * 4. CLI options that start with `--esb-` (note: --esb-keep-names and --esb-keepNames are equivalent)
 * 
 * Also, if a `--show-config` is in the `process.argv` array, the final config object will be printed 
 * 
 * @param {*} overrides esbuild options
 * @returns 
 */
function mergeConfigs(overrides) {
  return cfpOptions => {
    const finalConfig = {
      ...cfpOptions,
      ...baseConfig,
      ...(overrides ?? {}),
      ...(cliOptions ?? {})
    };
    
    if (process.argv.includes('--show-config')) {
        console.log(`
  ///////////////////////////////////////////////////////////////
    esbuild configuration for ${basename(finalConfig.outfile)}
  ===============================================================
  `);
        console.log(finalConfig);
        console.log(`
  ///////////////////////////////////////////////////////////////\n`);
      }

      return finalConfig;
    };
};

module.exports = mergeConfigs;