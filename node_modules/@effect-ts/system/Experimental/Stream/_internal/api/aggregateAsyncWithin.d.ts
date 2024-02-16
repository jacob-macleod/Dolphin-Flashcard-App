import type * as CL from "../../../../Clock/index.js";
import * as O from "../../../../Option/index.js";
import type * as SC from "../../../../Schedule/index.js";
import type * as SK from "../../Sink/index.js";
import type * as C from "../core.js";
/**
 * Like `aggregateAsyncWithinEither`, but only returns the `Right` results.
 */
export declare function aggregateAsyncWithin_<R, R1, R2, E extends E1, E1, E2, A extends A1, A1, B, C>(self: C.Stream<R, E, A>, sink: SK.Sink<R1, E1, A1, E2, A1, B>, schedule: SC.Schedule<R2, O.Option<B>, C>): C.Stream<R & R1 & R2 & CL.HasClock, E2, B>;
/**
 * Like `aggregateAsyncWithinEither`, but only returns the `Right` results.
 *
 * @ets_data_first aggregateAsyncWithin_
 */
export declare function aggregateAsyncWithin<R1, R2, E1, E2, A1, B, C>(sink: SK.Sink<R1, E1, A1, E2, A1, B>, schedule: SC.Schedule<R2, O.Option<B>, C>): <R, E extends E1, A extends A1>(self: C.Stream<R, E, A>) => C.Stream<R & R1 & R2 & CL.HasClock, E2, B>;
//# sourceMappingURL=aggregateAsyncWithin.d.ts.map