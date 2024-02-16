import type { FiberContext } from "../Fiber/index.js";
import type { Managed } from "../Managed/managed.js";
import type { Effect } from "./effect.js";
/**
 * Forks the fiber in a `Managed`. Using the `Managed` value will
 * execute the effect in the fiber, while ensuring its interruption when
 * the effect supplied to `use` completes.
 */
export declare function forkManaged<R, E, A>(self: Effect<R, E, A>, __trace?: string): Managed<R, never, FiberContext<E, A>>;
//# sourceMappingURL=forkManaged.d.ts.map