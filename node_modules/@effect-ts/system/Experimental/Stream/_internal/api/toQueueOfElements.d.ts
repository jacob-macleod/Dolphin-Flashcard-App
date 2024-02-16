import type * as Ex from "../../../../Exit/index.js";
import * as M from "../../../../Managed/index.js";
import type * as O from "../../../../Option/index.js";
import * as Q from "../../../../Queue/index.js";
import type * as C from "../core.js";
/**
 * Converts the stream to a managed queue of elements. After the managed queue is used,
 * the queue will never again produce values and should be discarded.
 */
export declare function toQueueOfElements_<R, E, A>(self: C.Stream<R, E, A>, capacity?: number): M.RIO<R, Q.Queue<Ex.Exit<O.Option<E>, A>>>;
/**
 * Converts the stream to a managed queue of elements. After the managed queue is used,
 * the queue will never again produce values and should be discarded.
 *
 * @ets_data_first toQueueOfElements_
 */
export declare function toQueueOfElements(capacity?: number): <R, E, A>(self: C.Stream<R, E, A>) => M.RIO<R, Q.Queue<Ex.Exit<O.Option<E>, A>>>;
//# sourceMappingURL=toQueueOfElements.d.ts.map