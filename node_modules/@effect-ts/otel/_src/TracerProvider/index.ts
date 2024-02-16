// ets_tracing: off

import { tag } from "@effect-ts/core/Has"
import type { BasicTracerProvider } from "@opentelemetry/sdk-trace-base"

//
// ets_tracing Provider
//

export const TracerProviderSymbol = Symbol()
export type TracerProviderSymbol = typeof TracerProviderSymbol

export interface TracerProvider {
  readonly [TracerProviderSymbol]: TracerProviderSymbol
  readonly tracerProvider: BasicTracerProvider
}

export const TracerProvider = tag<TracerProvider>()
