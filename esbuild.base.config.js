/**
 * Base configuration for esbuild
 * 
 * Options defined here will be applied used in the build of both main.js and ui.js
 * Overrides can be defined in build-figma-plugin.(main|ui).js
 */
module.exports = {
    // Enable source maps
    sourcemap: false,
    
    // Keep the names of functions when minifying
    keepNames: false,

    // You may want to set a sourceRoot to a repository with the code for the packages used
    // I have NOT tested this, but you should be able to navigate through each package's code
    // See https://esbuild.github.io/api/#source-root
    //
    // sourceRoot: 'https://raw.githubusercontent.com/some/repo/v1.2.3/',   
}