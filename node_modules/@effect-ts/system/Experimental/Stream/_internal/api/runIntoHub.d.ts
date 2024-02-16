import type * as T from "../../../../Effect/index.js";
import * as H from "../../../../Hub/index.js";
import type * as TK from "../../Take/index.js";
import type * as C from "../core.js";
/**
 * Publishes elements of this stream to a hub. Stream failure and ending will
 * also be signalled.
 */
export declare function runIntoHub_<R, R1, E extends E1, E1, A>(self: C.Stream<R, E, A>, hub: H.XHub<R1, never, never, unknown, TK.Take<E1, A>, any>): T.Effect<R & R1, E | E1, void>;
/**
 * Publishes elements of this stream to a hub. Stream failure and ending will
 * also be signalled.
 *
 * @ets_data_first runIntoHub_
 */
export declare function runIntoHub<R1, E1, A>(hub: H.XHub<R1, never, never, unknown, TK.Take<E1, A>, any>): <R, E extends E1>(self: C.Stream<R, E, A>) => T.Effect<R & R1, E1 | E, void>;
//# sourceMappingURL=runIntoHub.d.ts.map