// ets_tracing: off
import * as Fiber from "../Fiber/index.mjs";
import * as FR from "../FiberRef/index.mjs";
import { pipe } from "../Function/index.mjs";
import * as O from "../Option/index.mjs";
import { fork } from "./core.mjs";
import { uninterruptibleMask } from "./interruption.mjs";
import * as zips from "./zips.mjs";
/**
 * Forks the effect into a new independent fiber, with the specified name.
 *
 * @ets_data_first forkAs_
 */

export function forkAs(name, __trace) {
  return self => forkAs_(self, name, __trace);
}
/**
 * Forks the effect into a new independent fiber, with the specified name.
 */

export function forkAs_(self, name, __trace) {
  return uninterruptibleMask(({
    restore
  }) => fork(zips.zipRight_(FR.set_(Fiber.fiberName, O.some(name)), restore(self)), __trace));
}
//# sourceMappingURL=forkAs.mjs.map