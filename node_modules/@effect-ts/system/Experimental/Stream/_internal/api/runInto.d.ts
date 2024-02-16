import * as T from "../../../../Effect/index.js";
import type * as Q from "../../../../Queue/index.js";
import type * as TK from "../../Take/index.js";
import type * as C from "../core.js";
/**
 * Enqueues elements of this stream into a queue. Stream failure and ending will also be
 * signalled.
 */
export declare function runInto_<R, R1, E extends E1, E1, A>(self: C.Stream<R, E, A>, queue: Q.XQueue<R1, never, never, unknown, TK.Take<E1, A>, any>): T.Effect<R & R1, E | E1, void>;
/**
 * Enqueues elements of this stream into a queue. Stream failure and ending will also be
 * signalled.
 *
 * @ets_data_first runInto_
 */
export declare function runInto<R1, E1, A>(queue: Q.XQueue<R1, never, never, unknown, TK.Take<E1, A>, any>): <R, E extends E1>(self: C.Stream<R, E, A>) => T.Effect<R & R1, E1 | E, void>;
//# sourceMappingURL=runInto.d.ts.map