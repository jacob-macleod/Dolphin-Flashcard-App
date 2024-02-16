// ets_tracing: off
import { pipe } from "@effect-ts/core";
import * as T from "@effect-ts/core/Effect";
import * as L from "@effect-ts/core/Effect/Layer";
import * as M from "@effect-ts/core/Effect/Managed";
import { identity } from "@effect-ts/core/Function";
import { tag } from "@effect-ts/core/Has";
import * as O from "@effect-ts/core/Option";
import * as OT from "@effect-ts/otel";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
const NodeTracerProviderConfigSymbol = /*#__PURE__*/Symbol();
export const NodeTracerProviderConfig = /*#__PURE__*/tag(NodeTracerProviderConfigSymbol);
export const LiveNodeTracerProviderConfig = config => L.fromValue(NodeTracerProviderConfig)({
  config
});
export const makeNodeTracingProvider = /*#__PURE__*/M.gen(function* (_) {
  const env = yield* _(T.environment());
  const config = O.toUndefined(O.map_(NodeTracerProviderConfig.readOption(env), _ => _.config));
  const tracerProvider = yield* _(T.succeedWith(() => new NodeTracerProvider(config)));
  return {
    [OT.TracerProviderSymbol]: OT.TracerProviderSymbol,
    tracerProvider
  };
});
export const NodeProviderLayer = /*#__PURE__*/L.fromManaged(OT.TracerProvider)(makeNodeTracingProvider);
export const NodeProvider = config => config ? NodeProviderLayer["<<<"](LiveNodeTracerProviderConfig(config)) : NodeProviderLayer;
//# sourceMappingURL=index.mjs.map