import { IFiberRefNew } from "../Effect/primitives.mjs";
import { identity } from "../Function/index.mjs";
import { Runtime } from "./fiberRef.mjs";
/**
 * Creates a new `FiberRef` with given initial value.
 */

export function make(initial, onFork = identity, onJoin = (_, a) => a) {
  return new IFiberRefNew(initial, onFork, onJoin);
}
/**
 * Creates a new `FiberRef` with given initial value.
 */

export function unsafeMake(initial, onFork = identity, onJoin = (_, a) => a) {
  return new Runtime(initial, onFork, onJoin);
}
//# sourceMappingURL=make.mjs.map