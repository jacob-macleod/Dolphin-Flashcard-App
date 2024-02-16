import * as C from "../core.js";
/**
 * Maps the output of this channel using f
 */
export declare function mapOut_<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone, OutElem2>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, f: (o: OutElem) => OutElem2): C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem2, OutDone>;
/**
 * Maps the output of this channel using f
 *
 * @ets_data_first mapOut_
 */
export declare function mapOut<OutElem, OutElem2>(f: (o: OutElem) => OutElem2): <Env, InErr, InElem, InDone, OutErr, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>) => C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem2, OutDone>;
//# sourceMappingURL=mapOut.d.ts.map