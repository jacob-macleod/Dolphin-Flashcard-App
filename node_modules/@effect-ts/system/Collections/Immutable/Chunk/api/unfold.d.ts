import * as O from "../../../../Option/index.js";
import type * as Tp from "../../Tuple/index.js";
import type { Chunk } from "../core.js";
/**
 * Constructs a `Chunk` by repeatedly applying the function `f` as long as it
 * returns `Some`.
 */
export declare function unfold<A, S>(s: S, f: (s: S) => O.Option<Tp.Tuple<[A, S]>>): Chunk<A>;
//# sourceMappingURL=unfold.d.ts.map