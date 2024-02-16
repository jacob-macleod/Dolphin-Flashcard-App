// ets_tracing: off
import * as T from "@effect-ts/core/Effect";
import * as L from "@effect-ts/core/Effect/Layer";
import * as M from "@effect-ts/core/Effect/Managed";
import { identity } from "@effect-ts/core/Function";
import { tag } from "@effect-ts/core/Has";
import { ConsoleSpanExporter, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { TracerProvider } from "../../TracerProvider/index.mjs"; //
// Span Processor
//

export const SimpleProcessorSymbol = /*#__PURE__*/Symbol();
export const makeSimpleProcessor = exporter => M.gen(function* (_) {
  const {
    tracerProvider
  } = yield* _(TracerProvider);
  const spanExporter = yield* _(exporter);
  const spanProcessor = yield* _(T.succeedWith(() => new SimpleSpanProcessor(spanExporter)));
  yield* _(T.succeedWith(() => tracerProvider.addSpanProcessor(spanProcessor)));
  return {
    [SimpleProcessorSymbol]: SimpleProcessorSymbol,
    spanExporter,
    spanProcessor
  };
});
export const SimpleProcessorTag = /*#__PURE__*/tag(SimpleProcessorSymbol);
export function SimpleProcessor(exporter) {
  return L.fromManaged(SimpleProcessorTag)(makeSimpleProcessor(exporter));
}
export const LiveConsoleSimple = /*#__PURE__*/SimpleProcessor( /*#__PURE__*/M.succeedWith(() => new ConsoleSpanExporter()));
//# sourceMappingURL=index.mjs.map