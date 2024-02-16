import { NoSuchElementException } from "../GlobalExceptions/index.js";
import type * as O from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * Extracts the optional value, or fails with a `NoSuchElementException`
 */
export declare function someOrFailException<R, E, A>(self: Effect<R, E, O.Option<A>>, __trace?: string): Effect<R, E | NoSuchElementException, A>;
//# sourceMappingURL=someOrFailException.d.ts.map