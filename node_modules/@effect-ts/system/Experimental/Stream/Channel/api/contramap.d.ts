import * as C from "../core.js";
export declare function contramap_<Env, InErr, InElem, InDone0, InDone, OutErr, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, f: (a: InDone0) => InDone): C.Channel<Env, InErr, InElem, InDone0, OutErr, OutElem, OutDone>;
/**
 * @ets_data_first contramap_
 */
export declare function contramap<InDone, InDone0>(f: (a: InDone0) => InDone): <Env, InErr, InElem, OutErr, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>) => C.Channel<Env, InErr, InElem, InDone0, OutErr, OutElem, OutDone>;
//# sourceMappingURL=contramap.d.ts.map