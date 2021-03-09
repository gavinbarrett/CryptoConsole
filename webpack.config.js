module.exports = {
	entry: './src/App.tsx',
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
				test: /\.(png|webp)$/,
				use: ['url-loader']
			},
			{
				test: /\.(js|ts|tsx)$/,
				exclude: /node_modules/,
				use: ['ts-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js', '.tsx']
	},
	output: {
		filename: 'App.js',
		path: __dirname + '/dist',
	},
};
