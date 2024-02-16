"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withTracer = exports.makeTracer = exports.TracerSymbol = exports.Tracer = exports.LiveTracer = void 0;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/core/Effect"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/core/Effect/Layer"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/core/Effect/Managed"));

var _Function = /*#__PURE__*/require("@effect-ts/core/Function");

var _Has = /*#__PURE__*/require("@effect-ts/core/Has");

var _index = /*#__PURE__*/require("../TracerProvider/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const TracerSymbol = /*#__PURE__*/Symbol();
exports.TracerSymbol = TracerSymbol;
const Tracer = /*#__PURE__*/(0, _Has.tag)();
exports.Tracer = Tracer;

const makeTracer = name => M.gen(function* (_) {
  const {
    tracerProvider
  } = yield* _(_index.TracerProvider);
  const tracer = yield* _(T.succeedWith(() => tracerProvider.getTracer(name)));
  return {
    [TracerSymbol]: TracerSymbol,
    tracer
  };
});

exports.makeTracer = makeTracer;
const LiveTracer = /*#__PURE__*/L.fromManaged(Tracer)( /*#__PURE__*/makeTracer("@effect-ts/otel/Tracer"));
exports.LiveTracer = LiveTracer;
const {
  tracer: withTracer
} = /*#__PURE__*/T.deriveAccessM(Tracer)(["tracer"]);
exports.withTracer = withTracer;
//# sourceMappingURL=index.js.map