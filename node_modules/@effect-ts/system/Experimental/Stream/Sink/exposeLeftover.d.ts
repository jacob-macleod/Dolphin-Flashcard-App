import * as CK from "../../../Collections/Immutable/Chunk/index.js";
import * as Tp from "../../../Collections/Immutable/Tuple/index.js";
import * as C from "./core.js";
export declare function exposeLeftover<R, InErr, In, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>): C.Sink<R, InErr, In, OutErr, unknown, Tp.Tuple<[Z, CK.Chunk<L>]>>;
//# sourceMappingURL=exposeLeftover.d.ts.map