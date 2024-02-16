import * as M from "../../../../Managed/index.js";
import type * as C from "../core.js";
/**
 * Runs a channel until the end is received
 */
export declare function runManaged<Env, InErr, InDone, OutErr, OutDone>(self: C.Channel<Env, InErr, unknown, InDone, OutErr, never, OutDone>): M.Managed<Env, OutErr, OutDone>;
//# sourceMappingURL=runManaged.d.ts.map