import type * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Runs a channel until the end is received
 */
export declare function runDrain<Env, InErr, InDone, OutElem, OutErr, OutDone>(self: C.Channel<Env, InErr, unknown, InDone, OutErr, OutElem, OutDone>): T.Effect<Env, OutErr, OutDone>;
//# sourceMappingURL=runDrain.d.ts.map