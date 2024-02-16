"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeNodeTracingProvider = exports.NodeTracerProviderConfig = exports.NodeProviderLayer = exports.NodeProvider = exports.LiveNodeTracerProviderConfig = void 0;

var _core = /*#__PURE__*/require("@effect-ts/core");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/core/Effect"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/core/Effect/Layer"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/core/Effect/Managed"));

var _Function = /*#__PURE__*/require("@effect-ts/core/Function");

var _Has = /*#__PURE__*/require("@effect-ts/core/Has");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/core/Option"));

var OT = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/otel"));

var _sdkTraceNode = /*#__PURE__*/require("@opentelemetry/sdk-trace-node");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const NodeTracerProviderConfigSymbol = /*#__PURE__*/Symbol();
const NodeTracerProviderConfig = /*#__PURE__*/(0, _Has.tag)(NodeTracerProviderConfigSymbol);
exports.NodeTracerProviderConfig = NodeTracerProviderConfig;

const LiveNodeTracerProviderConfig = config => L.fromValue(NodeTracerProviderConfig)({
  config
});

exports.LiveNodeTracerProviderConfig = LiveNodeTracerProviderConfig;
const makeNodeTracingProvider = /*#__PURE__*/M.gen(function* (_) {
  const env = yield* _(T.environment());
  const config = O.toUndefined(O.map_(NodeTracerProviderConfig.readOption(env), _ => _.config));
  const tracerProvider = yield* _(T.succeedWith(() => new _sdkTraceNode.NodeTracerProvider(config)));
  return {
    [OT.TracerProviderSymbol]: OT.TracerProviderSymbol,
    tracerProvider
  };
});
exports.makeNodeTracingProvider = makeNodeTracingProvider;
const NodeProviderLayer = /*#__PURE__*/L.fromManaged(OT.TracerProvider)(makeNodeTracingProvider);
exports.NodeProviderLayer = NodeProviderLayer;

const NodeProvider = config => config ? NodeProviderLayer["<<<"](LiveNodeTracerProviderConfig(config)) : NodeProviderLayer;

exports.NodeProvider = NodeProvider;
//# sourceMappingURL=index.js.map