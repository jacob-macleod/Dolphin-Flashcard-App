import * as E from "../Either/index.js";
import type { Effect } from "./effect.js";
/**
 * Returns an effect that races this effect with the specified effect,
 * returning the first successful `A` from the faster side. If one effect
 * succeeds, the other will be interrupted. If neither succeeds, then the
 * effect will fail with some error.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated. If early return is
 * desired
 */
export declare function race_<R, E, A, R2, E2, A2>(self: Effect<R, E, A>, that: Effect<R2, E2, A2>, __trace?: string): Effect<R & R2, E | E2, A | A2>;
/**
 * Returns an effect that races this effect with the specified effect,
 * returning the first successful `A` from the faster side. If one effect
 * succeeds, the other will be interrupted. If neither succeeds, then the
 * effect will fail with some error.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated.
 *
 * @ets_data_first race_
 */
export declare function race<R2, E2, A2>(that: Effect<R2, E2, A2>, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R & R2, E2 | E, A2 | A>;
/**
 * Returns an effect that races this effect with the specified effect,
 * yielding the first result to succeed. If neither effect succeeds, then the
 * composed effect will fail with some error.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated.
 */
export declare function raceEither_<R, E, A, R2, E2, A2>(self: Effect<R, E, A>, that: Effect<R2, E2, A2>, __trace?: string): Effect<R & R2, E | E2, E.Either<A, A2>>;
/**
 * Returns an effect that races this effect with the specified effect,
 * yielding the first result to succeed. If neither effect succeeds, then the
 * composed effect will fail with some error.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated.
 *
 * @ets_data_first raceEither_
 */
export declare function raceEither<R2, E2, A2>(that: Effect<R2, E2, A2>, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R & R2, E2 | E, E.Either<A, A2>>;
/**
 * Returns an effect that races this effect with the specified effect,
 * yielding the first result to complete, whether by success or failure. If
 * neither effect completes, then the composed effect will not complete.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated. If early return is
 * desired, then instead of performing `l raceFirst r`, perform
 * `l.disconnect raceFirst r.disconnect`, which disconnects left and right
 * interrupt signal, allowing a fast return, with interruption performed
 * in the background.
 */
export declare function raceFirst_<R, R2, E, E2, A, A2>(self: Effect<R, E, A>, that: Effect<R2, E2, A2>, __trace?: string): Effect<R & R2, E2 | E, A2 | A>;
/**
 * Returns an effect that races this effect with the specified effect,
 * yielding the first result to complete, whether by success or failure. If
 * neither effect completes, then the composed effect will not complete.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated. If early return is
 * desired, then instead of performing `l raceFirst r`, perform
 * `l.disconnect raceFirst r.disconnect`, which disconnects left and right
 * interrupt signal, allowing a fast return, with interruption performed
 * in the background.
 *
 * @ets_data_first raceFirst_
 */
export declare function raceFirst<R2, E2, A2>(that: Effect<R2, E2, A2>, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R & R2, E2 | E, A2 | A>;
//# sourceMappingURL=race.d.ts.map