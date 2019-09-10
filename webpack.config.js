const webpack = require('webpack');
const path = require('path');

const _env = {};
if (process.env.NODE_ENV !== 'production') {
  _env.mode = 'development';
  if (process.env.DEV_ENV === 'fast') {
    _env.devtool = 'inline-source-map';
  } else {
    _env.devtool = 'eval';
  }
} else {
  _env.mode = 'production';
  _env.devtool = '';
}

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/pages/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[chunkhash].bundle.js',
  },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development', DEV_ENV: '' }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    host: '0.0.0.0',
    // host: 'localhost',
    port: 8080,
    // https://obel.hatenablog.jp/entry/20180217/1518871500
    disableHostCheck: true,
    // open: true
  },
  watchOptions: {
    // aggregateTimeout: 300,
    // poll: 1000,
    ignored: /node_modules/,
  },
  mode: _env.mode,
  devtool: _env.devtool,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // disable type checker - we will use it in fork plugin
              // transpileOnly: true
            },
          },
          // {
          // 	loader: 'eslint-loader'
          // }
        ],
        exclude: [/node_modules/],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
    ],
  },
  // plugins: [ new ForkTsCheckerWebpackPlugin() ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      // src: path.resolve(__dirname, 'src/'),
      components: path.resolve(__dirname, './src/components/'),
      scripts: path.resolve(__dirname, './src/scripts'),
      icons: path.resolve(__dirname, './src/icons'),
      fonts: path.resolve(__dirname, './src/fonts'),
      images: path.resolve(__dirname, './src/images'),
    },
  },
};
