import type * as M from "../../../../Managed/index.js";
import * as C from "../core.js";
export declare function managed_<Env, Env1, InErr, InElem, InDone, OutErr, OutErr1, OutElem, OutDone, A>(m: M.Managed<Env, OutErr, A>, use: (a: A) => C.Channel<Env1, InErr, InElem, InDone, OutErr1, OutElem, OutDone>): C.Channel<Env & Env1, InErr, InElem, InDone, OutErr | OutErr1, OutElem, OutDone>;
/**
 * @ets_data_first managed_
 */
export declare function managed<Env, Env1, InErr, InElem, InDone, OutErr, OutErr1, OutElem, OutDone, A>(use: (a: A) => C.Channel<Env1, InErr, InElem, InDone, OutErr1, OutElem, OutDone>): (m: M.Managed<Env, OutErr, A>) => C.Channel<Env & Env1, InErr, InElem, InDone, OutErr | OutErr1, OutElem, OutDone>;
//# sourceMappingURL=managed.d.ts.map