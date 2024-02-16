import type { Predicate } from "../../../Function/index.js";
import * as C from "./core.js";
/**
 * A sink that folds its inputs with the provided function, termination predicate and initial state.
 */
export declare function fold<Err, In, S>(z: S, contFn: Predicate<S>, f: (s: S, in_: In) => S): C.Sink<unknown, Err, In, Err, In, S>;
//# sourceMappingURL=fold.d.ts.map