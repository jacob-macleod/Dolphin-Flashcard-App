import type * as T from "../../../../Effect/index.js";
import * as C from "../core.js";
export declare function contramapEffect_<Env, Env1, InErr, InElem, InDone0, InDone, OutErr, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, f: (i: InDone0) => T.Effect<Env1, InErr, InDone>): C.Channel<Env1 & Env, InErr, InElem, InDone0, OutErr, OutElem, OutDone>;
/**
 * @ets_data_first contramapEffect_
 */
export declare function contramapEffect<Env1, InErr, InDone0, InDone>(f: (i: InDone0) => T.Effect<Env1, InErr, InDone>): <Env, InElem, OutErr, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>) => C.Channel<Env1 & Env, InErr, InElem, InDone0, OutErr, OutElem, OutDone>;
//# sourceMappingURL=contramapEffect.d.ts.map