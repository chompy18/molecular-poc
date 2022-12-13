const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { dependencies } = require("./package.json");

module.exports = {
	entry: "./src/index",
	mode: "development",
	devServer: {
		port: 3000,
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
			name: "Host",
			remotes: {
				Actions: `Actions@http://localhost:4000/Actions`,
                // Counter: `Counter@http://localhost:4001/Counter`,
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
		new ModuleFederationPlugin({
			name: "Counter",
			remotes: {
                Counter: `Counter@http://localhost:4001/Counter`,
			},
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
