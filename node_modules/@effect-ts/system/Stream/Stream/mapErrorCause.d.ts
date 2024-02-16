import * as C from "../../Cause/index.js";
import { Stream } from "./definitions.js";
/**
 * Transforms the full causes of failures emitted by this stream.
 */
export declare function mapErrorCause_<R, E, E2, O>(self: Stream<R, E, O>, f: (e: C.Cause<E>) => C.Cause<E2>): Stream<R, E2, O>;
/**
 * Transforms the full causes of failures emitted by this stream.
 */
export declare function mapErrorCause<E, E2>(f: (e: C.Cause<E>) => C.Cause<E2>): <R, O>(self: Stream<R, E, O>) => Stream<R, E2, O>;
//# sourceMappingURL=mapErrorCause.d.ts.map