import type * as CL from "../../Clock/index.js";
import type * as TR from "../Transducer/index.js";
import type { Stream } from "./definitions.js";
/**
 * Aggregates elements of this stream using the provided sink for as long
 * as the downstream operators on the stream are busy.
 *
 * This operator divides the stream into two asynchronous "islands". Operators upstream
 * of this operator run on one fiber, while downstream operators run on another. Whenever
 * the downstream fiber is busy processing elements, the upstream fiber will feed elements
 * into the sink until it signals completion.
 *
 * Any transducer can be used here, but see `Transducer.foldWeightedM` and `Transducer.foldUntilM` for
 * transducers that cover the common usecases.
 */
export declare function aggregateAsync<O, R1, E1, P>(transducer: TR.Transducer<R1, E1, O, P>): <R, E>(self: Stream<R, E, O>) => Stream<R & R1 & CL.HasClock, E1 | E, P>;
/**
 * Aggregates elements of this stream using the provided sink for as long
 * as the downstream operators on the stream are busy.
 *
 * This operator divides the stream into two asynchronous "islands". Operators upstream
 * of this operator run on one fiber, while downstream operators run on another. Whenever
 * the downstream fiber is busy processing elements, the upstream fiber will feed elements
 * into the sink until it signals completion.
 *
 * Any transducer can be used here, but see `Transducer.foldWeightedM` and `Transducer.foldUntilM` for
 * transducers that cover the common usecases.
 */
export declare function aggregateAsync_<R, E, O, R1, E1, P>(self: Stream<R, E, O>, transducer: TR.Transducer<R1, E1, O, P>): Stream<R & R1 & CL.HasClock, E | E1, P>;
//# sourceMappingURL=aggregateAsync.d.ts.map