import * as Tp from "../../Collections/Immutable/Tuple/index.js";
import * as O from "../../Option/index.js";
import * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Creates a stream by effectfully peeling off the "layers" of a value of type `S`
 */
export declare function unfoldM<R, E, A, S>(s: S, f: (s: S) => T.Effect<R, E, O.Option<Tp.Tuple<[A, S]>>>): Stream<R, E, A>;
//# sourceMappingURL=unfoldM.d.ts.map