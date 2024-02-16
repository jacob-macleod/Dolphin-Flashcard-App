import * as S from '@effect-ts/core/Effect/Experimental/Stream';
import type { Has } from '@effect-ts/core/Has';
import * as OT from '@effect-ts/otel';
import * as OTApi from '@opentelemetry/api';
export * from '@effect-ts/otel';
export type HasSpan = Has<OT.Span>;
export declare const withStreamSpan: (name: string, options?: OTApi.SpanOptions, ctx?: OTApi.Context) => <R, E, A>(stream: S.Stream<R & HasSpan, E, A>) => S.Stream<R & OT.HasTracer, E, A>;
//# sourceMappingURL=OT.d.ts.map