import * as O from "../../Option/index.js";
import * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Performs an effectful filter and map in a single step.
 */
export declare function collectM_<R, R1, E, E1, O, O1>(self: Stream<R, E, O>, f: (o: O) => O.Option<T.Effect<R1, E1, O1>>): Stream<R & R1, E | E1, O1>;
/**
 * Performs an effectful filter and map in a single step.
 */
export declare function collectM<R1, E1, O, O1>(f: (o: O) => O.Option<T.Effect<R1, E1, O1>>): <R, E>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, O1>;
//# sourceMappingURL=collectM.d.ts.map