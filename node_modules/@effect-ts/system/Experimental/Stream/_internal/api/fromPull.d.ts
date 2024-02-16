import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import type * as T from "../../../../Effect/index.js";
import * as M from "../../../../Managed/index.js";
import type * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
export declare function fromPull<R, E, A>(io: M.RIO<R, T.Effect<R, O.Option<E>, CK.Chunk<A>>>): C.Stream<R, E, A>;
//# sourceMappingURL=fromPull.d.ts.map