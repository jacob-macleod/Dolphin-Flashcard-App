import type * as CL from "../../Clock/index.js";
import * as A from "../../Collections/Immutable/Chunk/index.js";
import * as E from "../../Either/index.js";
import * as SC from "../../Schedule/index.js";
import type * as TR from "../Transducer/index.js";
import { Stream } from "./definitions.js";
/**
 * Aggregates elements using the provided transducer until it signals completion, or the
 * delay signalled by the schedule has passed.
 *
 * This operator divides the stream into two asynchronous islands. Operators upstream
 * of this operator run on one fiber, while downstream operators run on another. Elements
 * will be aggregated by the transducer until the downstream fiber pulls the aggregated value,
 * or until the schedule's delay has passed.
 *
 * Aggregated elements will be fed into the schedule to determine the delays between
 * pulls.
 */
export declare function aggregateAsyncWithinEither<O, R1, E1, P, Q>(transducer: TR.Transducer<R1, E1, O, P>, schedule: SC.Schedule<R1, A.Chunk<P>, Q>): <R, E>(self: Stream<R, E, O>) => Stream<R & R1 & CL.HasClock, E1 | E, E.Either<Q, P>>;
/**
 * Aggregates elements using the provided transducer until it signals completion, or the
 * delay signalled by the schedule has passed.
 *
 * This operator divides the stream into two asynchronous islands. Operators upstream
 * of this operator run on one fiber, while downstream operators run on another. Elements
 * will be aggregated by the transducer until the downstream fiber pulls the aggregated value,
 * or until the schedule's delay has passed.
 *
 * Aggregated elements will be fed into the schedule to determine the delays between
 * pulls.
 */
export declare function aggregateAsyncWithinEither_<R, E, O, R1, E1, P, Q>(self: Stream<R, E, O>, transducer: TR.Transducer<R1, E1, O, P>, schedule: SC.Schedule<R1, A.Chunk<P>, Q>): Stream<R & R1 & CL.HasClock, E | E1, E.Either<Q, P>>;
//# sourceMappingURL=aggregateAsyncWithinEither.d.ts.map