import * as O from "../../Option/index.js";
import * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Effectfully transforms all elements of the stream for as long as the specified partial function is defined.
 */
export declare function collectWhileM_<R, R1, E, E1, O, O2>(self: Stream<R, E, O>, pf: (o: O) => O.Option<T.Effect<R1, E1, O2>>): Stream<R & R1, E | E1, O2>;
/**
 * Effectfully transforms all elements of the stream for as long as the specified partial function is defined.
 */
export declare function collectWhileM<R1, E1, O, O2>(pf: (o: O) => O.Option<T.Effect<R1, E1, O2>>): <R, E>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, O2>;
//# sourceMappingURL=collectWhileM.d.ts.map