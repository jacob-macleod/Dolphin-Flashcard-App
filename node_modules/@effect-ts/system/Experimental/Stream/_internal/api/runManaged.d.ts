import type * as M from "../../../../Managed/index.js";
import type * as SK from "../../Sink/index.js";
import type * as C from "../core.js";
export declare function runManaged_<R, R1, E, A, E2, B, L>(self: C.Stream<R, E, A>, sink: SK.Sink<R1, E, A, E2, L, B>): M.Managed<R & R1, E2, B>;
/**
 * @ets_data_first runManaged_
 */
export declare function runManaged<R1, E, A, E2, B>(sink: SK.Sink<R1, E, A, E2, any, B>): <R>(self: C.Stream<R, E, A>) => M.Managed<R & R1, E2, B>;
//# sourceMappingURL=runManaged.d.ts.map