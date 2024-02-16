import type { HasClock } from "../Clock/index.js";
import * as E from "../Either/index.js";
import type { Schedule } from "../Schedule/index.js";
import type { Effect } from "./effect.js";
/**
 * Returns an effect that retries this effect with the specified schedule when it fails, until
 * the schedule is done, then both the value produced by the schedule together with the last
 * error are passed to the specified recovery function.
 */
export declare function retryOrElseEither_<R, E extends I, A, I, R1, O, R2, E2, A2>(self: Effect<R, E, A>, policy: Schedule<R1, I, O>, orElse: (e: E, o: O) => Effect<R2, E2, A2>, __trace?: string): Effect<R & R1 & R2 & HasClock, E2, E.Either<A2, A>>;
/**
 * Returns an effect that retries this effect with the specified schedule when it fails, until
 * the schedule is done, then both the value produced by the schedule together with the last
 * error are passed to the specified recovery function.
 *
 * @ets_data_first retryOrElseEither_
 */
export declare function retryOrElseEither<E extends I, I, R1, O, R2, E2, A2>(policy: Schedule<R1, I, O>, orElse: (e: E, o: O) => Effect<R2, E2, A2>, __trace?: string): <R, A>(self: Effect<R, E, A>) => Effect<R & R1 & R2 & HasClock, E2, E.Either<A2, A>>;
/**
 * Retries with the specified schedule, until it fails, and then both the
 * value produced by the schedule together with the last error are passed to
 * the recovery function.
 */
export declare function retryOrElse_<R, E extends I, I, A, R1, O, R2, E2, A2>(self: Effect<R, E, A>, policy: Schedule<R1, I, O>, orElse: (e: E, o: O) => Effect<R2, E2, A2>, __trace?: string): Effect<R & R1 & R2 & HasClock, E2, A | A2>;
/**
 * Retries with the specified schedule, until it fails, and then both the
 * value produced by the schedule together with the last error are passed to
 * the recovery function.
 *
 * @ets_data_first retryOrElse_
 */
export declare function retryOrElse<E extends I, I, R1, O, R2, E2, A2>(policy: Schedule<R1, I, O>, orElse: (e: E, o: O) => Effect<R2, E2, A2>, __trace?: string): <R, A>(self: Effect<R, E, A>) => Effect<R & R1 & R2 & HasClock, E2, A2 | A>;
/**
 * Retries with the specified retry policy.
 * Retries are done following the failure of the original `io` (up to a fixed maximum with
 * `once` or `recurs` for example), so that that `io.retry(Schedule.once)` means
 * "execute `io` and in case of failure, try again once".
 */
export declare function retry_<R, E extends I, I, A, R1, O>(self: Effect<R, E, A>, policy: Schedule<R1, I, O>, __trace?: string): Effect<R & R1 & HasClock, E, A>;
/**
 * Retries with the specified retry policy.
 * Retries are done following the failure of the original `io` (up to a fixed maximum with
 * `once` or `recurs` for example), so that that `io.retry(Schedule.once)` means
 * "execute `io` and in case of failure, try again once".
 *
 * @ets_data_first retry_
 */
export declare function retry<R1, I, O>(policy: Schedule<R1, I, O>, __trace?: string): <E extends I, R, A>(self: Effect<R, E, A>) => Effect<R & R1 & HasClock, E, A>;
//# sourceMappingURL=retry.d.ts.map