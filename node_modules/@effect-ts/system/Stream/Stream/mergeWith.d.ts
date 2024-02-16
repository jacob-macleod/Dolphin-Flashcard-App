import { Stream } from "./definitions.js";
export declare type TerminationStrategy = "Left" | "Right" | "Both" | "Either";
/**
 * Merges this stream and the specified stream together to a common element
 * type with the specified mapping functions.
 *
 * New produced stream will terminate when both specified stream terminate if
 * no termination strategy is specified.
 *
 * @ets_data_first mergeWith_
 */
export declare function mergeWith<R1, E1, B, A, C, C1>(that: Stream<R1, E1, B>, l: (a: A) => C, r: (b: B) => C1, strategy?: TerminationStrategy): <R, E>(self: Stream<R, E, A>) => Stream<R1 & R, E1 | E, C | C1>;
/**
 * Merges this stream and the specified stream together to a common element
 * type with the specified mapping functions.
 *
 * New produced stream will terminate when both specified stream terminate if
 * no termination strategy is specified.
 */
export declare function mergeWith_<R, E, R1, E1, B, A, C, C1>(self: Stream<R, E, A>, that: Stream<R1, E1, B>, l: (a: A) => C, r: (b: B) => C1, strategy?: TerminationStrategy): Stream<R1 & R, E | E1, C | C1>;
//# sourceMappingURL=mergeWith.d.ts.map