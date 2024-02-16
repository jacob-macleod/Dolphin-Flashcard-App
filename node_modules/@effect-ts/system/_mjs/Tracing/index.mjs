// ets_tracing: off
import { isTracingEnabled } from "./Global/index.mjs";
export const tracingSymbol = "$trace";
let currentTraceCall;
export function traceCall(f, trace) {
  if (!isTracingEnabled() || !trace) {
    return f;
  } // @ts-expect-error


  return (...args) => {
    currentTraceCall = trace;
    const res = f(...args);
    currentTraceCall = undefined;
    return res;
  };
}
export function traceCallLast(f, __trace) {
  return (a, t) => t ? f(a, t) : f(a, __trace);
}
export function accessCallTrace() {
  if (!isTracingEnabled() || !currentTraceCall) {
    return undefined;
  }

  const callTrace = currentTraceCall;
  currentTraceCall = undefined;
  return callTrace;
}
export * from "./Global/index.mjs";
//# sourceMappingURL=index.mjs.map