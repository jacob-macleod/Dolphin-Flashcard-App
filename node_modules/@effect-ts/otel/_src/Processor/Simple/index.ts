// ets_tracing: off

import * as T from "@effect-ts/core/Effect"
import * as L from "@effect-ts/core/Effect/Layer"
import * as M from "@effect-ts/core/Effect/Managed"
import { identity } from "@effect-ts/core/Function"
import { tag } from "@effect-ts/core/Has"
import type { SpanExporter } from "@opentelemetry/sdk-trace-base"
import { ConsoleSpanExporter, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base"

import { TracerProvider } from "../../TracerProvider/index.js"

//
// Span Processor
//

export const SimpleProcessorSymbol = Symbol()
export type SimpleProcessorSymbol = typeof SimpleProcessorSymbol

export interface SimpleProcessor {
  readonly [SimpleProcessorSymbol]: SimpleProcessorSymbol
  readonly spanExporter: SpanExporter
  readonly spanProcessor: SimpleSpanProcessor
}

export const makeSimpleProcessor = <R, E, A extends SpanExporter>(
  exporter: M.Managed<R, E, A>
) =>
  M.gen(function* (_) {
    const { tracerProvider } = yield* _(TracerProvider)

    const spanExporter = yield* _(exporter)

    const spanProcessor = yield* _(
      T.succeedWith(() => new SimpleSpanProcessor(spanExporter))
    )

    yield* _(T.succeedWith(() => tracerProvider.addSpanProcessor(spanProcessor)))

    return identity<SimpleProcessor>({
      [SimpleProcessorSymbol]: SimpleProcessorSymbol,
      spanExporter,
      spanProcessor
    })
  })

export const SimpleProcessorTag = tag<SimpleProcessor>(SimpleProcessorSymbol)

export function SimpleProcessor<R, E, A extends SpanExporter>(
  exporter: M.Managed<R, E, A>
) {
  return L.fromManaged(SimpleProcessorTag)(makeSimpleProcessor(exporter))
}

export const LiveConsoleSimple = SimpleProcessor(
  M.succeedWith(() => new ConsoleSpanExporter())
)
