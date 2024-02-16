import type * as A from "../../Collections/Immutable/Chunk/index.js";
import type * as Tp from "../../Collections/Immutable/Tuple/index.js";
import type * as Ex from "../../Exit/index.js";
import type * as Option from "../../Option/index.js";
import * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Combines the chunks from this stream and the specified stream by repeatedly applying the
 * function `f` to extract a chunk using both sides and conceptually "offer"
 * it to the destination stream. `f` can maintain some internal state to control
 * the combining process, with the initial state being specified by `s`.
 */
export declare function combineChunks_<R1, E1, O2, Z, R, E, O, O3>(self: Stream<R, E, O>, that: Stream<R1, E1, O2>, z: Z, f: (z: Z, s: T.Effect<R, Option.Option<E>, A.Chunk<O>>, t: T.Effect<R1, Option.Option<E1>, A.Chunk<O2>>) => T.Effect<R & R1, never, Ex.Exit<Option.Option<E | E1>, Tp.Tuple<[A.Chunk<O3>, Z]>>>): Stream<R & R1, E1 | E, O3>;
/**
 * Combines the chunks from this stream and the specified stream by repeatedly applying the
 * function `f` to extract a chunk using both sides and conceptually "offer"
 * it to the destination stream. `f` can maintain some internal state to control
 * the combining process, with the initial state being specified by `s`.
 */
export declare function combineChunks<R1, E1, O2, Z, R, E, O, O3>(that: Stream<R1, E1, O2>, z: Z, f: (z: Z, s: T.Effect<R, Option.Option<E>, A.Chunk<O>>, t: T.Effect<R1, Option.Option<E1>, A.Chunk<O2>>) => T.Effect<R & R1, never, Ex.Exit<Option.Option<E | E1>, Tp.Tuple<[A.Chunk<O3>, Z]>>>): (self: Stream<R, E, O>) => Stream<R & R1, E1 | E, O3>;
//# sourceMappingURL=combineChunks.d.ts.map