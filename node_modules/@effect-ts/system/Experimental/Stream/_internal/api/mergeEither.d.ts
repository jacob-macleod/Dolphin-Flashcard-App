import * as E from "../../../../Either/index.js";
import type * as C from "../core.js";
/**
 * Merges this stream and the specified stream together to produce a stream of
 * eithers.
 */
export declare function mergeEither_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, that: C.Stream<R1, E1, A1>): C.Stream<R1 & R, E | E1, E.Either<A, A1>>;
/**
 * Merges this stream and the specified stream together to produce a stream of
 * eithers.
 *
 * @ets_data_first mergeEither_
 */
export declare function mergeEither<R1, E1, A1>(that: C.Stream<R1, E1, A1>): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R1 & R, E1 | E, E.Either<A, A1>>;
//# sourceMappingURL=mergeEither.d.ts.map