import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as T from "../../../../Effect/index.js";
import * as M from "../../../../Managed/index.js";
import * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Interpret the stream as a managed pull
 */
export declare function toPull<R, E, A>(self: C.Stream<R, E, A>): M.RIO<R, T.Effect<R, O.Option<E>, CK.Chunk<A>>>;
//# sourceMappingURL=toPull.d.ts.map