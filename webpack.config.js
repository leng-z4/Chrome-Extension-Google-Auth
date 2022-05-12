const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	/* plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: `${__dirname}/src/html/credentials.html`,
					to: `${__dirname}/dist`,
				},
			],
		})
	], */
	entry: `./src/js/main.js`,

	// ファイルの出力設定
	output: {
		//  出力ファイルのディレクトリ名
		path: `${__dirname}/dist`,
		// 出力ファイル名
		filename: "main_bundle.js"
	}
};