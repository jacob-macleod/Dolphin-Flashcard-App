import type * as T from "../../../../Effect/index.js";
import type * as M from "../../../../Managed/index.js";
import type * as C from "../core.js";
/**
 * Like `Stream#forEach`, but returns a `Managed` so the finalization order
 * can be controlled.
 */
export declare function runForEachManaged_<R, R1, E, A, Z>(self: C.Stream<R, E, A>, f: (a: A) => T.Effect<R1, E, Z>): M.Managed<R & R1, E, void>;
/**
 * Like `Stream#forEach`, but returns a `Managed` so the finalization order
 * can be controlled.
 *
 * @ets_data_first runForEachManaged_
 */
export declare function runForEachManaged<R1, E, A, B>(f: (a: A) => T.Effect<R1, E, B>): <R>(self: C.Stream<R, E, A>) => M.Managed<R & R1, E, void>;
//# sourceMappingURL=runForEachManaged.d.ts.map