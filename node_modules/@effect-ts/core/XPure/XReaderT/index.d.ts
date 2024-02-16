import "../../Operator/index.js";
import type { Access, Fail, Provide, Run } from "../../Prelude/FX/index.js";
import * as HKT from "../../Prelude/HKT/index.js";
import type { Applicative, Monad } from "../../Prelude/index.js";
import * as R from "../XReader/index.js";
export declare function monad<F extends HKT.URIS, C>(M: Monad<F, C>): Monad<[HKT.URI<R.XReaderURI>, ...F], HKT.CleanParam<C, "R"> & HKT.V<"R", "-">>;
export declare function access<F extends HKT.URIS, C>(M: Monad<F, C>): Access<[HKT.URI<R.XReaderURI>, ...F], HKT.CleanParam<C, "R"> & HKT.V<"R", "-">>;
export declare function provide<F extends HKT.URIS, C>(M: Monad<F, C>): Provide<[HKT.URI<R.XReaderURI>, ...F], HKT.CleanParam<C, "R"> & HKT.V<"R", "-">>;
export declare function applicative<F extends HKT.URIS, C>(M: Applicative<F, C>): Applicative<[HKT.URI<R.XReaderURI>, ...F], HKT.CleanParam<C, "R"> & HKT.V<"R", "-">>;
export declare function run<F extends HKT.URIS, C>(M: Run<F, C>): Run<[HKT.URI<R.XReaderURI>, ...F], HKT.CleanParam<C, "R"> & HKT.V<"R", "-">>;
export declare function fail<F extends HKT.URIS, C>(M: Fail<F, C>): Fail<[HKT.URI<R.XReaderURI>, ...F], HKT.CleanParam<C, "R"> & HKT.V<"R", "-">>;
//# sourceMappingURL=index.d.ts.map