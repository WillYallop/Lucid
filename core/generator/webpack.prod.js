const path = require('path');

module.exports = {
  entry: {
    'build-pages': './src/build-pages/main.ts',
    'transfer-app': './src/transfer-app/main.ts' 

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