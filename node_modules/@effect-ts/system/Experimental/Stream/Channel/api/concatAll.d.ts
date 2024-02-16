import * as C from "../core.js";
export declare function concatAll<Env, InErr, InElem, InDone, OutErr, OutElem>(channels: C.Channel<Env, InErr, InElem, InDone, OutErr, C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, any>, any>): C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, any>;
//# sourceMappingURL=concatAll.d.ts.map