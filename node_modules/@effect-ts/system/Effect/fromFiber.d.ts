import * as Fiber from "../Fiber/index.js";
import type { Effect, IO } from "./effect.js";
/**
 * Creates a `Effect` value that represents the exit value of the specified
 * fiber.
 */
export declare function fromFiber<E, A>(fiber: () => Fiber.Fiber<E, A>, __trace?: string): IO<E, A>;
/**
 * Creates a `Effect` value that represents the exit value of the specified
 * fiber.
 */
export declare function fromFiberM<R, E, E2, A>(fiber: Effect<R, E, Fiber.Fiber<E2, A>>, __trace?: string): Effect<R, E | E2, A>;
//# sourceMappingURL=fromFiber.d.ts.map