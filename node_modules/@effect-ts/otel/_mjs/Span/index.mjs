var _a; // ets_tracing: off


import * as T from "@effect-ts/core/Effect";
import { pretty } from "@effect-ts/core/Effect/Cause";
import { pipe } from "@effect-ts/core/Function";
import { tag } from "@effect-ts/core/Has";
import * as O from "@effect-ts/core/Option";
import * as OTApi from "@opentelemetry/api";
import { context, trace } from "@opentelemetry/api";
import { withTracer } from "../Tracer/index.mjs";
export const SpanSymbol = /*#__PURE__*/Symbol();
export class SpanImpl {
  constructor(span) {
    this.span = span;
    this[_a] = SpanSymbol;
  }

}
_a = SpanSymbol;
export const Span = /*#__PURE__*/tag();
export function withSpan(name, options, ctx) {
  return effect => {
    const createSpan = withTracer(tracer => T.access(r => {
      const maybeSpan = Span.readOption(r);

      if (ctx) {
        return tracer.startSpan(name, options, ctx);
      }

      if ((options === null || options === void 0 ? void 0 : options.root) !== true && O.isSome(maybeSpan)) {
        const ctx = trace.setSpan(context.active(), maybeSpan.value.span);
        return tracer.startSpan(name, options, ctx);
      }

      return tracer.startSpan(name, { ...options,
        root: true
      });
    }));
    return T.bracketExit_(createSpan, s => T.provideService(Span)(new SpanImpl(s))(effect), (s, e) => T.succeedWith(() => {
      if (e._tag === "Failure") {
        s.setAttribute("error.type", "Fiber Failure");
        s.setAttribute("error.message", "An Effect Has A Failure");
        s.setAttribute("error.stack", pretty(e.cause));
        s.setStatus({
          code: OTApi.SpanStatusCode.ERROR
        });
      } else {
        s.setStatus({
          code: OTApi.SpanStatusCode.OK
        });
      }

      s.end();
    }));
  };
}
export function addAttribute(name, value) {
  return T.accessServiceM(Span)(_ => T.succeedWith(() => {
    _.span.setAttribute(name, value);
  }));
}
export function addEvent(name, attributesOrStartTime, startTime) {
  return T.accessServiceM(Span)(_ => T.succeedWith(() => {
    _.span.addEvent(name, attributesOrStartTime, startTime);
  }));
}
//# sourceMappingURL=index.mjs.map