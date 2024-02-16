import type * as CK from "../../../../../Collections/Immutable/Chunk/index.js";
import * as Tp from "../../../../../Collections/Immutable/Tuple/index.js";
import * as M from "../../../../../Managed/index.js";
import * as P from "../../../../../Promise/index.js";
import * as Q from "../../../../../Queue/index.js";
import * as CH from "../../../Channel/index.js";
import * as TK from "../../../Take/index.js";
export declare function bufferSignal<R1, E1, A1>(managed: M.UIO<Q.Queue<Tp.Tuple<[TK.Take<E1, A1>, P.Promise<never, void>]>>>, channel: CH.Channel<R1, unknown, unknown, unknown, E1, CK.Chunk<A1>, any>): CH.Channel<R1, unknown, unknown, unknown, E1, CK.Chunk<A1>, void>;
//# sourceMappingURL=bufferSignal.d.ts.map