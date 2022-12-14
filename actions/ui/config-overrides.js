// const {
// 	override,
// 	disableChunk,
// } = require("customize-cra");

module.exports = (config, context) => {
    
    config.optimization.runtimeChunk = false;
    config.optimization.splitChunks = {
        cacheGroups: {
            default: false,
        },
    };
	// console.log(config);
	return config;
	// const {
	//   buildOptions: { outputPath, filePrefix },
	// } = context;

	// const modifiedConfig = {
	//   ...config,
	//   devServer: {
	//     ...config.devServer,
	//     disableHostCheck: true
	//   },
	//   output: {
	//     ...config.output,
	//     filename: `result.js`,
	//     chunkFilename: `result.[name].js`,
	//     path: "build1"
	//   }
	// };

	// modifiedConfig.optimization.runtimeChunk = false;

	// return modifiedConfig;
};
