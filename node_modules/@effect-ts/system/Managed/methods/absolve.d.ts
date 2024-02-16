import * as E from "../../Either/index.js";
import type { Managed } from "../managed.js";
/**
 * Submerges the error case of an `Either` into the `Managed`. The inverse
 * operation of `Managed.either`.
 */
export declare function absolve<R, E, E2, A>(self: Managed<R, E, E.Either<E2, A>>, __trace?: string): Managed<R, E | E2, A>;
//# sourceMappingURL=absolve.d.ts.map