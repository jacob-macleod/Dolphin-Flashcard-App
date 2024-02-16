// ets_tracing: off
import { chain_ } from "../core.mjs";
import { succeed } from "../succeed.mjs";
/**
 * Conditional logic
 *
 * @ets_data_first ifM_
 */

export function ifM(onTrue, onFalse, __trace) {
  return b => ifM_(b, onTrue, onFalse, __trace);
}
/**
 * Conditional logic
 */

export function ifM_(b, onTrue, onFalse, __trace) {
  return chain_(b, x => x ? onTrue() : onFalse(), __trace);
}
/**
 * Conditional logic
 *
 * @ets_data_first if_
 */

function _if(onTrue, onFalse) {
  return b => if_(b, onTrue, onFalse);
}
/**
 * Conditional logic
 */


export function if_(b, onTrue, onFalse, __trace) {
  return ifM_(succeed(b), onTrue, onFalse, __trace);
}
export { _if as if };
//# sourceMappingURL=ifM.mjs.map