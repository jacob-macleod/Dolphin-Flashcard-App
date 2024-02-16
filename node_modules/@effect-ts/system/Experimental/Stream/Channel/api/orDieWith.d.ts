import * as C from "../core.js";
export declare function orDieWith_<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone, E>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, f: (e: OutErr) => E): C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>;
/**
 * @ets_data_first orDieWith_
 */
export declare function orDieWith<OutErr, E>(f: (e: OutErr) => E): <Env, InErr, InElem, InDone, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>) => C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>;
//# sourceMappingURL=orDieWith.d.ts.map