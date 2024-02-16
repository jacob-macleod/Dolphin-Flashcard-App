/**
 * Compile MDX w/ esbuild.
 *
 * @param {Options | null | undefined} [options]
 * @return {Plugin}
 */
export function esbuild(options?: Options | null | undefined): Plugin;
export type Plugin = import('esbuild').Plugin;
export type PluginBuild = import('esbuild').PluginBuild;
export type OnLoadArgs = import('esbuild').OnLoadArgs;
export type OnLoadResult = import('esbuild').OnLoadResult;
export type OnResolveArgs = import('esbuild').OnResolveArgs;
export type Message = import('esbuild').Message;
export type VFileValue = import('vfile').VFileValue;
export type VFileMessage = import('vfile-message').VFileMessage;
export type ProcessorOptions = import('@mdx-js/mdx/lib/core.js').ProcessorOptions;
/**
 * Configuration.
 */
export type Options = ProcessorOptions & {
    allowDangerousRemoteMdx?: boolean | null | undefined;
};
