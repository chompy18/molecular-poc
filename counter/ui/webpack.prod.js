const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
	mode: "production",

	plugins: [
		new ModuleFederationPlugin({
			name: "Counter",
			filename: "remoteEntry.js",

			exposes: {
				"./Counter": "./src/Counter",
			},
		}),
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [
								"@babel/preset-env",
								[
									"@babel/preset-react",
									{ runtime: "automatic" },
								],
							],
						},
					},
				],
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},
};
