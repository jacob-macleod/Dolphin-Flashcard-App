import type * as T from "../../../../Effect/index.js";
import * as C from "../core.js";
export declare function contramapInEffect_<Env, Env1, InErr, InElem0, InElem, InDone, OutErr, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, f: (a: InElem0) => T.Effect<Env1, InErr, InElem>): C.Channel<Env1 & Env, InErr, InElem0, InDone, OutErr, OutElem, OutDone>;
/**
 * @ets_data_first contramapInEffect_
 */
export declare function contramapInEffect<Env1, InErr, InElem0, InElem>(f: (a: InElem0) => T.Effect<Env1, InErr, InElem>): <Env, InDone, OutErr, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>) => C.Channel<Env1 & Env, InErr, InElem0, InDone, OutErr, OutElem, OutDone>;
//# sourceMappingURL=contramapInEffect.d.ts.map