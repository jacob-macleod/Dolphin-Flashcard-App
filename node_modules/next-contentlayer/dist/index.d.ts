import type { NextConfig } from 'next';
import { type NextPluginOptions } from './plugin.js';
export type { NextConfig };
export declare const defaultPluginOptions: NextPluginOptions;
/**
 * This function allows you to provide custom plugin options (currently there are none however).
 *
 * @example
 * ```js
 * // next.config.mjs
 * import { createContentlayerPlugin } from 'next-contentlayer'
 *
 * const withContentlayer = createContentlayerPlugin({ configPath: './content/contentlayer.config.ts' })
 *
 * export default withContentlayer({
 *   // My Next.js config
 * })
 * ```
 */
export declare const createContentlayerPlugin: (pluginOptions?: NextPluginOptions) => (nextConfig?: Partial<NextConfig>) => Partial<NextConfig>;
/**
 * Next.js plugin for Contentlayer with default options.
 *
 * If you want to provide custom plugin options, please use {@link createContentlayerPlugin} instead.
 *
 * @example
 * ```js
 * // next.config.mjs
 * import { withContentlayer } from 'next-contentlayer'
 *
 * export default withContentlayer({
 *   // My Next.js config
 * })
 * ```
 */
export declare const withContentlayer: (nextConfig?: Partial<NextConfig>) => Partial<NextConfig>;
//# sourceMappingURL=index.d.ts.map