import * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Reduces the elements in the stream to a value of type `S`.
 * Stops the fold early when the condition is not fulfilled.
 */
export declare function foldWhile<S>(s: S): (cont: (s: S) => boolean) => <O>(f: (s: S, o: O) => S) => <R, E>(self: Stream<R, E, O>) => T.Effect<R, E, S>;
//# sourceMappingURL=foldWhile.d.ts.map