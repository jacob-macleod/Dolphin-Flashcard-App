import type { Predicate } from "../../../Function/index.js";
import * as C from "./core.js";
/**
 * A sink that folds its inputs with the provided function, termination predicate and initial state.
 */
export declare function reduce<S, In, Err>(z: S, cont: Predicate<S>, f: (s: S, _in: In) => S): C.Sink<unknown, Err, In, Err, In, S>;
//# sourceMappingURL=reduce.d.ts.map