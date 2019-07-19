const path = require('path');

const _env = {};
if (process.env.NODE_ENV !== 'production') {
	_env.mode = 'development';
	if (process.env.DEV_ENV === 'slow') {
		_env.devtool = 'inline-source-map';
	} else if (process.env.DEV_ENV === 'fast') {
		_env.devtool = 'eval';
	}
} else {
	_env.mode = 'production';
	_env.devtool = '';
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
		port: 8080,
		// https://obel.hatenablog.jp/entry/20180217/1518871500
		disableHostCheck: true
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
				use: [ 'css-loader' ]
			}
		]
	},
	resolve: {
		extensions: [ '.mjs', '.js', '.json', '.jsx' ],
		alias: {
			src: path.resolve(__dirname, 'src/'),
			components: path.resolve(__dirname, 'src/components/'),
			scripts: path.resolve(__dirname, 'src/scripts'),
			'react-emotion': path.resolve(__dirname, './no-prefix-emotion.js')
		}
	}
};
