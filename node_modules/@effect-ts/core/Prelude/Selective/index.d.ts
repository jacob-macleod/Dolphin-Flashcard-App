import * as E from "@effect-ts/system/Either";
import * as HKT from "../../Prelude/HKT/index.js";
import type { Any } from "../Any/index.js";
import type { Applicative } from "../Applicative/index.js";
import type { Covariant } from "../Covariant/index.js";
import type { Monad } from "../Monad/index.js";
export interface Select<F extends HKT.URIS, C = HKT.Auto> extends HKT.Base<F, C> {
    readonly _Select: "Select";
    readonly select: <K2, Q2, W2, X2, I2, S2, R2, E2, A, B>(fab: HKT.Kind<F, C, K2, Q2, W2, X2, I2, S2, R2, E2, (a: A) => B>) => <K, Q, W, X, I, S, R, E, B2>(fa: HKT.Kind<F, C, HKT.Intro<C, "K", K2, K>, HKT.Intro<C, "Q", Q2, Q>, HKT.Intro<C, "W", W2, W>, HKT.Intro<C, "X", X2, X>, HKT.Intro<C, "I", I2, I>, HKT.Intro<C, "S", S2, S>, HKT.Intro<C, "R", R2, R>, HKT.Intro<C, "E", E2, E>, E.Either<A, B2>>) => HKT.Kind<F, C, HKT.Mix<C, "K", [K2, K]>, HKT.Mix<C, "Q", [Q2, Q]>, HKT.Mix<C, "W", [W2, W]>, HKT.Mix<C, "X", [X2, X]>, HKT.Mix<C, "I", [I2, I]>, HKT.Mix<C, "S", [S2, S]>, HKT.Mix<C, "R", [R2, R]>, HKT.Mix<C, "X", [E2, E]>, B | B2>;
}
export declare type Selective<F extends HKT.URIS, C = HKT.Auto> = Select<F, C> & Covariant<F, C> & Any<F, C>;
export declare type SelectiveMonad<F extends HKT.URIS, C = HKT.Auto> = Selective<F, C> & Monad<F, C>;
export declare function monad<F extends HKT.URIS, C = HKT.Auto>(F: Monad<F, C>): SelectiveMonad<F, C>;
export declare function applicative<F extends HKT.URIS, C = HKT.Auto>(F: Applicative<F, C>): SelectiveMonad<F, C>;
export declare function branchF<F extends HKT.URIS, C = HKT.Auto>(F: Selective<F, C>): <K2, Q2, W2, X2, I2, S2, R2, E2, A, D1, K3, Q3, W3, X3, I3, S3, R3, E3, B, D2>(lhs: HKT.Kind<F, C, K2, Q2, W2, X2, I2, S2, R2, E2, (a: A) => D1>, rhs: HKT.Kind<F, C, K3, Q3, W3, X3, I3, S3, R3, E3, (a: B) => D2>) => <K, Q, W, X, I, S, R, E>(fe: HKT.Kind<F, C, K, Q, W, X, I, S, R, E, E.Either<A, B>>) => HKT.Kind<F, C, HKT.Mix<C, "K", [K, K2, K3]>, HKT.Mix<C, "Q", [Q, Q2, Q3]>, HKT.Mix<C, "W", [W, W2, W3]>, HKT.Mix<C, "X", [X, X2, X3]>, HKT.Mix<C, "I", [I, I2, I3]>, HKT.Mix<C, "S", [S, S2, S3]>, HKT.Mix<C, "R", [R, R2, R3]>, HKT.Mix<C, "X", [E, E2, E3]>, D1 | D2>;
export declare function ifF<F extends HKT.URIS, C = HKT.Auto>(F: Selective<F, C>): <K2, Q2, W2, X2, I2, S2, R2, E2, A, K3, Q3, W3, X3, I3, S3, R3, E3, B>(then_: HKT.Kind<F, C, K2, Q2, W2, X2, I2, S2, R2, E2, A>, else_: HKT.Kind<F, C, K3, Q3, W3, X3, I3, S3, R3, E3, B>) => <K, Q, W, X, I, S, R, E>(if_: HKT.Kind<F, C, K, Q, W, X, I, S, R, E, boolean>) => HKT.Kind<F, C, HKT.Mix<C, "K", [K, K2, K3]>, HKT.Mix<C, "Q", [Q, Q2, Q3]>, HKT.Mix<C, "W", [W, W2, W3]>, HKT.Mix<C, "X", [X, X2, X3]>, HKT.Mix<C, "I", [I, I2, I3]>, HKT.Mix<C, "S", [S, S2, S3]>, HKT.Mix<C, "R", [R, R2, R3]>, HKT.Mix<C, "X", [E, E2, E3]>, A | B>;
export declare function whenF<F extends HKT.URIS, C = HKT.Auto>(F: Selective<F, C>): <K2, Q2, W2, X2, I2, S2, R2, E2>(act: HKT.Kind<F, C, K2, Q2, W2, X2, I2, S2, R2, E2, void>) => <K, Q, W, X, I, S, R, E>(if_: HKT.Kind<F, C, K, Q, W, X, I, S, R, E, boolean>) => HKT.Kind<F, C, HKT.Mix<C, "K", [K, K2]>, HKT.Mix<C, "Q", [Q, Q2]>, HKT.Mix<C, "W", [W, W2]>, HKT.Mix<C, "X", [X, X2]>, HKT.Mix<C, "I", [I, I2]>, HKT.Mix<C, "S", [S, S2]>, HKT.Mix<C, "R", [R, R2]>, HKT.Mix<C, "X", [E, E2]>, void>;
//# sourceMappingURL=index.d.ts.map