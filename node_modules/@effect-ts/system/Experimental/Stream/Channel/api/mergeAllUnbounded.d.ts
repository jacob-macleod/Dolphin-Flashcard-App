import type * as C from "../core.js";
export declare function mergeAllUnbounded<Env, InErr, InElem, InDone, OutErr, OutElem>(channels: C.Channel<Env, InErr, InElem, InDone, OutErr, C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, any>, any>): C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, any>;
//# sourceMappingURL=mergeAllUnbounded.d.ts.map