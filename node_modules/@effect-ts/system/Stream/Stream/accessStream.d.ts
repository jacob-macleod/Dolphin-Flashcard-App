import type { Stream } from "./definitions.js";
/**
 * Accesses the environment of the stream in the context of a stream.
 */
export declare function accessStream<R, R1, E, A>(f: (r: R) => Stream<R1, E, A>): Stream<R & R1, E, A>;
//# sourceMappingURL=accessStream.d.ts.map