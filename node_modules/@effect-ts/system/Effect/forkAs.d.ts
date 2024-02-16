import * as Fiber from "../Fiber/index.js";
import type { Effect, RIO } from "./effect.js";
/**
 * Forks the effect into a new independent fiber, with the specified name.
 *
 * @ets_data_first forkAs_
 */
export declare function forkAs(name: string, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => RIO<R, Fiber.FiberContext<E, A>>;
/**
 * Forks the effect into a new independent fiber, with the specified name.
 */
export declare function forkAs_<R, E, A>(self: Effect<R, E, A>, name: string, __trace?: string): RIO<R, Fiber.FiberContext<E, A>>;
//# sourceMappingURL=forkAs.d.ts.map