import * as T from "../../../Effect/index.js";
import type { Predicate } from "../../../Function/index.js";
import * as C from "./core.js";
/**
 * A sink that effectfully folds its inputs with the provided function, termination predicate and initial state.
 */
export declare function reduceEffect<S, Env, In, InErr, OutErr>(z: S, cont: Predicate<S>, f: (s: S, _in: In) => T.Effect<Env, OutErr, S>): C.Sink<Env, InErr, In, InErr | OutErr, In, S>;
//# sourceMappingURL=reduceEffect.d.ts.map