import type { HasClock } from "../Clock/index.js";
import * as E from "../Either/index.js";
import * as O from "../Option/index.js";
import * as S from "../Schedule/index.js";
import type { Effect } from "./effect.js";
/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure, at which point, the failure value
 * and schedule output are passed to the specified handler.
 *
 * Scheduled recurrences are in addition to the first execution, so that
 * `io.repeat(Schedule.once)` yields an effect that executes `io`, and then
 * if that succeeds, executes `io` an additional time.
 */
export declare function repeatOrElseEither_<R, E, Env1, A, B, R2, E2, C>(self: Effect<R, E, A>, schedule: S.Schedule<Env1, A, B>, orElse: (_: E, __: O.Option<B>) => Effect<R2, E2, C>, __trace?: string): Effect<R & Env1 & R2 & HasClock, E2, E.Either<C, B>>;
/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure, at which point, the failure value
 * and schedule output are passed to the specified handler.
 *
 * Scheduled recurrences are in addition to the first execution, so that
 * `io.repeat(Schedule.once)` yields an effect that executes `io`, and then
 * if that succeeds, executes `io` an additional time.
 *
 * @ets_data_first repeatOrElseEither_
 */
export declare function repeatOrElseEither<R, E, Env1, A, B, R2, E2, C>(schedule: S.Schedule<Env1, A, B>, orElse: (_: E, __: O.Option<B>) => Effect<R2, E2, C>, __trace?: string): (self: Effect<R, E, A>) => Effect<R & Env1 & R2 & HasClock, E2, E.Either<C, B>>;
/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure, at which point, the failure value
 * and schedule output are passed to the specified handler.
 *
 * Scheduled recurrences are in addition to the first execution, so that
 * `io.repeat(Schedule.once)` yields an effect that executes `io`, and then
 * if that succeeds, executes `io` an additional time.
 */
export declare function repeatOrElse_<R, E, A, SR, B, R2, E2, C>(self: Effect<R, E, A>, schedule: S.Schedule<SR, A, B>, orElse: (_: E, __: O.Option<B>) => Effect<R2, E2, C>, __trace?: string): Effect<R & SR & R2 & HasClock, E2, C | B>;
/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure, at which point, the failure value
 * and schedule output are passed to the specified handler.
 *
 * Scheduled recurrences are in addition to the first execution, so that
 * `io.repeat(Schedule.once)` yields an effect that executes `io`, and then
 * if that succeeds, executes `io` an additional time.
 *
 * @ets_data_first repeatOrElse_
 */
export declare function repeatOrElse<E, A, SR, B, R2, E2, C>(schedule: S.Schedule<SR, A, B>, orElse: (_: E, __: O.Option<B>) => Effect<R2, E2, C>, __trace?: string): <R>(self: Effect<R, E, A>) => Effect<R & SR & R2 & HasClock, E2, C | B>;
/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure. Scheduled recurrences are in addition
 * to the first execution, so that `io.repeat(Schedule.once)` yields an
 * effect that executes `io`, and then if that succeeds, executes `io` an
 * additional time.
 */
export declare function repeat_<R, E, A, SR, B>(self: Effect<R, E, A>, schedule: S.Schedule<SR, A, B>, __trace?: string): Effect<R & SR & HasClock, E, B>;
/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure. Scheduled recurrences are in addition
 * to the first execution, so that `io.repeat(Schedule.once)` yields an
 * effect that executes `io`, and then if that succeeds, executes `io` an
 * additional time.
 *
 * @ets_data_first repeat_
 */
export declare function repeat<A, SR, B>(schedule: S.Schedule<SR, A, B>, __trace?: string): <R, E>(self: Effect<R, E, A>) => Effect<R & SR & HasClock, E, B>;
//# sourceMappingURL=repeat.d.ts.map