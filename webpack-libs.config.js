const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const autoprefixer = require('autoprefixer');

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

/**
 * Special webpack config to produce libraries.
 * https://webpack.js.org/guides/author-libraries/
 */
module.exports = {
    mode: env,
    devtool: false,
    entry: {
        arkPlayer: `./assets/scripts/arkPlayer.js`,
    },
    output: {
        path: path.resolve('web/static/lib'),
        filename: `Spinitron.[name].js`,
        library: ['Spinitron', '[name]'],
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    resolve: {
        modules: [
            path.resolve('.'), // allow imports relative to the project root
            path.resolve('./node_modules'),
        ],
    },
    optimization: {
        nodeEnv: env,
        minimizer: [
            // JS minifier
            new TerserPlugin({ cache: true, parallel: false, sourceMap: false }),
            // CSS minifier
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                },
                cssProcessorOptions: {
                    map: { inline: false, annotation: true },
                },
            }),
        ],
    },
    stats: {
        entrypoints: false,
        children: false,
        modules: false,
    },
    performance: {
        hints: false,
    },
    watchOptions: {
        aggregateTimeout: 2000,
        ignored: /node_modules/,
        // Use poll, since watching doesn't work with NFS and VirtualBox (i.e. with Vagrant too).
        poll: 3000,
    },
    module: {
        rules: [
            {
                // JS loader, we use babel-loader to transpile JS based on the babel config `babel.config.js`
                test: /\.js$/,
                exclude: /(node_modules|bower)/,
                use: {
                    loader: 'babel-loader',
                    options: { cacheDirectory: true },
                },
            },
            {
                // CSS loader, sass -> postcss to add vendor prefixes -> css -> extract to a file.
                test: /\.s?css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader', options: { sourceMap: false } },
                    {
                        loader: 'postcss-loader',
                        options: { ident: 'postcss', plugins: [autoprefixer()] },
                    },
                    { loader: 'resolve-url-loader', options: { keepQuery: true } },
                    { loader: 'sass-loader', options: { quiet: true } },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader?name=../images/[name].[ext]'],
            },
        ],
    },
    plugins: [
        // CSS extractor
        new MiniCssExtractPlugin({
            filename: `../lib/[name].css`,
            chunkFilename: `../lib/[id].css`,
            ignoreOrder: true,
        }),
    ],
};
