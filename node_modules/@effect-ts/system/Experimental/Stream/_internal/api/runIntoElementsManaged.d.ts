import * as Ex from "../../../../Exit/index.js";
import * as M from "../../../../Managed/index.js";
import * as O from "../../../../Option/index.js";
import * as Q from "../../../../Queue/index.js";
import type * as C from "../core.js";
export declare function runIntoElementsManaged_<R, R1, E, A>(self: C.Stream<R, E, A>, queue: Q.XQueue<R1, never, never, unknown, Ex.Exit<O.Option<E>, A>, any>): M.Managed<R & R1, E, void>;
/**
 * Like `Stream#into`, but provides the result as a `Managed` to allow for scope
 * composition.
 *
 * @ets_data_first runIntoElementsManaged_
 */
export declare function runIntoElementsManaged<R1, E, A>(queue: Q.XQueue<R1, never, never, unknown, Ex.Exit<O.Option<E>, A>, any>): <R>(self: C.Stream<R, E, A>) => M.Managed<R & R1, E, void>;
//# sourceMappingURL=runIntoElementsManaged.d.ts.map