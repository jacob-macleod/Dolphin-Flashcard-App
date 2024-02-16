import * as T from "../../../../Effect/index.js";
import * as C from "../core.js";
export declare function mapOutEffectPar_<Env, Env1, InErr, InElem, InDone, OutErr, OutErr1, OutElem, OutElem1, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, n: number, f: (o: OutElem) => T.Effect<Env1, OutErr1, OutElem1>): C.Channel<Env & Env1, InErr, InElem, InDone, OutErr | OutErr1, OutElem1, OutDone>;
/**
 * @ets_data_first mapOutEffectPar_
 */
export declare function mapOutEffectPar<Env1, OutErr1, OutElem, OutElem1>(n: number, f: (o: OutElem) => T.Effect<Env1, OutErr1, OutElem1>): <Env, InErr, InElem, InDone, OutErr, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>) => C.Channel<Env & Env1, InErr, InElem, InDone, OutErr1 | OutErr, OutElem1, OutDone>;
//# sourceMappingURL=mapOutEffectPar.d.ts.map