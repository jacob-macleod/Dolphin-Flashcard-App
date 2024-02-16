import '@contentlayer/utils/effect/Tracing/Enable';
import type { WebpackOptionsNormalized } from 'webpack';
export type NextPluginOptions = {
    configPath?: string | undefined;
};
export declare const runBeforeWebpackCompile: ({ mode, pluginOptions, devServerStartedRef, }: {
    mode: WebpackOptionsNormalized['mode'];
    pluginOptions: NextPluginOptions;
    devServerStartedRef: {
        current: boolean;
    };
}) => Promise<void>;
//# sourceMappingURL=plugin.d.ts.map