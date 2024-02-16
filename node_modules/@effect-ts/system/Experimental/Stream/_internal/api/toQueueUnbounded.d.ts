import * as M from "../../../../Managed/index.js";
import * as Q from "../../../../Queue/index.js";
import type * as TK from "../../Take/index.js";
import type * as C from "../core.js";
/**
 * Converts the stream into an unbounded managed queue. After the managed queue
 * is used, the queue will never again produce values and should be discarded.
 */
export declare function toQueueUnbounded<R, E, A>(self: C.Stream<R, E, A>): M.RIO<R, Q.Queue<TK.Take<E, A>>>;
//# sourceMappingURL=toQueueUnbounded.d.ts.map