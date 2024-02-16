import * as L from "@effect-ts/core/Effect/Layer";
import * as M from "@effect-ts/core/Effect/Managed";
import * as OT from "@effect-ts/otel";
import type { NodeTracerConfig } from "@opentelemetry/sdk-trace-node";
export interface NodeTracerProviderConfig {
    readonly config: NodeTracerConfig;
}
export declare const NodeTracerProviderConfig: import("@effect-ts/system/Has").Tag<NodeTracerProviderConfig>;
export declare const LiveNodeTracerProviderConfig: (config: NodeTracerConfig) => L.Layer<unknown, never, import("@effect-ts/system/Has").Has<NodeTracerProviderConfig>>;
export declare const makeNodeTracingProvider: M.Managed<unknown, never, OT.TracerProvider>;
export declare const NodeProviderLayer: L.Layer<unknown, never, import("@effect-ts/system/Has").Has<OT.TracerProvider>>;
export declare const NodeProvider: (config?: NodeTracerConfig) => L.Layer<unknown, never, import("@effect-ts/system/Has").Has<OT.TracerProvider>>;
//# sourceMappingURL=index.d.ts.map