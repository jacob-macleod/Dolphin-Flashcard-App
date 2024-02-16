import * as C from "../core.js";
export declare type MergeStrategy = "BackPressure" | "BufferSliding";
export declare function mergeAllWith_<Env, Env1, InErr, InErr1, InElem, InElem1, InDone, InDone1, OutErr, OutErr1, OutElem, OutDone>(channels: C.Channel<Env, InErr, InElem, InDone, OutErr, C.Channel<Env1, InErr1, InElem1, InDone1, OutErr1, OutElem, OutDone>, OutDone>, n: number, f: (o1: OutDone, o2: OutDone) => OutDone, bufferSize?: number, mergeStrategy?: MergeStrategy): C.Channel<Env & Env1, InErr & InErr1, InElem & InElem1, InDone & InDone1, OutErr | OutErr1, OutElem, OutDone>;
/**
 * @ets_data_first mergeAllWith_
 */
export declare function mergeAllWith<OutDone>(n: number, f: (o1: OutDone, o2: OutDone) => OutDone, bufferSize?: number, mergeStrategy?: MergeStrategy): <Env, Env1, InErr, InErr1, InElem, InElem1, InDone, InDone1, OutErr, OutErr1, OutElem>(channels: C.Channel<Env, InErr, InElem, InDone, OutErr, C.Channel<Env1, InErr1, InElem1, InDone1, OutErr1, OutElem, OutDone>, OutDone>) => C.Channel<Env & Env1, InErr & InErr1, InElem & InElem1, InDone & InDone1, OutErr | OutErr1, OutElem, OutDone>;
//# sourceMappingURL=mergeAllWith.d.ts.map