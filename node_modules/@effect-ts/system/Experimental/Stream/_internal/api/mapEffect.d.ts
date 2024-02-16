import * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Maps over elements of the stream with the specified effectful function.
 */
export declare function mapEffect_<R, E, A, R1, E1, B>(self: C.Stream<R, E, A>, f: (a: A) => T.Effect<R1, E1, B>): C.Stream<R & R1, E | E1, B>;
/**
 * Maps over elements of the stream with the specified effectful function.
 *
 * @ets_data_first mapEffect_
 */
export declare function mapEffect<A, R1, E1, B>(f: (a: A) => T.Effect<R1, E1, B>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E | E1, B>;
//# sourceMappingURL=mapEffect.d.ts.map