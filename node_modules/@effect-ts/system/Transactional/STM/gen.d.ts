/**
 * inspired by https://github.com/tusharmath/qio/pull/22 (revised)
 */
import { _A, _E, _R } from "../../Effect/commons.js";
import type * as Utils from "../../Utils/index.js";
import type { STM } from "./core.js";
export declare class GenSTM<R, E, A> {
    readonly effect: STM<R, E, A>;
    readonly [_R]: (_R: R) => void;
    readonly [_E]: () => E;
    readonly [_A]: () => A;
    constructor(effect: STM<R, E, A>);
    [Symbol.iterator](): Generator<GenSTM<R, E, A>, A, any>;
}
/**
 * Do simulation using Generators
 */
export declare function gen<Eff extends GenSTM<any, any, any>, AEff>(f: (i: {
    <R, E, A>(_: STM<R, E, A>): GenSTM<R, E, A>;
}) => Generator<Eff, AEff, any>): STM<Utils._R<Eff>, Utils._E<Eff>, AEff>;
//# sourceMappingURL=gen.d.ts.map