"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LiveConsoleSimple = void 0;
exports.SimpleProcessor = SimpleProcessor;
exports.makeSimpleProcessor = exports.SimpleProcessorTag = exports.SimpleProcessorSymbol = void 0;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/core/Effect"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/core/Effect/Layer"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/core/Effect/Managed"));

var _Function = /*#__PURE__*/require("@effect-ts/core/Function");

var _Has = /*#__PURE__*/require("@effect-ts/core/Has");

var _sdkTraceBase = /*#__PURE__*/require("@opentelemetry/sdk-trace-base");

var _index = /*#__PURE__*/require("../../TracerProvider/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
//
// Span Processor
//
const SimpleProcessorSymbol = /*#__PURE__*/Symbol();
exports.SimpleProcessorSymbol = SimpleProcessorSymbol;

const makeSimpleProcessor = exporter => M.gen(function* (_) {
  const {
    tracerProvider
  } = yield* _(_index.TracerProvider);
  const spanExporter = yield* _(exporter);
  const spanProcessor = yield* _(T.succeedWith(() => new _sdkTraceBase.SimpleSpanProcessor(spanExporter)));
  yield* _(T.succeedWith(() => tracerProvider.addSpanProcessor(spanProcessor)));
  return {
    [SimpleProcessorSymbol]: SimpleProcessorSymbol,
    spanExporter,
    spanProcessor
  };
});

exports.makeSimpleProcessor = makeSimpleProcessor;
const SimpleProcessorTag = /*#__PURE__*/(0, _Has.tag)(SimpleProcessorSymbol);
exports.SimpleProcessorTag = SimpleProcessorTag;

function SimpleProcessor(exporter) {
  return L.fromManaged(SimpleProcessorTag)(makeSimpleProcessor(exporter));
}

const LiveConsoleSimple = /*#__PURE__*/SimpleProcessor( /*#__PURE__*/M.succeedWith(() => new _sdkTraceBase.ConsoleSpanExporter()));
exports.LiveConsoleSimple = LiveConsoleSimple;
//# sourceMappingURL=index.js.map