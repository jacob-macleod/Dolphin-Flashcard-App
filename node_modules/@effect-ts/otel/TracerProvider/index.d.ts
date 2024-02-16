import type { BasicTracerProvider } from "@opentelemetry/sdk-trace-base";
export declare const TracerProviderSymbol: unique symbol;
export declare type TracerProviderSymbol = typeof TracerProviderSymbol;
export interface TracerProvider {
    readonly [TracerProviderSymbol]: TracerProviderSymbol;
    readonly tracerProvider: BasicTracerProvider;
}
export declare const TracerProvider: import("@effect-ts/system/Has").Tag<TracerProvider>;
//# sourceMappingURL=index.d.ts.map