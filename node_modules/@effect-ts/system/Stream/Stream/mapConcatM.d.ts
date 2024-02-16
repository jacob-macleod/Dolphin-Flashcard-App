import * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Effectfully maps each element to an iterable, and flattens the iterables into
 * the output of this stream.
 */
export declare function mapConcatM_<R, R2, E, E2, O, O2>(self: Stream<R, E, O>, f: (_: O) => T.Effect<R2, E2, Iterable<O2>>): Stream<R & R2, E2 | E, O2>;
/**
 * Effectfully maps each element to an iterable, and flattens the iterables into
 * the output of this stream.
 */
export declare function mapConcatM<R2, E2, O, O2>(f: (_: O) => T.Effect<R2, E2, Iterable<O2>>): <R, E>(self: Stream<R, E, O>) => Stream<R & R2, E2 | E, O2>;
//# sourceMappingURL=mapConcatM.d.ts.map