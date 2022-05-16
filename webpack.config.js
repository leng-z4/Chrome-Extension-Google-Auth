module.exports = {
	entry: `./src/js/background.js`,
	output: {
		path: `${__dirname}/dist`,
		filename: "bg_bundle.js"
	},
    devtool: 'cheap-module-source-map'
};