import * as C from "../core.js";
export declare type TerminationStrategy = "Left" | "Right" | "Both" | "Either";
/**
 * Merges this stream and the specified stream together to a common element
 * type with the specified mapping functions.
 *
 * New produced stream will terminate when both specified stream terminate if
 * no termination strategy is specified.
 */
export declare function mergeWith<R, R1, E, E1, A, A1, A2, A3>(self: C.Stream<R, E, A>, that: C.Stream<R1, E1, A1>, l: (a: A) => A2, r: (a: A1) => A3, strategy?: TerminationStrategy): C.Stream<R1 & R, E | E1, A2 | A3>;
//# sourceMappingURL=mergeWith.d.ts.map