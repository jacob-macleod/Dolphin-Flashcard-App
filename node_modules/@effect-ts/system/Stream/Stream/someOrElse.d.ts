import * as O from "../../Option/index.js";
import type { Stream } from "./definitions.js";
/**
 * Extracts the optional value, or returns the given 'default'.
 */
export declare function someOrElse_<R, E, O2>(self: Stream<R, E, O.Option<O2>>, default_: () => O2): Stream<R, E, O2>;
/**
 * Extracts the optional value, or returns the given 'default'.
 */
export declare function someOrElse<O2>(default_: () => O2): <R, E>(self: Stream<R, E, O.Option<O2>>) => Stream<R, E, O2>;
//# sourceMappingURL=someOrElse.d.ts.map