import type * as C from "../core.js";
import * as MergeAllWith from "./mergeAllWith.js";
export declare function mergeAll_<Env, InErr, InElem, InDone, OutErr, OutElem>(channels: C.Channel<Env, InErr, InElem, InDone, OutErr, C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, any>, any>, n: number, bufferSize?: number, mergeStrategy?: MergeAllWith.MergeStrategy): C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, any>;
/**
 * @ets_data_first mergeAll_
 */
export declare function mergeAll(n: number, bufferSize?: number, mergeStrategy?: MergeAllWith.MergeStrategy): <Env, InErr, InElem, InDone, OutErr, OutElem>(channels: C.Channel<Env, InErr, InElem, InDone, OutErr, C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, any>, any>) => C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, any>;
export { MergeStrategy } from "./mergeAllWith.js";
//# sourceMappingURL=mergeAll.d.ts.map