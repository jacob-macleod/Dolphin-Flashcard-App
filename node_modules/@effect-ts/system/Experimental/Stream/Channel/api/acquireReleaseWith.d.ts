import type * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
export declare function acquireReleaseWith_<Env, InErr, InElem, InDone, OutErr, OutElem1, OutDone, Acquired>(acquire: T.Effect<Env, OutErr, Acquired>, use: (a: Acquired) => C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem1, OutDone>, release: (a: Acquired) => T.RIO<Env, any>): C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem1, OutDone>;
/**
 * @ets_data_first acquireReleaseWith_
 */
export declare function acquireReleaseWith<Env, InErr, InElem, InDone, OutErr, OutElem1, OutDone, Acquired>(use: (a: Acquired) => C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem1, OutDone>, release: (a: Acquired) => T.RIO<Env, any>): (acquire: T.Effect<Env, OutErr, Acquired>) => C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem1, OutDone>;
//# sourceMappingURL=acquireReleaseWith.d.ts.map