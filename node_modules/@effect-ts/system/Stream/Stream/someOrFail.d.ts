import * as O from "../../Option/index.js";
import type { Stream } from "./definitions.js";
/**
 * Extracts the optional value, or fails with the given error 'e'.
 */
export declare function someOrFail_<R, E, E1, O2>(self: Stream<R, E, O.Option<O2>>, f: () => E1): Stream<R, E | E1, O2>;
/**
 * Extracts the optional value, or fails with the given error 'e'.
 */
export declare function someOrFail<E1>(f: () => E1): <R, E, O2>(self: Stream<R, E, O.Option<O2>>) => Stream<R, E1 | E, O2>;
//# sourceMappingURL=someOrFail.d.ts.map