import type * as C from "../core.js";
import * as MergeAll from "./mergeAll.js";
import type { MergeStrategy } from "./mergeAllWith.js";
export declare function mergeMap_<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone, Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1, Z>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, n: number, f: (outElem: OutElem) => C.Channel<Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1, Z>, bufferSize?: number, mergeStrategy?: MergeStrategy): C.Channel<Env & Env1, InErr & InErr1, InElem & InElem1, InDone & InDone1, OutErr | OutErr1, OutElem1, Z>;
/**
 * @ets_data_first mergeMap_
 */
export declare function mergeMap<OutElem, Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1, Z>(n: number, f: (outElem: OutElem) => C.Channel<Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1, Z>, bufferSize?: number, mergeStrategy?: MergeAll.MergeStrategy): <Env, InErr, InElem, InDone, OutErr, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>) => C.Channel<Env & Env1, InErr & InErr1, InElem & InElem1, InDone & InDone1, OutErr1 | OutErr, OutElem1, Z>;
//# sourceMappingURL=mergeMap.d.ts.map