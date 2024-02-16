// ets_tracing: off
import * as O from "../Option/index.mjs";
import { chain_, succeed, succeedWith } from "./core.mjs";
import { fail } from "./fail.mjs";
/**
 * Requires that the given `Effect<R, E, Option<A>>` contain a value. If there is no
 * value, then the specified error will be raised.
 *
 * @ets_data_first require_
 */

function _require(error, __trace) {
  return io => require_(io, error, __trace);
}
/**
 * Requires that the given `Effect<R, E, Option<A>>` contain a value. If there is no
 * value, then the specified error will be raised.
 */


export function require_(io, error, __trace) {
  return chain_(io, O.fold(() => chain_(succeedWith(error), fail), succeed), __trace);
}
export { _require as require };
//# sourceMappingURL=require.mjs.map