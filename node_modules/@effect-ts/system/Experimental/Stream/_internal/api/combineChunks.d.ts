import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import * as T from "../../../../Effect/index.js";
import type * as Ex from "../../../../Exit/index.js";
import type * as O from "../../../../Option/index.js";
import * as C from "../core.js";
/**
 * Combines the chunks from this stream and the specified stream by repeatedly applying the
 * function `f` to extract a chunk using both sides and conceptually "offer"
 * it to the destination stream. `f` can maintain some internal state to control
 * the combining process, with the initial state being specified by `s`.
 */
export declare function combineChunks_<R, R1, E, E1, A, A2, A3, S>(self: C.Stream<R, E, A>, that: C.Stream<R1, E1, A2>, s: S, f: (s: S, e1: T.Effect<R, O.Option<E>, CK.Chunk<A>>, e2: T.Effect<R1, O.Option<E1>, CK.Chunk<A2>>) => T.Effect<R & R1, never, Ex.Exit<O.Option<E | E1>, Tp.Tuple<[CK.Chunk<A3>, S]>>>): C.Stream<R & R1, E | E1, A3>;
/**
 * Combines the chunks from this stream and the specified stream by repeatedly applying the
 * function `f` to extract a chunk using both sides and conceptually "offer"
 * it to the destination stream. `f` can maintain some internal state to control
 * the combining process, with the initial state being specified by `s`.
 *
 * @ets_data_first combineChunks_
 */
export declare function combineChunks<R, R1, E, E1, A, A2, A3, S>(that: C.Stream<R1, E1, A2>, s: S, f: (s: S, e1: T.Effect<R, O.Option<E>, CK.Chunk<A>>, e2: T.Effect<R1, O.Option<E1>, CK.Chunk<A2>>) => T.Effect<R & R1, never, Ex.Exit<O.Option<E | E1>, Tp.Tuple<[CK.Chunk<A3>, S]>>>): (self: C.Stream<R, E, A>) => C.Stream<R & R1, E | E1, A3>;
//# sourceMappingURL=combineChunks.d.ts.map