import * as CL from "../../../../Clock/index.js";
import * as C from "../core.js";
/**
 * Delays the emission of values by holding new values for a set duration. If no new values
 * arrive during that time the value is emitted, however if a new value is received during the holding period
 * the previous value is discarded and the process is repeated with the new value.
 *
 * This operator is useful if you have a stream of "bursty" events which eventually settle down and you
 * only need the final event of the burst.
 *
 * @example A search engine may only want to initiate a search after a user has paused typing
 *          so as to not prematurely recommend results.
 */
export declare function debounce_<R, E, A>(self: C.Stream<R, E, A>, d: number): C.Stream<CL.HasClock & R, E, A>;
/**
 * Delays the emission of values by holding new values for a set duration. If no new values
 * arrive during that time the value is emitted, however if a new value is received during the holding period
 * the previous value is discarded and the process is repeated with the new value.
 *
 * This operator is useful if you have a stream of "bursty" events which eventually settle down and you
 * only need the final event of the burst.
 *
 * @example A search engine may only want to initiate a search after a user has paused typing
 *          so as to not prematurely recommend results.
 *
 * @ets_data_first debounce_
 */
export declare function debounce(d: number): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<CL.HasClock & R, E, A>;
//# sourceMappingURL=debounce.d.ts.map