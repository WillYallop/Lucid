const path = require('path');

module.exports = {
  entry: {
    'route-generator':'./src/util/route-generator.ts',
    'build-page': './src/util/build-page.ts'

  },
  mode: 'production',
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
    path: path.resolve(__dirname, './util'),
  },
};