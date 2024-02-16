import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import type * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import type * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
export declare function runCollect<Env, InErr, InDone, OutErr, OutElem, OutDone>(self: C.Channel<Env, InErr, unknown, InDone, OutErr, OutElem, OutDone>): T.Effect<Env, OutErr, Tp.Tuple<[CK.Chunk<OutElem>, OutDone]>>;
//# sourceMappingURL=runCollect.d.ts.map