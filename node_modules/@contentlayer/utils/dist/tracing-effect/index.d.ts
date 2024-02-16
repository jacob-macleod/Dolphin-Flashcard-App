import * as T from '@effect-ts/core/Effect';
import type { Clock } from '@effect-ts/core/Effect/Clock';
import type { Has } from '@effect-ts/core/Has';
import * as OT from '@effect-ts/otel';
export declare const provideJaegerTracing: (serviceName: string) => <R1, E1, A1>(self: T.Effect<R1 & OT.HasTracer, E1, A1>) => T.Effect<Has<Clock> & R1, E1, A1>;
export declare const provideTracing: (tracingServiceName: string, tracer?: 'dummy' | 'otel' | 'based-on-env') => <R1, E1, A1>(self: T.Effect<R1 & OT.HasTracer, E1, A1>) => T.Effect<Has<Clock> & R1, E1, A1>;
export declare const DummyTracing: Has<OT.Tracer>;
export declare const provideDummyTracing: <E, A, R0>(next: T.Effect<Has<OT.Tracer> & R0, E, A>) => T.Effect<R0, E, A>;
//# sourceMappingURL=index.d.ts.map