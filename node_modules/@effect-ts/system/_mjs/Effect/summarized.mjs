// ets_tracing: off
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../Function/index.mjs";
import { suspend } from "./core.mjs";
import * as D from "./do.mjs";
import * as map from "./map.mjs";
/**
 * Summarizes a effect by computing some value before and after execution, and
 * then combining the values to produce a summary, together with the result of
 * execution.
 */

export function summarized_(self, summary, f, __trace) {
  return suspend(() => map.map_(D.bind_(D.bind_(D.bind_(D.do, "start", () => summary), "value", () => self), "end", () => summary), s => Tp.tuple(f(s.start, s.end), s.value)), __trace);
}
/**
 * Summarizes a effect by computing some value before and after execution, and
 * then combining the values to produce a summary, together with the result of
 * execution.
 *
 * @ets_data_first summarized_
 */

export function summarized(summary, f, __trace) {
  return self => summarized_(self, summary, f, __trace);
}
//# sourceMappingURL=summarized.mjs.map