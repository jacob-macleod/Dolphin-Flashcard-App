import type * as T from "../../../../Effect/index.js";
import * as C from "../core.js";
export declare function mapOutEffect_<Env, Env1, InErr, InElem, InDone, OutErr, OutErr1, OutElem, OutElem1, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, f: (o: OutElem) => T.Effect<Env1, OutErr1, OutElem1>): C.Channel<Env & Env1, InErr, InElem, InDone, OutErr | OutErr1, OutElem1, OutDone>;
/**
 * @ets_data_first mapOutEffect_
 */
export declare function mapOutEffect<Env1, OutErr1, OutElem, OutElem1>(f: (o: OutElem) => T.Effect<Env1, OutErr1, OutElem1>): <Env, InErr, InElem, InDone, OutErr, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>) => C.Channel<Env & Env1, InErr, InElem, InDone, OutErr1 | OutErr, OutElem1, OutDone>;
//# sourceMappingURL=mapOutEffect.d.ts.map