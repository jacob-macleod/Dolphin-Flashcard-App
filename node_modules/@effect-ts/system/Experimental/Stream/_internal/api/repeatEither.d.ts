import type * as CL from "../../../../Clock/index.js";
import * as E from "../../../../Either/index.js";
import type * as SC from "../../../../Schedule/index.js";
import type * as C from "../core.js";
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule. The schedule output will be emitted at
 * the end of each repetition.
 */
export declare function repeatEither_<R, R1, E, A, B>(self: C.Stream<R, E, A>, schedule: SC.Schedule<R1, any, B>): C.Stream<R & R1 & CL.HasClock, E, E.Either<B, A>>;
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule. The schedule output will be emitted at
 * the end of each repetition.
 *
 * @ets_data_first repeatEither_
 */
export declare function repeatEither<R1, B>(schedule: SC.Schedule<R1, any, B>): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R & R1 & CL.HasClock, E, E.Either<B, A>>;
//# sourceMappingURL=repeatEither.d.ts.map