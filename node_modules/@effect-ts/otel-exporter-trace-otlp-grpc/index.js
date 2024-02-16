"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeTracingSpanExporter = exports.makeOTLPTraceExporterConfigLayerM = exports.makeOTLPTraceExporterConfigLayer = exports.OTLPTraceExporterConfigTag = exports.OTLPTraceExporterConfigSymbol = exports.OTLPTraceExporterConfig = exports.LiveSimpleProcessor = void 0;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/core/Effect"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/core/Effect/Layer"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/core/Effect/Managed"));

var _Function = /*#__PURE__*/require("@effect-ts/core/Function");

var _Has = /*#__PURE__*/require("@effect-ts/core/Has");

var _otel = /*#__PURE__*/require("@effect-ts/otel");

var _exporterTraceOtlpGrpc = /*#__PURE__*/require("@opentelemetry/exporter-trace-otlp-grpc");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _a; // ets_tracing: off


const OTLPTraceExporterConfigSymbol = /*#__PURE__*/Symbol();
exports.OTLPTraceExporterConfigSymbol = OTLPTraceExporterConfigSymbol;

class OTLPTraceExporterConfig {
  constructor(config) {
    this.config = config;
    this[_a] = OTLPTraceExporterConfigSymbol;
  }

}

exports.OTLPTraceExporterConfig = OTLPTraceExporterConfig;
_a = OTLPTraceExporterConfigSymbol;
const OTLPTraceExporterConfigTag = /*#__PURE__*/(0, _Has.tag)(OTLPTraceExporterConfigSymbol);
exports.OTLPTraceExporterConfigTag = OTLPTraceExporterConfigTag;

const makeOTLPTraceExporterConfigLayer = config => L.fromEffect_(T.succeedWith(() => new OTLPTraceExporterConfig(config)), OTLPTraceExporterConfigTag).setKey(OTLPTraceExporterConfigTag.key);

exports.makeOTLPTraceExporterConfigLayer = makeOTLPTraceExporterConfigLayer;

const makeOTLPTraceExporterConfigLayerM = config => L.fromEffect_(T.map_(config, _ => new OTLPTraceExporterConfig(_)), OTLPTraceExporterConfigTag).setKey(OTLPTraceExporterConfigTag.key);

exports.makeOTLPTraceExporterConfigLayerM = makeOTLPTraceExporterConfigLayerM;
const makeTracingSpanExporter = /*#__PURE__*/M.gen(function* (_) {
  const {
    config
  } = yield* _(OTLPTraceExporterConfigTag);
  const spanExporter = yield* _( // NOTE Unfortunately this workaround/"hack" is currently needed since Otel doesn't yet provide a graceful
  // way to shutdown.
  //
  // Related issue: https://github.com/open-telemetry/opentelemetry-js/issues/987
  M.make_(T.succeedWith(() => new _exporterTraceOtlpGrpc.OTLPTraceExporter(config)), p => T.gen(function* (_) {
    while (1) {
      yield* _(T.sleep(0));
      const promises = p["_sendingPromises"];

      if (promises.length > 0) {
        yield* _(T.result(T.promise(() => Promise.all(promises))));
      } else {
        break;
      }
    }
  })));
  return spanExporter;
});
exports.makeTracingSpanExporter = makeTracingSpanExporter;
const LiveSimpleProcessor = /*#__PURE__*/(0, _otel.SimpleProcessor)(makeTracingSpanExporter);
exports.LiveSimpleProcessor = LiveSimpleProcessor;
//# sourceMappingURL=index.js.map