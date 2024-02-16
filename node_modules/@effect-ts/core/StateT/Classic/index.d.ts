import type { StateInURI, StateOutURI } from "../../Modules/index.js";
import * as HKT from "../../Prelude/HKT/index.js";
import type { Monad } from "../../Prelude/index.js";
/**
 * Take over ownership of "S" making it invariant
 */
export declare type V<C> = HKT.CleanParam<C, "S"> & HKT.V<"S", "_">;
export declare type StateT<F extends HKT.URIS> = [
    HKT.URI<StateInURI>,
    ...F,
    HKT.URI<StateOutURI>
];
export interface StateIn<S, A> {
    (s: S): A;
}
export declare type StateOut<S, A> = readonly [A, S];
export declare function monad<F extends HKT.URIS, C>(M: Monad<F, C>): Monad<StateT<F>, V<C>>;
//# sourceMappingURL=index.d.ts.map