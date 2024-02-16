import type * as C from "../core.js";
export declare function orDie_<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone, E>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, err: E): C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>;
/**
 * @ets_data_first orDie_
 */
export declare function orDie<E>(err: E): <Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>) => C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>;
//# sourceMappingURL=orDie.d.ts.map