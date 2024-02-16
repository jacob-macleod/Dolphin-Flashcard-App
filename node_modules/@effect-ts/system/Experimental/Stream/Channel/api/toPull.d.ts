import * as T from "../../../../Effect/index.js";
import * as E from "../../../../Either/index.js";
import * as M from "../../../../Managed/index.js";
import type * as C from "../core.js";
/**
 * Interpret a channel to a managed Pull
 */
export declare function toPull<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>): M.Managed<Env, never, T.Effect<Env, OutErr, E.Either<OutDone, OutElem>>>;
//# sourceMappingURL=toPull.d.ts.map