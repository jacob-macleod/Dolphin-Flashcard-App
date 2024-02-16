/**
 * Fails the stream with given error if it does not produce a value after d duration.
 */
export declare function timeoutError<E1>(e: () => E1): (d: number) => <R, E, O>(self: import("./definitions.js").Stream<R, E, O>) => import("./definitions.js").Stream<R & import("../../Clock/index.js").HasClock, E1 | E, O>;
//# sourceMappingURL=timeoutError.d.ts.map