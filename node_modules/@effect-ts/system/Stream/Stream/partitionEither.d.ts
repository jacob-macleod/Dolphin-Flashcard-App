import * as Tp from "../../Collections/Immutable/Tuple/index.js";
import * as E from "../../Either/index.js";
import * as T from "../_internal/effect.js";
import * as M from "../_internal/managed.js";
import type { Stream } from "./definitions.js";
/**
 * Split a stream by a predicate. The faster stream may advance by up to buffer elements further than the slower one.
 */
export declare function partitionEither_<R, R1, E, E1, O, O2, O3>(self: Stream<R, E, O>, p: (o: O) => T.Effect<R1, E1, E.Either<O2, O3>>, buffer?: number): M.Managed<R & R1, never, Tp.Tuple<[Stream<unknown, E | E1, O2>, Stream<unknown, E | E1, O3>]>>;
/**
 * Split a stream by a predicate. The faster stream may advance by up to buffer elements further than the slower one.
 */
export declare function partitionEither<R1, E1, O, O2, O3>(p: (o: O) => T.Effect<R1, E1, E.Either<O2, O3>>, buffer?: number): <R, E>(self: Stream<R, E, O>) => M.Managed<R & R1, never, Tp.Tuple<[Stream<unknown, E1 | E, O2>, Stream<unknown, E1 | E, O3>]>>;
//# sourceMappingURL=partitionEither.d.ts.map