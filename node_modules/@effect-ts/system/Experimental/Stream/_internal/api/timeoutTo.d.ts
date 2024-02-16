import type * as CL from "../../../../Clock/index.js";
import type * as C from "../core.js";
export declare const StreamTimeoutSymbol: unique symbol;
export declare class StreamTimeoutError {
    readonly message?: string | undefined;
    readonly [StreamTimeoutSymbol] = "StreamTimeoutError";
    constructor(message?: string | undefined);
}
export declare const isStreamTimeoutError: (u: unknown) => u is StreamTimeoutError;
/**
 * Switches the stream if it does not produce a value after d duration.
 */
export declare function timeoutTo_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, d: number, that: C.Stream<R1, E1, A1>): C.Stream<R & CL.HasClock & R1, E | E1, A | A1>;
/**
 * Switches the stream if it does not produce a value after d duration.
 *
 * @ets_data_first timeoutTo_
 */
export declare function timeoutTo<R1, E1, A1>(d: number, that: C.Stream<R1, E1, A1>): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R & CL.HasClock & R1, E1 | E, A1 | A>;
//# sourceMappingURL=timeoutTo.d.ts.map