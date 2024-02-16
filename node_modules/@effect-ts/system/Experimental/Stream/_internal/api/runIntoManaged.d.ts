import * as M from "../../../../Managed/index.js";
import * as Q from "../../../../Queue/index.js";
import * as TK from "../../Take/index.js";
import type * as C from "../core.js";
/**
 * Like `Stream#into`, but provides the result as a `Managed` to allow for scope
 * composition.
 */
export declare function runIntoManaged_<R, R1, E extends E1, E1, A, Z>(self: C.Stream<R, E, A>, queue: Q.XQueue<R1, never, never, unknown, TK.Take<E1, A>, Z>): M.Managed<R & R1, E | E1, void>;
/**
 * Like `Stream#into`, but provides the result as a `Managed` to allow for scope
 * composition.
 *
 * @ets_data_first runIntoManaged_
 */
export declare function runIntoManaged<R1, E1, A, Z>(queue: Q.XQueue<R1, never, never, unknown, TK.Take<E1, A>, Z>): <R, E extends E1>(self: C.Stream<R, E, A>) => M.Managed<R & R1, E1 | E, void>;
//# sourceMappingURL=runIntoManaged.d.ts.map