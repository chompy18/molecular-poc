const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { dependencies } = require("./package.json");

const fetchRemoteA = (resolve) => {
	// We define a script tag to use the browser for fetching the remoteEntry.js file
	const script = document.createElement("script");
	script.src = "http://localhost:8081/static/js/main.fc8013d8.js"; // This could be defined anywhere
	// script.src = "http://localhost"; // This could be defined anywhere
	// When the script is loaded we need to resolve the promise back to Module Federation
	script.onload = () => {
		// The script is now loaded on window using the name defined within the remote
		const module = {
			get: (request) => window.RemoteA.get(request),
			init: (arg) => {
				try {
					return window.RemoteA.init(arg);
				} catch (e) {
					console.log("Remote A has already been loaded");
				}
			},
		};
		//   }
		resolve(module);
	};
	// Lastly we inject the script tag into the document's head to trigger the script load
	document.head.appendChild(script);
};

module.exports = {
	entry: "./src/index",
	mode: "development",
	devServer: {
		port: 3003,
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
				// Actions: `Actions@http://localhost:4000/Actions`,
				Actions: `Actions@http://localhost:8081/remoteEntry.js`,
				Counter: `Counter@http://localhost:4001/Counter`,
				// Actions: `promise new Promise(${fetchRemoteA.toString()})`,
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

// "http://localhost/static/js/main.fc8013d8.js"
