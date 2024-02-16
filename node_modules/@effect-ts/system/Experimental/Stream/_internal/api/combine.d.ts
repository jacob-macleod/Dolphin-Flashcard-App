import * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import * as T from "../../../../Effect/index.js";
import * as Ex from "../../../../Exit/index.js";
import * as O from "../../../../Option/index.js";
import * as C from "../core.js";
/**
 * Combines the elements from this stream and the specified stream by repeatedly applying the
 * function `f` to extract an element using both sides and conceptually "offer"
 * it to the destination stream. `f` can maintain some internal state to control
 * the combining process, with the initial state being specified by `s`.
 *
 * Where possible, prefer `Stream#combineChunks` for a more efficient implementation.
 */
export declare function combine_<R, R1, E, E1, A, A1, A2, S>(self: C.Stream<R, E, A>, that: C.Stream<R1, E1, A1>, s: S, f: (s: S, e1: T.Effect<R, O.Option<E>, A>, e2: T.Effect<R1, O.Option<E1>, A1>) => T.Effect<R1, never, Ex.Exit<O.Option<E1>, Tp.Tuple<[A2, S]>>>): C.Stream<R & R1, E1, A2>;
/**
 * Combines the elements from this stream and the specified stream by repeatedly applying the
 * function `f` to extract an element using both sides and conceptually "offer"
 * it to the destination stream. `f` can maintain some internal state to control
 * the combining process, with the initial state being specified by `s`.
 *
 * Where possible, prefer `Stream#combineChunks` for a more efficient implementation.
 *
 * @ets_data_first combine_
 */
export declare function combine<R, R1, E, E1, A, A1, A2, S>(that: C.Stream<R1, E1, A1>, s: S, f: (s: S, e1: T.Effect<R, O.Option<E>, A>, e2: T.Effect<R1, O.Option<E1>, A1>) => T.Effect<R1, never, Ex.Exit<O.Option<E1>, Tp.Tuple<[A2, S]>>>): (self: C.Stream<R, E, A>) => C.Stream<R & R1, E1, A2>;
//# sourceMappingURL=combine.d.ts.map