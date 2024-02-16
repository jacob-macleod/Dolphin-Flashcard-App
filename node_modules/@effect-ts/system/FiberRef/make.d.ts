import type { UIO } from "../Effect/effect.js";
import { Runtime } from "./fiberRef.js";
/**
 * Creates a new `FiberRef` with given initial value.
 */
export declare function make<A>(initial: A, onFork?: (a: A) => A, onJoin?: (a: A, a2: A) => A): UIO<Runtime<A>>;
/**
 * Creates a new `FiberRef` with given initial value.
 */
export declare function unsafeMake<A>(initial: A, onFork?: (a: A) => A, onJoin?: (a: A, a2: A) => A): Runtime<A>;
//# sourceMappingURL=make.d.ts.map