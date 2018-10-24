const path = require('path');

const _env = {};
if (process.env.NODE_ENV === 'production') {
  _env.mode = 'production';
  _env.devtool = '';
} else {
  _env.mode = 'development';
  if (~process.env.NODE_ENV.indexOf('fast')) {
    _env.devtool = 'eval';
  } else {
    _env.devtool = 'inline-source-map';
  }
}

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/pages/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    host: '0.0.0.0',
    port: 8080
    // open: true
  },
  mode: _env.mode,
  devtool: _env.devtool,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
    alias: {
      atoms: path.resolve(__dirname, 'src/components/atoms/'),
      molecules: path.resolve(__dirname, 'src/components/molecules/'),
      organisms: path.resolve(__dirname, 'src/components/organisms/'),
      templates: path.resolve(__dirname, 'src/components/templates/'),
      utilities: path.resolve(__dirname, 'src/components/utilities/'),
      theme: path.resolve(__dirname, 'src/components/theme/'),
      'react-emotion': path.resolve(__dirname, './no-prefix-emotion.js')
    }
  }
};
