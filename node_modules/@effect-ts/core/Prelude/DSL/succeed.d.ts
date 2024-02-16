import type { Any } from "../Any/index.js";
import type { Covariant } from "../Covariant/index.js";
import type * as HKT from "../HKT/index.js";
export declare function succeedF<F extends HKT.URIS, C = HKT.Auto>(F: Any<F, C> & Covariant<F, C>): <A, K = HKT.Initial<C, "K">, Q = HKT.Initial<C, "Q">, W = HKT.Initial<C, "W">, X = HKT.Initial<C, "X">, I = HKT.Initial<C, "I">, S = HKT.Initial<C, "S">, R = HKT.Initial<C, "R">, E = HKT.Initial<C, "E">>(a: A) => HKT.Kind<F, C, K, Q, W, X, I, S, R, E, A>;
//# sourceMappingURL=succeed.d.ts.map