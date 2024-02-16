// ets_tracing: off
import * as L from "../Collections/Immutable/List/core.mjs";
import * as O from "../Option/index.mjs";
import * as S from "../Sync/index.mjs";
import { prettyFiberId } from "./id.mjs";
export class NoLocation {
  constructor() {
    this._tag = "NoLocation";
  }

}
export class SourceLocation {
  constructor(location) {
    this.location = location;
    this._tag = "SourceLocation";
  }

}
export function traceLocation(k) {
  if (k) {
    return new SourceLocation(k);
  }

  return new NoLocation();
}
export class Trace {
  constructor(fiberId, executionTrace, stackTrace, parentTrace) {
    this.fiberId = fiberId;
    this.executionTrace = executionTrace;
    this.stackTrace = stackTrace;
    this.parentTrace = parentTrace;
  }

}
export function ancestryLengthSafe(trace, i) {
  const parent = trace.parentTrace;

  if (parent._tag === "None") {
    return S.succeed(i);
  } else {
    return S.suspend(() => ancestryLengthSafe(parent.value, i + 1));
  }
}
export function ancestryLength(trace) {
  return S.run(ancestryLengthSafe(trace, 0));
}
export function parents(trace) {
  const pushable = L.emptyPushable();
  let parent = O.toUndefined(trace.parentTrace);

  while (parent != null) {
    L.push_(pushable, parent);
    parent = O.toUndefined(parent.parentTrace);
  }

  return pushable;
}
export function truncatedParentTrace(trace, maxAncestors) {
  if (ancestryLength(trace) > maxAncestors) {
    return L.reduceRight_(L.take_(parents(trace), maxAncestors), O.none, (trace, parent) => O.some(new Trace(trace.fiberId, trace.executionTrace, trace.stackTrace, parent)));
  } else {
    return trace.parentTrace;
  }
}
export function prettyTrace(trace) {
  return S.run(prettyTraceSafe(trace));
}
export function prettyTraceSafe(trace) {
  return S.gen(function* ($) {
    const execution = L.filter_(trace.executionTrace, _ => _._tag === "SourceLocation");
    const stack = L.filter_(trace.stackTrace, _ => _._tag === "SourceLocation");
    const execTrace = !L.isEmpty(execution);
    const stackTrace = !L.isEmpty(stack);
    const execPrint = execTrace ? [`Fiber: ${prettyFiberId(trace.fiberId)} Execution trace:`, "", ...L.toArray(L.map_(execution, a => `  ${a.location}`))] : [`Fiber: ${prettyFiberId(trace.fiberId)} Execution trace: <empty trace>`];
    const stackPrint = stackTrace ? [`Fiber: ${prettyFiberId(trace.fiberId)} was supposed to continue to:`, "", ...L.toArray(L.map_(stack, e => `  a future continuation at ${e.location}`))] : [`Fiber: ${prettyFiberId(trace.fiberId)} was supposed to continue to: <empty trace>`];
    const parent = trace.parentTrace;
    const ancestry = parent._tag === "None" ? [`Fiber: ${prettyFiberId(trace.fiberId)} was spawned by: <empty trace>`] : [`Fiber: ${prettyFiberId(trace.fiberId)} was spawned by:`, yield* $(prettyTraceSafe(parent.value))];
    return ["", ...stackPrint, "", ...execPrint, "", ...ancestry].join("\n");
  });
}
//# sourceMappingURL=tracing.mjs.map