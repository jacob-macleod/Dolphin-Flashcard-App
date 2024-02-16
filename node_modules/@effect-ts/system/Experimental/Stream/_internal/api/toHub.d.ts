import * as H from "../../../../Hub/index.js";
import * as M from "../../../../Managed/index.js";
import type * as TK from "../../Take/index.js";
import type * as C from "../core.js";
/**
 * Converts the stream to a managed hub of chunks. After the managed hub is used,
 * the hub will never again produce values and should be discarded.
 */
export declare function toHub_<R, E, A>(self: C.Stream<R, E, A>, capacity: number): M.RIO<R, H.Hub<TK.Take<E, A>>>;
/**
 * Converts the stream to a managed hub of chunks. After the managed hub is used,
 * the hub will never again produce values and should be discarded.
 *
 * @ets_data_first toHub_
 */
export declare function toHub(capacity: number): <R, E, A>(self: C.Stream<R, E, A>) => M.RIO<R, H.Hub<TK.Take<E, A>>>;
//# sourceMappingURL=toHub.d.ts.map