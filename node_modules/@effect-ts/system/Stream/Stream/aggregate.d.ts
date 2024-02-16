import type * as TR from "../Transducer/index.js";
import { Stream } from "./definitions.js";
/**
 * Applies an aggregator to the stream, which converts one or more elements
 * of type `A` into elements of type `B`.
 */
export declare function aggregate_<R, R1, E, E1, O, P>(self: Stream<R, E, O>, transducer: TR.Transducer<R1, E1, O, P>): Stream<R & R1, E | E1, P>;
/**
 * Applies an aggregator to the stream, which converts one or more elements
 * of type `A` into elements of type `B`.
 */
export declare function aggregate<R1, E1, O, P>(transducer: TR.Transducer<R1, E1, O, P>): <R, E>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, P>;
//# sourceMappingURL=aggregate.d.ts.map