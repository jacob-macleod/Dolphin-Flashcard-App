import * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Creates a stream by peeling off the "layers" of a value of type `S`
 */
export declare function unfold<S, A>(s: S, f: (s: S) => O.Option<Tp.Tuple<[A, S]>>): C.UIO<A>;
//# sourceMappingURL=unfold.d.ts.map