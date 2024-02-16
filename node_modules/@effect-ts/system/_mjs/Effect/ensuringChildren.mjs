import * as Fiber from "../Fiber/index.mjs";
import { pipe } from "../Function/index.mjs";
import { track } from "../Supervisor/index.mjs";
import * as core from "./core.mjs";
import * as ensuring from "./ensuring.mjs";
/**
 * Acts on the children of this fiber, guaranteeing the specified callback
 * will be invoked, whether or not this effect succeeds.
 *
 * @ets_data_first ensuringChildren_
 */

export function ensuringChildren(children, __trace) {
  return fa => ensuringChildren_(fa, children, __trace);
}
/**
 * Acts on the children of this fiber, guaranteeing the specified callback
 * will be invoked, whether or not this effect succeeds.
 */

export function ensuringChildren_(fa, children, __trace) {
  return core.chain_(track, s => ensuring.ensuring_(core.supervised_(fa, s), core.chain_(s.value, children), __trace));
}
/**
 * Acts on the children of this fiber (collected into a single fiber),
 * guaranteeing the specified callback will be invoked, whether or not
 * this effect succeeds.
 */

export function ensuringChild_(fa, f, __trace) {
  return ensuringChildren_(fa, x => f(Fiber.collectAll(x)), __trace);
}
/**
 * Acts on the children of this fiber (collected into a single fiber),
 * guaranteeing the specified callback will be invoked, whether or not
 * this effect succeeds.
 *
 * @ets_data_first ensuringChild_
 */

export function ensuringChild(f, __trace) {
  return fa => ensuringChild_(fa, f, __trace);
}
//# sourceMappingURL=ensuringChildren.mjs.map