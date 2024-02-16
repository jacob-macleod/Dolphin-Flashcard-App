import * as E from "../Either/index.js";
import type { Effect } from "./effect.js";
/**
 * Returns an effect that submerges the error case of an `Either` into the
 * `Effect`.
 */
export declare function absolve<R, E, E2, A>(v: Effect<R, E, E.Either<E2, A>>, __trace?: string): Effect<R, E | E2, A>;
//# sourceMappingURL=absolve.d.ts.map