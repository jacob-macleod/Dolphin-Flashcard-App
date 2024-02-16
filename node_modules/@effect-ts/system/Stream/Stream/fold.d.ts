import * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Executes a pure fold over the stream of values - reduces all elements in the stream to a value of type `S`.
 */
export declare function fold<S>(s: S): <O>(f: (s: S, o: O) => S) => <R, E>(self: Stream<R, E, O>) => T.Effect<R, E, S>;
//# sourceMappingURL=fold.d.ts.map