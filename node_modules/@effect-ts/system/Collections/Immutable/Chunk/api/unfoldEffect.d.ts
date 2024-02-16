import type { Effect } from "../../../../Effect/effect.js";
import * as O from "../../../../Option/index.js";
import type * as Tp from "../../Tuple/index.js";
import type { Chunk } from "../core.js";
/**
 * Constructs a `Chunk` by repeatedly applying the effectual function `f` as
 * long as it returns `Some`.
 */
export declare function unfoldEffect<A, R, E, S>(s: S, f: (s: S) => Effect<R, E, O.Option<Tp.Tuple<[A, S]>>>): Effect<R, E, Chunk<A>>;
//# sourceMappingURL=unfoldEffect.d.ts.map