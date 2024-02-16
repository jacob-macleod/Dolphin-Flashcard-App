import type * as T from "../../../../Effect/index.js";
import * as C from "../core.js";
export declare function ensuring_<Env, Env1, InErr, InElem, InDone, OutErr, OutElem, OutDone, Z>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, finalizer: T.RIO<Env1, Z>): C.Channel<Env & Env1, InErr, InElem, InDone, OutErr, OutElem, OutDone>;
/**
 * @ets_data_first ensuring_
 */
export declare function ensuring<Env1, Z>(finalizer: T.RIO<Env1, Z>): <Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>) => C.Channel<Env & Env1, InErr, InElem, InDone, OutErr, OutElem, OutDone>;
//# sourceMappingURL=ensuring.d.ts.map