import type { Either } from "@effect-ts/system/Either";
import type * as HKT from "../HKT/index.js";
export interface ChainRec<F extends HKT.URIS, C = HKT.Auto> {
    readonly chainRec: <A, B, K, Q, W, X, I, S, R, E>(f: (a: A) => HKT.Kind<F, C, K, Q, W, X, I, S, R, E, Either<A, B>>) => (a: A) => HKT.Kind<F, C, K, Q, W, X, I, S, R, E, B>;
}
export declare function tailRec<A, B>(a: A, f: (a: A) => Either<A, B>): B;
//# sourceMappingURL=index.d.ts.map