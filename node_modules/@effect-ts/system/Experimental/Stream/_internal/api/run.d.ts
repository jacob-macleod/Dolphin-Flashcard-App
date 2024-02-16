import type * as T from "../../../../Effect/index.js";
import type * as SK from "../../Sink/index.js";
import type * as C from "../core.js";
/**
 * Runs the sink on the stream to produce either the sink's result or an error.
 */
export declare function run_<R, E, A, R2, E2, Z>(self: C.Stream<R, E, A>, sink: SK.Sink<R2, E, A, E2, unknown, Z>): T.Effect<R & R2, E2, Z>;
/**
 * Runs the sink on the stream to produce either the sink's result or an error.
 *
 * @ets_data_first run_
 */
export declare function run<E, A, R2, E2, Z>(sink: SK.Sink<R2, E, A, E2, unknown, Z>): <R>(self: C.Stream<R, E, A>) => T.Effect<R & R2, E2, Z>;
//# sourceMappingURL=run.d.ts.map