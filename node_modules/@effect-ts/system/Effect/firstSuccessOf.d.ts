import * as NEA from "../Collections/Immutable/NonEmptyArray/index.js";
import type { Effect } from "./effect.js";
/**
 * Returns an effect that yields the value of the first
 * effect to succeed.
 */
export declare function firstSuccessOf<R, E, A>(effects: NEA.NonEmptyArray<Effect<R, E, A>>, __trace?: string): Effect<R, E, A>;
//# sourceMappingURL=firstSuccessOf.d.ts.map