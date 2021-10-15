const path = require('path');

module.exports = {
  entry: {
    'route-generator':'./util/route-generator.ts',
    'build-page': './util/build-page.ts'

  },

  mode: 'development',
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
};