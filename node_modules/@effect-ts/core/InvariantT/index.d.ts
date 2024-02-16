import "../Operator/index.js";
import type * as HKT from "../Prelude/HKT/index.js";
import * as P from "../Prelude/index.js";
export declare function monad<P extends HKT.Param>(_: P): <F extends HKT.URIS, C>(M: P.Monad<F, C>) => P.Monad<F, HKT.CleanParam<C, P> & HKT.V<P, "_">>;
export declare function applicative<P extends HKT.Param>(_: P): <F extends HKT.URIS, C>(M: P.Applicative<F, C>) => P.Applicative<F, HKT.CleanParam<C, P> & P.V<P, "_">>;
//# sourceMappingURL=index.d.ts.map