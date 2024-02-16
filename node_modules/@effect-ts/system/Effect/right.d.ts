import * as E from "../Either/index.js";
import * as O from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * Returns a successful effect if the value is `Right`, or fails with the error `None`.
 */
export declare function right<R, E, B, C>(self: Effect<R, E, E.Either<B, C>>, __trace?: string): Effect<R, O.Option<E>, C>;
//# sourceMappingURL=right.d.ts.map