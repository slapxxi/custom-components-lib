/* eslint-disable */
module.exports = {
  entry: "./src/index.js", // Your entry file
  output: {
    path: __dirname + "/dist",
    filename: "my-library.js",
    library: "MyLibrary", // Global variable name for UMD build
    libraryTarget: "umd", // Support CommonJS, AMD, and global
    globalObject: "this", // Fix for Node and browser environments
  },
  mode: "production",
  // other configs like loaders, plugins...
};
