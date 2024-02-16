import * as T from "@effect-ts/core/Effect";
import * as L from "@effect-ts/core/Effect/Layer";
import * as M from "@effect-ts/core/Effect/Managed";
import { SimpleProcessor } from "@effect-ts/otel";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import type { OTLPGRPCExporterConfigNode } from "@opentelemetry/otlp-grpc-exporter-base";
export declare const OTLPTraceExporterConfigSymbol: unique symbol;
export declare class OTLPTraceExporterConfig {
    readonly config: OTLPGRPCExporterConfigNode;
    readonly [OTLPTraceExporterConfigSymbol]: symbol;
    constructor(config: OTLPGRPCExporterConfigNode);
}
export declare const OTLPTraceExporterConfigTag: import("@effect-ts/system/Has").Tag<OTLPTraceExporterConfig>;
export declare const makeOTLPTraceExporterConfigLayer: (config: OTLPGRPCExporterConfigNode) => L.Layer<unknown, never, import("@effect-ts/system/Has").Has<OTLPTraceExporterConfig>>;
export declare const makeOTLPTraceExporterConfigLayerM: <R, E>(config: T.Effect<R, E, OTLPGRPCExporterConfigNode>) => L.Layer<R, E, import("@effect-ts/system/Has").Has<OTLPTraceExporterConfig>>;
export declare const makeTracingSpanExporter: M.Managed<import("@effect-ts/system/Has").Has<OTLPTraceExporterConfig> & import("@effect-ts/system/Has").Has<import("@effect-ts/system/Clock").Clock>, never, OTLPTraceExporter>;
export declare const LiveSimpleProcessor: L.Layer<import("@effect-ts/system/Has").Has<import("@effect-ts/otel").TracerProvider> & import("@effect-ts/system/Has").Has<OTLPTraceExporterConfig> & import("@effect-ts/system/Has").Has<import("@effect-ts/system/Clock").Clock>, never, import("@effect-ts/system/Has").Has<SimpleProcessor>>;
//# sourceMappingURL=index.d.ts.map