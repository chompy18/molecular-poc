const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const { dependencies } = require("./package.json");

module.exports = {
	entry: "./src/index",
	mode: "development",
	devServer: {
    port: 4000,
		static: {
			directory: path.join(__dirname, "public"),
		},
	},
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
	plugins: [
		new ModuleFederationPlugin({
			name: "Actions",
			filename: "Actions",
			exposes: {
				"./Actions": "./src/Actions",
			},
			// shared: {
			// 	...dependencies,
			// 	react: {
			// 		singleton: true,
			// 		requiredVersion: dependencies["react"],
			// 	},
			// 	"react-dom": {
			// 		singleton: true,
			// 		requiredVersion: dependencies["react-dom"],
			// 	},
			// },
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
	resolve: {
		extensions: [".js", ".jsx"],
	},
	target: "web",
};
