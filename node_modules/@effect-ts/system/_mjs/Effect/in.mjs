// ets_tracing: off
import { head } from "../Collections/Immutable/Array/index.mjs";
import * as Fiber from "../Fiber/index.mjs";
import { pipe } from "../Function/index.mjs";
import * as O from "../Option/index.mjs";
import * as core from "./core.mjs";
import { forkDaemon } from "./core-scope.mjs";
import * as interruption from "./interruption.mjs";
/**
 * Returns a new effect whose scope will be extended by the specified scope.
 * This means any finalizers associated with the effect will not be executed
 * until the specified scope is closed.
 *
 * @ets_data_first in_
 */

function _in(scope, __trace) {
  return self => in_(self, scope, __trace);
}
/**
 * Returns a new effect whose scope will be extended by the specified scope.
 * This means any finalizers associated with the effect will not be executed
 * until the specified scope is closed.
 */


export function in_(self, scope, __trace) {
  return interruption.uninterruptibleMask(({
    restore
  }) => core.chain_(forkDaemon(restore(self), __trace), fiber => core.chain_(scope.extend(fiber.scope), () => interruption.onInterrupt_(restore(Fiber.join(fiber)), x => O.fold_(head(Array.from(x)), () => Fiber.interrupt(fiber), id => fiber.interruptAs(id))))));
}
export { _in as in };
//# sourceMappingURL=in.mjs.map