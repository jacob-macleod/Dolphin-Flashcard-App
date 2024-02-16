import * as T from "../../../../Effect/index.js";
import * as C from "../core.js";
/**
 * Finds the first element emitted by this stream that satisfies the provided effectful predicate.
 */
export declare function findEffect_<R, R1, E, E1, A>(self: C.Stream<R, E, A>, f: (a: A) => T.Effect<R1, E1, boolean>): C.Stream<R & R1, E | E1, A>;
/**
 * Finds the first element emitted by this stream that satisfies the provided effectful predicate.
 * @ets_data_first findEffect_
 */
export declare function findEffect<R1, E1, A>(f: (a: A) => T.Effect<R1, E1, boolean>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A>;
//# sourceMappingURL=findEffect.d.ts.map