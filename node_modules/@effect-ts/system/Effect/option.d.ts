import * as O from "../Option/index.js";
import type { Effect, RIO } from "./effect.js";
/**
 * Converts an option on errors into an option on values.
 */
export declare function option<R, E, A>(self: Effect<R, E, A>, __trace?: string): RIO<R, O.Option<A>>;
//# sourceMappingURL=option.d.ts.map