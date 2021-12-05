const path = require("path");
const lucidConfig = require('../lucid.config');
const vueSrc = "./src";


module.exports = {
  outputDir: path.resolve('../', lucidConfig.directories.cms_dist),
  runtimeCompiler: true,
  css: {
    requireModuleExtension: true,
    loaderOptions: {
        sass: {
            prependData: `@import "@/assets/scss/main.scss";`
        }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, vueSrc)
      },
      extensions: ['.js', '.vue', '.json']
    }
  }
};