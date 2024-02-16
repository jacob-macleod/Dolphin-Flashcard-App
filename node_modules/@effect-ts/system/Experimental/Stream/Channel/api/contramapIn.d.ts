import * as C from "../core.js";
export declare function contramapIn_<Env, InErr, InElem0, InElem, InDone, OutErr, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, f: (a: InElem0) => InElem): C.Channel<Env, InErr, InElem0, InDone, OutErr, OutElem, OutDone>;
/**
 * @ets_data_first contramapIn_
 */
export declare function contramapIn<InElem0, InElem>(f: (a: InElem0) => InElem): <Env, InErr, InDone, OutErr, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>) => C.Channel<Env, InErr, InElem0, InDone, OutErr, OutElem, OutDone>;
//# sourceMappingURL=contramapIn.d.ts.map