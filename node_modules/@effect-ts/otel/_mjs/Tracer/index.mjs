// ets_tracing: off
import * as T from "@effect-ts/core/Effect";
import * as L from "@effect-ts/core/Effect/Layer";
import * as M from "@effect-ts/core/Effect/Managed";
import { identity } from "@effect-ts/core/Function";
import { tag } from "@effect-ts/core/Has";
import { TracerProvider } from "../TracerProvider/index.mjs";
export const TracerSymbol = /*#__PURE__*/Symbol();
export const Tracer = /*#__PURE__*/tag();
export const makeTracer = name => M.gen(function* (_) {
  const {
    tracerProvider
  } = yield* _(TracerProvider);
  const tracer = yield* _(T.succeedWith(() => tracerProvider.getTracer(name)));
  return {
    [TracerSymbol]: TracerSymbol,
    tracer
  };
});
export const LiveTracer = /*#__PURE__*/L.fromManaged(Tracer)( /*#__PURE__*/makeTracer("@effect-ts/otel/Tracer"));
export const {
  tracer: withTracer
} = /*#__PURE__*/T.deriveAccessM(Tracer)(["tracer"]);
//# sourceMappingURL=index.mjs.map