import * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Statefully and effectfully maps over the elements of this stream to produce all
 * intermediate results of type `S` given an initial S.
 */
export declare function scanM<S>(s: S): <R1, E1, O>(f: (s: S, o: O) => T.Effect<R1, E1, S>) => <R, E>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, S>;
//# sourceMappingURL=scanM.d.ts.map