import type * as CS from "../../../../Cause/index.js";
import * as C from "../core.js";
/**
 * Transforms the full causes of failures emitted by this stream.
 */
export declare function mapErrorCause_<R, E, E1, A>(self: C.Stream<R, E, A>, f: (c: CS.Cause<E>) => CS.Cause<E1>): C.Stream<R, E1, A>;
/**
 * Transforms the full causes of failures emitted by this stream.
 *
 * @ets_data_first mapErrorCause_
 */
export declare function mapErrorCause<E, E1>(f: (c: CS.Cause<E>) => CS.Cause<E1>): <R, A>(self: C.Stream<R, E, A>) => C.Stream<R, E1, A>;
//# sourceMappingURL=mapErrorCause.d.ts.map