import * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Converts an option on values into an option on errors.
 */
export declare function some<R, E, A>(self: C.Stream<R, E, O.Option<A>>): C.Stream<R, O.Option<E>, A>;
//# sourceMappingURL=some.d.ts.map