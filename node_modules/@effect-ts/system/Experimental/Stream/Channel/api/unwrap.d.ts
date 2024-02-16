import type * as T from "../../../../Effect/index.js";
import * as C from "../core.js";
/**
 * Makes a channel from an effect that returns a channel in case of success
 */
export declare function unwrap<R, E, Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>(self: T.Effect<R, E, C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>>): C.Channel<R & Env, InErr, InElem, InDone, E | OutErr, OutElem, OutDone>;
//# sourceMappingURL=unwrap.d.ts.map