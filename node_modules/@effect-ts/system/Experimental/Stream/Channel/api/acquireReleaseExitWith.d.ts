import * as T from "../../../../Effect/index.js";
import type * as Ex from "../../../../Exit/index.js";
import * as C from "../core.js";
export declare function acquireReleaseExitWith_<Env, InErr, InElem, InDone, OutErr, OutElem1, OutDone, Acquired>(acquire: T.Effect<Env, OutErr, Acquired>, use: (a: Acquired) => C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem1, OutDone>, release: (a: Acquired, exit: Ex.Exit<OutErr, OutDone>) => T.RIO<Env, any>): C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem1, OutDone>;
/**
 * @ets_data_first acquireReleaseExitWith_
 */
export declare function acquireReleaseExitWith<Env, InErr, InElem, InDone, OutErr, OutElem1, OutDone, Acquired>(use: (a: Acquired) => C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem1, OutDone>, release: (a: Acquired, exit: Ex.Exit<OutErr, OutDone>) => T.RIO<Env, any>): (acquire: T.Effect<Env, OutErr, Acquired>) => C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem1, OutDone>;
//# sourceMappingURL=acquireReleaseExitWith.d.ts.map