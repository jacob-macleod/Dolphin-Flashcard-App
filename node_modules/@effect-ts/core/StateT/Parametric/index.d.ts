import type { StateInURI, StateOutURI } from "../../Modules/index.js";
import * as HKT from "../../Prelude/HKT/index.js";
import type { Monad } from "../../Prelude/index.js";
/**
 * Take over ownership of "S" making it fixed to provided "S"
 */
export declare type V<C, S> = HKT.CleanParam<C, "S"> & HKT.Fix<"S", S>;
/**
 * State Input URI with local override of "S", this makes it safe to be
 * stacked multiple times
 */
export interface PSIn<S> extends HKT.URI<StateInURI, HKT.Fix<"S", S>> {
}
/**
 * State Output URI with local override of "S", this makes it safe to be
 * stacked multiple times
 */
export interface PSOut<S> extends HKT.URI<StateOutURI, HKT.Fix<"S", S>> {
}
/**
 * Construct the transformed URI as [StateIn, F, StateOut]
 */
export declare type ParametricStateT<F extends HKT.URIS, S> = [PSIn<S>, ...F, PSOut<S>];
export declare function monad<S>(): <F extends HKT.URIS, C>(M: Monad<F, C>) => Monad<[PSIn<S>, ...F, PSOut<S>], V<C, S>>;
//# sourceMappingURL=index.d.ts.map