import type * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Maps over elements of the stream with the specified effectful function,
 * executing up to `n` invocations of `f` concurrently. The element order
 * is not enforced by this combinator, and elements may be reordered.
 */
export declare function mapEffectParUnordered_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, n: number, f: (a: A) => T.Effect<R1, E1, A1>): C.Stream<R & R1, E | E1, A1>;
/**
 * Maps over elements of the stream with the specified effectful function,
 * executing up to `n` invocations of `f` concurrently. The element order
 * is not enforced by this combinator, and elements may be reordered.
 *
 * @ets_data_first mapEffectParUnordered_
 */
export declare function mapEffectParUnordered<R1, E1, A, A1>(n: number, f: (a: A) => T.Effect<R1, E1, A1>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A1>;
//# sourceMappingURL=mapEffectParUnordered.d.ts.map