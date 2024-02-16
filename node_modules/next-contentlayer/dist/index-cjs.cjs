const devServerStartedRef = { current: false };
const defaultPluginOptions = {};
module.exports.defaultPluginOptions = defaultPluginOptions;
/**
 * This function allows you to provide custom plugin options (currently there are none however).
 *
 * @example
 * ```js
 * // next.config.js
 * const { createContentlayerPlugin } = require('next-contentlayer')
 *
 * const withContentlayer = createContentlayerPlugin({ configPath: './content/contentlayer.config.ts' })
 *
 * module.exports = withContentlayer({
 *   // My Next.js config
 * })
 * ```
 */
module.exports.createContentlayerPlugin =
    (pluginOptions = defaultPluginOptions) => (nextConfig) => {
        return {
            ...nextConfig,
            onDemandEntries: {
                maxInactiveAge: 60 * 60 * 1000,
                ...nextConfig.onDemandEntries, // use existing onDemandEntries config if provided by user
            },
            webpack(config, options) {
                config.watchOptions = {
                    ...config.watchOptions,
                    // ignored: /node_modules([\\]+|\/)+(?!\.contentlayer)/,
                    ignored: ['**/node_modules/!(.contentlayer)/**/*'],
                };
                config.plugins.push(new ContentlayerWebpackPlugin(pluginOptions));
                // NOTE workaround for https://github.com/vercel/next.js/issues/17806#issuecomment-913437792
                // https://github.com/contentlayerdev/contentlayer/issues/121
                config.module?.rules?.push({
                    test: /\.m?js$/,
                    type: 'javascript/auto',
                    resolve: {
                        fullySpecified: false,
                    },
                });
                if (typeof nextConfig.webpack === 'function') {
                    return nextConfig.webpack(config, options);
                }
                return config;
            },
        };
    };
/**
 * Next.js plugin for Contentlayer with default options.
 *
 * If you want to provide custom plugin options, please use {@link createContentlayerPlugin} instead.
 *
 * @example
 * ```js
 * // next.config.js
 * const { withContentlayer } = require('next-contentlayer')
 *
 * module.exports = withContentlayer({
 *   // My Next.js config
 * })
 * ```
 */
module.exports.withContentlayer = module.exports.createContentlayerPlugin(defaultPluginOptions);
class ContentlayerWebpackPlugin {
    constructor(pluginOptions) {
        this.pluginOptions = pluginOptions;
    }
    apply(compiler) {
        compiler.hooks.beforeCompile.tapPromise('ContentlayerWebpackPlugin', async () => {
            const { runBeforeWebpackCompile } = await import('./plugin.js');
            await runBeforeWebpackCompile({
                pluginOptions: this.pluginOptions,
                devServerStartedRef,
                mode: compiler.options.mode,
            });
        });
    }
}
//# sourceMappingURL=index-cjs.js.map