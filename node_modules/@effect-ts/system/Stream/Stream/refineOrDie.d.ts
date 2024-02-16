import type * as O from "../../Option/index.js";
import type { Stream } from "./definitions.js";
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 */
export declare function refineOrDie_<R, E, E1, O>(self: Stream<R, E, O>, pf: (e: E) => O.Option<E1>): Stream<R, E1, O>;
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 */
export declare function refineOrDie<E, E1>(pf: (e: E) => O.Option<E1>): <R, O>(self: Stream<R, E, O>) => Stream<R, E1, O>;
//# sourceMappingURL=refineOrDie.d.ts.map