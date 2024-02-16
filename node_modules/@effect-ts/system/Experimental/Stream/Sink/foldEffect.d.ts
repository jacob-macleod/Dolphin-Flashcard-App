import * as T from "../../../Effect/index.js";
import * as C from "./core.js";
/**
 * A sink that effectfully folds its inputs with the provided function, termination predicate and initial state.
 */
export declare function foldEffect<Env, Err, In, S>(z: S, contFn: (s: S) => boolean, f: (s: S, in_: In) => T.Effect<Env, Err, S>): C.Sink<Env, Err, In, Err, In, S>;
//# sourceMappingURL=foldEffect.d.ts.map