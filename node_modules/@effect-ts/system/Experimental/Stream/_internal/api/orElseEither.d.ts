import * as E from "../../../../Either/index.js";
import type * as C from "../core.js";
/**
 * Switches to the provided stream in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */
export declare function orElseEither_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, that: C.Stream<R1, E1, A1>): C.Stream<R & R1, E | E1, E.Either<A, A1>>;
/**
 * Switches to the provided stream in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 *
 * @ets_data_first orElseEither_
 */
export declare function orElseEither<R1, E1, A1>(that: C.Stream<R1, E1, A1>): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, E.Either<A, A1>>;
//# sourceMappingURL=orElseEither.d.ts.map