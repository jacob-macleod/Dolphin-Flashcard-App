// ets_tracing: off
import { failureOrCause } from "../../Cause/index.mjs";
import * as E from "../../Either/index.mjs";
import { pipe } from "../../Function/index.mjs";
import { foldCauseM_ } from "../core.mjs";
import { halt } from "./halt.mjs";
/**
 * Recovers from errors by accepting one effect to execute for the case of an
 * error, and one effect to execute for the case of success.
 *
 * @ets_data_first foldM_
 */

export function foldM(failure, success, __trace) {
  return self => foldM_(self, failure, success, __trace);
}
/**
 * Recovers from errors by accepting one effect to execute for the case of an
 * error, and one effect to execute for the case of success.
 */

export function foldM_(self, failure, success, __trace) {
  return foldCauseM_(self, x => E.fold_(failureOrCause(x), failure, halt), success, __trace);
}
//# sourceMappingURL=foldM.mjs.map