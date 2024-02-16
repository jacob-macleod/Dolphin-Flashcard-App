// ets_tracing: off
import { chain_, succeed, suspend } from "./core.mjs";
/**
 * Run conditionally onTrue or onFalse
 *
 * @ets_data_first ifM_
 */

export function ifM(onTrue, onFalse, __trace) {
  return b => ifM_(b, onTrue, onFalse, __trace);
}
/**
 * Run conditionally onTrue or onFalse
 */

export function ifM_(b, onTrue, onFalse, __trace) {
  return chain_(b, x => x ? suspend(onTrue, __trace) : suspend(onFalse, __trace));
}
/**
 * Run conditionally onTrue or onFalse
 *
 * @ets_data_first if_
 */

function _if(onTrue, onFalse, __trace) {
  return b => if_(b, onTrue, onFalse, __trace);
}
/**
 * Run conditionally onTrue or onFalse
 */


export function if_(b, onTrue, onFalse, __trace) {
  return ifM_(succeed(b), onTrue, onFalse, __trace);
}
export { _if as if };
//# sourceMappingURL=ifM.mjs.map