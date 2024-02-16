import type * as CL from "../../Clock/index.js";
import type { Stream } from "./definitions.js";
export declare const StreamTimeoutSymbol: unique symbol;
export declare class StreamTimeoutError extends Error {
    readonly [StreamTimeoutSymbol] = "StreamTimeoutError";
    constructor(message?: string);
}
export declare const isStreamTimeout: (u: unknown) => u is StreamTimeoutError;
/**
 * Switches the stream if it does not produce a value after d duration.
 */
export declare function timeoutTo(d: number): <R1, E1, O2>(that: Stream<R1, E1, O2>) => <R, E, O>(self: Stream<R, E, O>) => Stream<R & CL.HasClock & R1, E1 | E, O2 | O>;
//# sourceMappingURL=timeoutTo.d.ts.map