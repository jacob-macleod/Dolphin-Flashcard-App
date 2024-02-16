"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpanSymbol = exports.SpanImpl = exports.Span = void 0;
exports.addAttribute = addAttribute;
exports.addEvent = addEvent;
exports.withSpan = withSpan;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/core/Effect"));

var _Cause = /*#__PURE__*/require("@effect-ts/core/Effect/Cause");

var _Function = /*#__PURE__*/require("@effect-ts/core/Function");

var _Has = /*#__PURE__*/require("@effect-ts/core/Has");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/core/Option"));

var OTApi = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@opentelemetry/api"));

var _index = /*#__PURE__*/require("../Tracer/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _a; // ets_tracing: off


const SpanSymbol = /*#__PURE__*/Symbol();
exports.SpanSymbol = SpanSymbol;

class SpanImpl {
  constructor(span) {
    this.span = span;
    this[_a] = SpanSymbol;
  }

}

exports.SpanImpl = SpanImpl;
_a = SpanSymbol;
const Span = /*#__PURE__*/(0, _Has.tag)();
exports.Span = Span;

function withSpan(name, options, ctx) {
  return effect => {
    const createSpan = (0, _index.withTracer)(tracer => T.access(r => {
      const maybeSpan = Span.readOption(r);

      if (ctx) {
        return tracer.startSpan(name, options, ctx);
      }

      if ((options === null || options === void 0 ? void 0 : options.root) !== true && O.isSome(maybeSpan)) {
        const ctx = OTApi.trace.setSpan(OTApi.context.active(), maybeSpan.value.span);
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
        s.setAttribute("error.stack", (0, _Cause.pretty)(e.cause));
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

function addAttribute(name, value) {
  return T.accessServiceM(Span)(_ => T.succeedWith(() => {
    _.span.setAttribute(name, value);
  }));
}

function addEvent(name, attributesOrStartTime, startTime) {
  return T.accessServiceM(Span)(_ => T.succeedWith(() => {
    _.span.addEvent(name, attributesOrStartTime, startTime);
  }));
}
//# sourceMappingURL=index.js.map