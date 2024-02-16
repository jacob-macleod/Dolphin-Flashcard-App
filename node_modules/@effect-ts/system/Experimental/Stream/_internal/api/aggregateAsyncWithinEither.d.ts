import type * as CL from "../../../../Clock/index.js";
import * as E from "../../../../Either/index.js";
import * as O from "../../../../Option/index.js";
import * as SC from "../../../../Schedule/index.js";
import type * as SK from "../../Sink/index.js";
import * as C from "../core.js";
/**
 * Aggregates elements using the provided sink until it completes, or until the
 * delay signalled by the schedule has passed.
 *
 * This operator divides the stream into two asynchronous islands. Operators upstream
 * of this operator run on one fiber, while downstream operators run on another. Elements
 * will be aggregated by the sink until the downstream fiber pulls the aggregated value,
 * or until the schedule's delay has passed.
 *
 * Aggregated elements will be fed into the schedule to determine the delays between
 * pulls.
 */
export declare function aggregateAsyncWithinEither_<R, R1, R2, E extends E1, E1, E2, A extends A1, A1, B, C>(self: C.Stream<R, E, A>, sink: SK.Sink<R1, E1, A1, E2, A1, B>, schedule: SC.Schedule<R2, O.Option<B>, C>): C.Stream<R & R1 & R2 & CL.HasClock, E2, E.Either<C, B>>;
/**
 * Aggregates elements using the provided sink until it completes, or until the
 * delay signalled by the schedule has passed.
 *
 * This operator divides the stream into two asynchronous islands. Operators upstream
 * of this operator run on one fiber, while downstream operators run on another. Elements
 * will be aggregated by the sink until the downstream fiber pulls the aggregated value,
 * or until the schedule's delay has passed.
 *
 * Aggregated elements will be fed into the schedule to determine the delays between
 * pulls.
 *
 * @ets_data_first aggregateAsyncWithinEither_
 */
export declare function aggregateAsyncWithinEither<R1, R2, E1, E2, A1, B, C>(sink: SK.Sink<R1, E1, A1, E2, A1, B>, schedule: SC.Schedule<R2, O.Option<B>, C>): <R, E extends E1, A extends A1>(self: C.Stream<R, E, A>) => C.Stream<R & R1 & R2 & CL.HasClock, E2, E.Either<C, B>>;
//# sourceMappingURL=aggregateAsyncWithinEither.d.ts.map