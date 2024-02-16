import * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import * as T from "../../../../Effect/index.js";
import * as E from "../../../../Either/index.js";
import * as M from "../../../../Managed/index.js";
import type * as C from "../core.js";
/**
 * Split a stream by a predicate. The faster stream may advance by up to buffer elements further than the slower one.
 */
export declare function partitionEither_<R, R1, E, E1, A, A1, A2>(self: C.Stream<R, E, A>, p: (a: A) => T.Effect<R1, E1, E.Either<A1, A2>>, buffer?: number): M.Managed<R & R1, E | E1, Tp.Tuple<[C.IO<E | E1, A1>, C.IO<E | E1, A2>]>>;
/**
 * Split a stream by a predicate. The faster stream may advance by up to buffer elements further than the slower one.
 *
 * @ets_data_first partitionEither_
 */
export declare function partitionEither<R1, E1, A, A1, A2>(p: (a: A) => T.Effect<R1, E1, E.Either<A1, A2>>, buffer?: number): <R, E>(self: C.Stream<R, E, A>) => M.Managed<R & R1, E1 | E, Tp.Tuple<[C.IO<E1 | E, A1>, C.IO<E1 | E, A2>]>>;
//# sourceMappingURL=partitionEither.d.ts.map