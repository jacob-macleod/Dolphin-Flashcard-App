import { Stream } from "./definitions.js";
/**
 * Transforms the errors emitted by this stream using `f`.
 */
export declare function mapError_<R, E, E2, O>(self: Stream<R, E, O>, f: (e: E) => E2): Stream<R, E2, O>;
/**
 * Transforms the errors emitted by this stream using `f`.
 */
export declare function mapError<E, E2>(f: (e: E) => E2): <R, O>(self: Stream<R, E, O>) => Stream<R, E2, O>;
//# sourceMappingURL=mapError.d.ts.map