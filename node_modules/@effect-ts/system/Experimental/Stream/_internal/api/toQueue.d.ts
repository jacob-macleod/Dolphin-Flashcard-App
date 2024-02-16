import * as M from "../../../../Managed/index.js";
import * as Q from "../../../../Queue/index.js";
import type * as TK from "../../Take/index.js";
import type * as C from "../core.js";
/**
 * Converts the stream to a managed queue of chunks. After the managed queue is used,
 * the queue will never again produce values and should be discarded.
 */
export declare function toQueue_<R, E, A>(self: C.Stream<R, E, A>, capacity?: number): M.RIO<R, Q.Queue<TK.Take<E, A>>>;
/**
 * Converts the stream to a managed queue of chunks. After the managed queue is used,
 * the queue will never again produce values and should be discarded.
 *
 * @ets_data_first toQueue_
 */
export declare function toQueue(capacity?: number): <R, E, A>(self: C.Stream<R, E, A>) => M.RIO<R, Q.Queue<TK.Take<E, A>>>;
//# sourceMappingURL=toQueue.d.ts.map