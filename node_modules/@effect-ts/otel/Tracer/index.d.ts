import * as T from "@effect-ts/core/Effect";
import * as L from "@effect-ts/core/Effect/Layer";
import * as M from "@effect-ts/core/Effect/Managed";
import type { Has } from "@effect-ts/core/Has";
import type * as OTTracing from "@opentelemetry/sdk-trace-base";
import { TracerProvider } from "../TracerProvider/index.js";
export declare const TracerSymbol: unique symbol;
export declare type TracerSymbol = typeof TracerSymbol;
export interface Tracer {
    readonly [TracerSymbol]: TracerSymbol;
    readonly tracer: OTTracing.Tracer;
}
export declare type HasTracer = Has<Tracer>;
export declare const Tracer: import("@effect-ts/core/Has").Tag<Tracer>;
export declare const makeTracer: (name: string) => M.Managed<Has<TracerProvider>, never, Tracer>;
export declare const LiveTracer: L.Layer<Has<TracerProvider>, never, Has<Tracer>>;
export declare const withTracer: <R_, E_, A_>(f: (_: OTTracing.Tracer) => T.Effect<R_, E_, A_>, __trace?: string | undefined) => T.Effect<R_ & Has<Tracer>, E_, A_>;
//# sourceMappingURL=index.d.ts.map