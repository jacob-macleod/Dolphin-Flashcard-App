import * as O from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * Maps the error value of this effect to an optional value.
 */
export declare function asSomeError<R, E, A>(self: Effect<R, E, A>, __trace?: string): Effect<R, O.Option<E>, A>;
//# sourceMappingURL=asSomeError.d.ts.map