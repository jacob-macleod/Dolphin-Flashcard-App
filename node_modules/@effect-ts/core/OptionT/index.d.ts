import "../Operator/index.js";
import * as O from "../Option/index.js";
import type { Access, Provide } from "../Prelude/FX/index.js";
import * as HKT from "../Prelude/HKT/index.js";
import type { Applicative, Covariant, Monad } from "../Prelude/index.js";
export declare function monad<F extends HKT.URIS, C>(M: Monad<F, C>): Monad<[F[0], ...HKT.Rest<F>, HKT.URI<O.OptionURI>], C>;
export declare function applicative<F extends HKT.URIS, C>(M: Applicative<F, C>): Applicative<[F[0], ...HKT.Rest<F>, HKT.URI<O.OptionURI>], C>;
export declare function access<F extends HKT.URIS, C>(M: Access<F, C> & Covariant<F, C>): Access<[F[0], ...HKT.Rest<F>, HKT.URI<O.OptionURI>], C>;
export declare function provide<F extends HKT.URIS, C>(M: Provide<F, C>): Provide<[F[0], ...HKT.Rest<F>, HKT.URI<O.OptionURI>], C>;
//# sourceMappingURL=index.d.ts.map