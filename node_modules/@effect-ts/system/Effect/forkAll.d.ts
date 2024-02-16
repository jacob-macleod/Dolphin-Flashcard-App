import type * as Chunk from "../Collections/Immutable/Chunk/index.js";
import * as Fiber from "../Fiber/index.js";
import type { Effect, RIO } from "./effect.js";
/**
 * Returns an effect that forks all of the specified values, and returns a
 * composite fiber that produces a list of their results, in order.
 */
export declare function forkAll<R, E, A>(effects: Iterable<Effect<R, E, A>>, __trace?: string): RIO<R, Fiber.Fiber<E, Chunk.Chunk<A>>>;
/**
 * Returns an effect that forks all of the specified values, and returns a
 * composite fiber that produces unit. This version is faster than `forkAll`
 * in cases where the results of the forked fibers are not needed.
 */
export declare function forkAllUnit<R, E, A>(effects: Iterable<Effect<R, E, A>>, __trace?: string): Effect<R, never, void>;
//# sourceMappingURL=forkAll.d.ts.map