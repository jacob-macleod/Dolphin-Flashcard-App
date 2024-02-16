import * as L from "@effect-ts/core/Effect/Layer";
import * as M from "@effect-ts/core/Effect/Managed";
import type { SpanExporter } from "@opentelemetry/sdk-trace-base";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { TracerProvider } from "../../TracerProvider/index.js";
export declare const SimpleProcessorSymbol: unique symbol;
export declare type SimpleProcessorSymbol = typeof SimpleProcessorSymbol;
export interface SimpleProcessor {
    readonly [SimpleProcessorSymbol]: SimpleProcessorSymbol;
    readonly spanExporter: SpanExporter;
    readonly spanProcessor: SimpleSpanProcessor;
}
export declare const makeSimpleProcessor: <R, E, A extends SpanExporter>(exporter: M.Managed<R, E, A>) => M.Managed<import("@effect-ts/core/Has").Has<TracerProvider> & R, E, SimpleProcessor>;
export declare const SimpleProcessorTag: import("@effect-ts/core/Has").Tag<SimpleProcessor>;
export declare function SimpleProcessor<R, E, A extends SpanExporter>(exporter: M.Managed<R, E, A>): L.Layer<import("@effect-ts/core/Has").Has<TracerProvider> & R, E, import("@effect-ts/core/Has").Has<SimpleProcessor>>;
export declare const LiveConsoleSimple: L.Layer<import("@effect-ts/core/Has").Has<TracerProvider>, never, import("@effect-ts/core/Has").Has<SimpleProcessor>>;
//# sourceMappingURL=index.d.ts.map