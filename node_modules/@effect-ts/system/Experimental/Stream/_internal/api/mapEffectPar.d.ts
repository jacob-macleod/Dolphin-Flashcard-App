import type * as T from "../../../../Effect/index.js";
import * as C from "../core.js";
/**
 * Maps over elements of the stream with the specified effectful function,
 * executing up to `n` invocations of `f` concurrently. Transformed elements
 * will be emitted in the original order.
 *
 * @note This combinator destroys the chunking structure. It's recommended to use rechunk afterwards.
 */
export declare function mapEffectPar<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, f: (a: A) => T.Effect<R1, E1, A1>, n: number): C.Stream<R & R1, E | E1, A1>;
//# sourceMappingURL=mapEffectPar.d.ts.map