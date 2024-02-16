import type * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Runs a channel until the end is received
 */
export declare function run<Env, InErr, InDone, OutErr, OutDone>(self: C.Channel<Env, InErr, unknown, InDone, OutErr, never, OutDone>): T.Effect<Env, OutErr, OutDone>;
//# sourceMappingURL=run.d.ts.map