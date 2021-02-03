module.exports = {
	entry: './src/App.jsx',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader',
					},
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader?modules',
						options: {
							importLoaders: 1,
							modules: true,
						},
					}
				]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	output: {
		filename: 'App.js',
		path: __dirname + '/dist',
	},
};
