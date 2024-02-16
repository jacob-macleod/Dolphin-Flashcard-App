import "../Operator/index.js";
import type { Access, Fail, Provide, Run } from "../Prelude/FX/index.js";
import * as HKT from "../Prelude/HKT/index.js";
import type { Applicative, AssociativeEither, Monad } from "../Prelude/index.js";
import * as R from "../Reader/index.js";
export declare type V<C> = HKT.CleanParam<C, "R"> & HKT.V<"R", "-">;
export declare function monad<F extends HKT.URIS, C>(M: Monad<F, C>): Monad<[HKT.URI<R.ReaderURI>, ...F], V<C>>;
export declare function access<F extends HKT.URIS, C>(M: Monad<F, C>): Access<[HKT.URI<R.ReaderURI>, ...F], V<C>>;
export declare function associativeEither<F extends HKT.URIS, C>(M: AssociativeEither<F, C>): AssociativeEither<[HKT.URI<R.ReaderURI>, ...F], V<C>>;
export declare function provide<F extends HKT.URIS, C>(M: Monad<F, C>): Provide<[HKT.URI<R.ReaderURI>, ...F], V<C>>;
export declare function applicative<F extends HKT.URIS, C>(M: Applicative<F, C>): Applicative<[HKT.URI<R.ReaderURI>, ...F], V<C>>;
export declare function run<F extends HKT.URIS, C>(M: Run<F, C>): Run<[HKT.URI<R.ReaderURI>, ...F], V<C>>;
export declare function fail<F extends HKT.URIS, C>(M: Fail<F, C>): Fail<[HKT.URI<R.ReaderURI>, ...F], V<C>>;
//# sourceMappingURL=index.d.ts.map