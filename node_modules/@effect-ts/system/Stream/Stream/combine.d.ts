import type * as Tp from "../../Collections/Immutable/Tuple/index.js";
import type * as Ex from "../../Exit/index.js";
import type * as O from "../../Option/index.js";
import * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Combines the elements from this stream and the specified stream by repeatedly applying the
 * function `f` to extract an element using both sides and conceptually "offer"
 * it to the destination stream. `f` can maintain some internal state to control
 * the combining process, with the initial state being specified by `s`.
 *
 * Where possible, prefer `Stream#combineChunks` for a more efficient implementation.
 */
export declare function combine_<R1, E1, O2, S, R, E, O, O3>(self: Stream<R, E, O>, that: Stream<R1, E1, O2>, s: S, f: (s: S, a: T.Effect<R, O.Option<E>, O>, b: T.Effect<R1, O.Option<E1>, O2>) => T.Effect<R & R1, never, Ex.Exit<O.Option<E | E1>, Tp.Tuple<[O3, S]>>>): Stream<R1 & R, E | E1, O3>;
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
export declare function combine<R1, E1, O2, S, R, E, O, O3>(that: Stream<R1, E1, O2>, s: S, f: (s: S, a: T.Effect<R, O.Option<E>, O>, b: T.Effect<R1, O.Option<E1>, O2>) => T.Effect<R & R1, never, Ex.Exit<O.Option<E | E1>, Tp.Tuple<[O3, S]>>>): (self: Stream<R, E, O>) => Stream<R1 & R, E | E1, O3>;
//# sourceMappingURL=combine.d.ts.map