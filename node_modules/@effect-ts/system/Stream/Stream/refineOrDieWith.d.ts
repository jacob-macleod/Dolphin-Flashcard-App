import * as O from "../../Option/index.js";
import type { Stream } from "./definitions.js";
/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a `Throwable`.
 */
export declare function refineOrDieWith<E, E1>(pf: (e: E) => O.Option<E1>): (f: (e: E) => unknown) => <R, O>(self: Stream<R, E, O>) => Stream<R, E1, O>;
//# sourceMappingURL=refineOrDieWith.d.ts.map