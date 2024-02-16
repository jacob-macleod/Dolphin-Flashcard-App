import type * as C from "../core.js";
/**
 * Accesses the environment of the stream in the context of a stream.
 */
export declare function accessStream<R, R1, E, A>(f: (r: R) => C.Stream<R1, E, A>): C.Stream<R & R1, E, A>;
//# sourceMappingURL=accessStream.d.ts.map