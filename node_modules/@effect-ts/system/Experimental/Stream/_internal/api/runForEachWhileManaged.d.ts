import type * as T from "../../../../Effect/index.js";
import type * as M from "../../../../Managed/index.js";
import type * as C from "../core.js";
/**
 * Like `Stream#forEachWhile`, but returns a `Managed` so the finalization order
 * can be controlled.
 */
export declare function runForEachWhileManaged_<R, R1, E, E1, A>(self: C.Stream<R, E, A>, f: (a: A) => T.Effect<R1, E1, boolean>): M.Managed<R & R1, E | E1, void>;
/**
 * Like `Stream#forEachWhile`, but returns a `Managed` so the finalization order
 * can be controlled.
 *
 * @ets_data_first runForEachWhileManaged_
 */
export declare function runForEachWhileManaged<R1, E1, A>(f: (a: A) => T.Effect<R1, E1, boolean>): <R, E>(self: C.Stream<R, E, A>) => M.Managed<R & R1, E1 | E, void>;
//# sourceMappingURL=runForEachWhileManaged.d.ts.map