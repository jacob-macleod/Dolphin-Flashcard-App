import "../Operator/index.js";
import * as E from "../Either/index.js";
import type { Access, Fail, Provide, Run } from "../Prelude/FX/index.js";
import * as HKT from "../Prelude/HKT/index.js";
import type { Any, Applicative, Covariant, Monad, URI } from "../Prelude/index.js";
export declare type V<C> = HKT.CleanParam<C, "E"> & HKT.V<"E", "+">;
export declare function monad<F extends HKT.URIS, C>(M: Monad<F, C>): Monad<[F[0], ...HKT.Rest<F>, URI<E.EitherURI>], V<C>>;
export declare function applicative<F extends HKT.URIS, C>(M: Applicative<F, C>): Applicative<[F[0], ...HKT.Rest<F>, URI<E.EitherURI>], V<C>>;
export declare function run<F extends HKT.URIS, C>(M: Covariant<F, C>): Run<[F[0], ...HKT.Rest<F>, URI<E.EitherURI>], V<C>>;
export declare function fail<F extends HKT.URIS, C>(M: Any<F, C> & Covariant<F, C>): Fail<[F[0], ...HKT.Rest<F>, URI<E.EitherURI>], V<C>>;
export declare function access<F extends HKT.URIS, C>(M: Access<F, C> & Covariant<F, C>): Access<[F[0], ...HKT.Rest<F>, URI<E.EitherURI>], V<C>>;
export declare function provide<F extends HKT.URIS, C>(M: Provide<F, C>): Provide<[F[0], ...HKT.Rest<F>, URI<E.EitherURI>], V<C>>;
//# sourceMappingURL=index.d.ts.map