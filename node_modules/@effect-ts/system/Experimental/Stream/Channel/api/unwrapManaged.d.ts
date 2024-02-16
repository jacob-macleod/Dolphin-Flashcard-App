import type * as M from "../../../../Managed/index.js";
import * as C from "../core.js";
/**
 * Makes a channel from a managed that returns a channel in case of success
 */
export declare function unwrapManaged<R, E, Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>(self: M.Managed<R, E, C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>>): C.Channel<R & Env, InErr, InElem, InDone, E | OutErr, OutElem, OutDone>;
//# sourceMappingURL=unwrapManaged.d.ts.map