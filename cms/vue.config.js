const path = require("path");
const vueSrc = "./src";
module.exports = {
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