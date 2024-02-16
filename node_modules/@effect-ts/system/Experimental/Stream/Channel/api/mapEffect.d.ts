import type * as T from "../../../../Effect/index.js";
import * as C from "../core.js";
/**
 * Returns a new channel, which is the same as this one, except the terminal value of the
 * returned channel is created by applying the specified effectful function to the terminal value
 * of this channel.
 */
export declare function mapEffect_<Env, Env1, InErr, InElem, InDone, OutErr, OutErr1, OutElem, OutDone, OutDone1>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, f: (o: OutDone) => T.Effect<Env1, OutErr1, OutDone1>): C.Channel<Env & Env1, InErr, InElem, InDone, OutErr | OutErr1, OutElem, OutDone1>;
/**
 * Returns a new channel, which is the same as this one, except the terminal value of the
 * returned channel is created by applying the specified effectful function to the terminal value
 * of this channel.
 *
 * @ets_data_first mapEffect_
 */
export declare function mapEffect<Env1, OutErr1, OutDone, OutDone1>(f: (o: OutDone) => T.Effect<Env1, OutErr1, OutDone1>): <Env, InErr, InElem, InDone, OutErr, OutElem>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>) => C.Channel<Env & Env1, InErr, InElem, InDone, OutErr1 | OutErr, OutElem, OutDone1>;
//# sourceMappingURL=mapEffect.d.ts.map