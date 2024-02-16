import * as E from "../../Either/index.js";
import type { Stream } from "./definitions.js";
import type { TerminationStrategy } from "./mergeWith.js";
/**
 * Merges this stream and the specified stream together.
 *
 * New produced stream will terminate when both specified stream terminate if no termination
 * strategy is specified.
 */
export declare function merge_<R, E, A, R1, E1, B>(self: Stream<R, E, A>, that: Stream<R1, E1, B>, strategy?: TerminationStrategy): Stream<R1 & R, E | E1, A | B>;
/**
 * Merges this stream and the specified stream together.
 *
 * New produced stream will terminate when both specified stream terminate if no termination
 * strategy is specified.
 *
 * @ets_data_first merge_
 */
export declare function merge<R1, E1, B>(that: Stream<R1, E1, B>, strategy?: TerminationStrategy): <R, E, A>(self: Stream<R, E, A>) => Stream<R1 & R, E1 | E, B | A>;
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when either stream terminates.
 */
export declare function mergeTerminateEither_<R, E, A, R1, E1, B>(self: Stream<R, E, A>, that: Stream<R1, E1, B>): Stream<R1 & R, E | E1, A | B>;
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when either stream terminates.
 */
export declare function mergeTerminateEither<R1, E1, B>(that: Stream<R1, E1, B>): <R, E, A>(self: Stream<R, E, A>) => Stream<R1 & R, E1 | E, B | A>;
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when this stream terminates.
 */
export declare function mergeTerminateLeft_<R, E, A, R1, E1, B>(self: Stream<R, E, A>, that: Stream<R1, E1, B>): Stream<R1 & R, E | E1, A | B>;
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when this stream terminates.
 */
export declare function mergeTerminateLeft<R1, E1, B>(that: Stream<R1, E1, B>): <R, E, A>(self: Stream<R, E, A>) => Stream<R1 & R, E1 | E, B | A>;
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when the specified stream terminates.
 */
export declare function mergeTerminateRight_<R, E, A, R1, E1, B>(self: Stream<R, E, A>, that: Stream<R1, E1, B>): Stream<R1 & R, E | E1, A | B>;
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when the specified stream terminates.
 */
export declare function mergeTerminateRight<R1, E1, B>(that: Stream<R1, E1, B>): <R, E, A>(self: Stream<R, E, A>) => Stream<R1 & R, E1 | E, B | A>;
/**
 * Merges this stream and the specified stream together to produce a stream of
 * eithers.
 */
export declare function mergeEither_<R, E, A, R1, E1, B>(self: Stream<R, E, A>, that: Stream<R1, E1, B>, strategy?: TerminationStrategy): Stream<R & R1, E | E1, E.Either<A, B>>;
/**
 * Merges this stream and the specified stream together to produce a stream of
 * eithers.
 *
 * @ets_data_first mergeEither_
 */
export declare function mergeEither<R1, E1, B>(that: Stream<R1, E1, B>, strategy?: TerminationStrategy): <R, E, A>(self: Stream<R, E, A>) => Stream<R & R1, E1 | E, E.Either<A, B>>;
//# sourceMappingURL=merge.d.ts.map