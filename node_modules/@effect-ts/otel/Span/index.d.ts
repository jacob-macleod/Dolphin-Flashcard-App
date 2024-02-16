import * as T from "@effect-ts/core/Effect";
import type { Has } from "@effect-ts/core/Has";
import * as OTApi from "@opentelemetry/api";
import type { Tracer } from "../Tracer/index.js";
export declare const SpanSymbol: unique symbol;
export declare type SpanSymbol = typeof SpanSymbol;
export declare class SpanImpl {
    readonly span: OTApi.Span;
    readonly [SpanSymbol]: symbol;
    constructor(span: OTApi.Span);
}
export interface Span extends SpanImpl {
}
export declare const Span: import("@effect-ts/core/Has").Tag<Span>;
export declare function withSpan(name: string, options?: OTApi.SpanOptions, ctx?: OTApi.Context): <R, E, A>(effect: T.Effect<R & Has<Span>, E, A>) => T.Effect<R & Has<Tracer>, E, A>;
export declare function addAttribute(name: string, value: OTApi.SpanAttributeValue): T.Effect<Has<Span>, never, void>;
export declare function addEvent(name: string, attributesOrStartTime?: OTApi.SpanAttributes | OTApi.TimeInput, startTime?: OTApi.TimeInput): T.Effect<Has<Span>, never, void>;
//# sourceMappingURL=index.d.ts.map