import type { Option } from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * Unwraps the optional success of this effect, but can fail with an None value.
 */
export declare function get<R, E, A>(self: Effect<R, E, Option<A>>, __trace?: string): Effect<R, Option<E>, A>;
//# sourceMappingURL=get.d.ts.map