import type * as CL from "../../Clock/index.js";
import type * as A from "../../Collections/Immutable/Chunk/index.js";
import type * as SC from "../../Schedule/index.js";
import type * as TR from "../Transducer/index.js";
import type { Stream } from "./definitions.js";
/**
 * Uses `aggregateAsyncWithinEither` but only returns the `Right` results.
 */
export declare function aggregateAsyncWithin<O, R1, E1, P, X>(transducer: TR.Transducer<R1, E1, O, P>, schedule: SC.Schedule<R1, A.Chunk<P>, X>): <R, E>(self: Stream<R, E, O>) => Stream<R & R1 & CL.HasClock, E1 | E, P>;
/**
 * Uses `aggregateAsyncWithinEither` but only returns the `Right` results.
 */
export declare function aggregateAsyncWithin_<R, E, O, R1, E1, P, X>(self: Stream<R, E, O>, transducer: TR.Transducer<R1, E1, O, P>, schedule: SC.Schedule<R1, A.Chunk<P>, X>): Stream<R & R1 & CL.HasClock, E | E1, P>;
//# sourceMappingURL=aggregateAsyncWithin.d.ts.map