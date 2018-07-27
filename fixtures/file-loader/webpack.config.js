const path = require('path');

module.exports = {
  mode: 'development',
  context: __dirname,
  devtool: 'cheap-source-map',
  entry: path.resolve(__dirname, './index.js'),
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, './.tmp'),
    publicPath: `${path.resolve(__dirname, './.tmp')}/`,
    filename: 'index.js',
  },
  target: 'node',
  externals: {
    'fs-extra': 'fs-extra',
    path: 'path',
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[hash:6].[ext]',
            },
          },
          {
            loader: path.resolve(__dirname, '../../src'),
          },
        ],
      },
    ],
  },
};
