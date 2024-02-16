import * as O from "../../../../Option/index.js";
import * as C from "../core.js";
/**
 * Returns a new channel, which is the same as this one, except its outputs are filtered and
 * transformed by the specified partial function.
 */
export declare function collect_<Env, InErr, InElem, InDone, OutErr, OutElem, OutElem2, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, f: (o: OutElem) => O.Option<OutElem2>): C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem2, OutDone>;
/**
 * Returns a new channel, which is the same as this one, except its outputs are filtered and
 * transformed by the specified partial function.
 *
 * @ets_data_first collect_
 */
export declare function collect<OutElem, OutElem2>(f: (o: OutElem) => O.Option<OutElem2>): <Env, InErr, InElem, InDone, OutErr, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>) => C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem2, OutDone>;
//# sourceMappingURL=collect.d.ts.map