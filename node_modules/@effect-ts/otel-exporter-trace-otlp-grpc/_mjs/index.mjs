var _a; // ets_tracing: off


import * as T from "@effect-ts/core/Effect";
import * as L from "@effect-ts/core/Effect/Layer";
import * as M from "@effect-ts/core/Effect/Managed";
import { pipe } from "@effect-ts/core/Function";
import { tag } from "@effect-ts/core/Has";
import { SimpleProcessor } from "@effect-ts/otel";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
export const OTLPTraceExporterConfigSymbol = /*#__PURE__*/Symbol();
export class OTLPTraceExporterConfig {
  constructor(config) {
    this.config = config;
    this[_a] = OTLPTraceExporterConfigSymbol;
  }

}
_a = OTLPTraceExporterConfigSymbol;
export const OTLPTraceExporterConfigTag = /*#__PURE__*/tag(OTLPTraceExporterConfigSymbol);
export const makeOTLPTraceExporterConfigLayer = config => L.fromEffect_(T.succeedWith(() => new OTLPTraceExporterConfig(config)), OTLPTraceExporterConfigTag).setKey(OTLPTraceExporterConfigTag.key);
export const makeOTLPTraceExporterConfigLayerM = config => L.fromEffect_(T.map_(config, _ => new OTLPTraceExporterConfig(_)), OTLPTraceExporterConfigTag).setKey(OTLPTraceExporterConfigTag.key);
export const makeTracingSpanExporter = /*#__PURE__*/M.gen(function* (_) {
  const {
    config
  } = yield* _(OTLPTraceExporterConfigTag);
  const spanExporter = yield* _( // NOTE Unfortunately this workaround/"hack" is currently needed since Otel doesn't yet provide a graceful
  // way to shutdown.
  //
  // Related issue: https://github.com/open-telemetry/opentelemetry-js/issues/987
  M.make_(T.succeedWith(() => new OTLPTraceExporter(config)), p => T.gen(function* (_) {
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
export const LiveSimpleProcessor = /*#__PURE__*/SimpleProcessor(makeTracingSpanExporter);
//# sourceMappingURL=index.mjs.map