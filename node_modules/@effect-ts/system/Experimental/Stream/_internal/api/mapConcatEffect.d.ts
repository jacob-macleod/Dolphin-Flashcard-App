import * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Effectfully maps each element to an iterable, and flattens the iterables into
 * the output of this stream.
 */
export declare function mapConcatEffect_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, f: (a: A) => T.Effect<R1, E1, Iterable<A1>>): C.Stream<R & R1, E | E1, A1>;
/**
 * Effectfully maps each element to an iterable, and flattens the iterables into
 * the output of this stream.
 *
 * @ets_data_first mapConcatEffect_
 */
export declare function mapConcatEffect<R1, E1, A, A1>(f: (a: A) => T.Effect<R1, E1, Iterable<A1>>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A1>;
//# sourceMappingURL=mapConcatEffect.d.ts.map