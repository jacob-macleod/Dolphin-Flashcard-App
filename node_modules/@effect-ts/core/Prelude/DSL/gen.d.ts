import type * as HKT from "../HKT/index.js";
import type { Monad } from "../Monad/index.js";
export declare class GenHKT<T, A> {
    readonly effect: T;
    constructor(effect: T);
    [Symbol.iterator](): Generator<GenHKT<T, A>, A, any>;
}
export declare class GenLazyHKT<T, A> {
    readonly effect: () => T;
    constructor(effect: () => T);
    [Symbol.iterator](): Generator<GenLazyHKT<T, A>, A, any>;
}
/**
 * To be used with multi-shot monads, required adapter to be lazy
 * and is O(n^2) perf wise because the generator needs to be replayed
 */
export declare function genWithHistoryF<F extends HKT.URIS, C, ADAPTER = {
    <K, Q, W, X, I, S, R, E, A>(_: () => HKT.Kind<F, C, K, Q, W, X, I, S, R, E, A>): GenLazyHKT<HKT.Kind<F, C, K, Q, W, X, I, S, R, E, A>, A>;
}>(F: Monad<F>, config?: {
    adapter?: ADAPTER;
}): <Eff extends GenLazyHKT<HKT.Kind<F, C, any, any, any, any, any, any, any, any, any>, any>, AEff>(f: (i: ADAPTER) => Generator<Eff, AEff, any>) => HKT.Kind<F, C, HKT.Infer<F, C, "K", ReturnType<Eff["effect"]>>, HKT.Infer<F, C, "Q", ReturnType<Eff["effect"]>>, HKT.Infer<F, C, "W", ReturnType<Eff["effect"]>>, HKT.Infer<F, C, "X", ReturnType<Eff["effect"]>>, HKT.Infer<F, C, "I", ReturnType<Eff["effect"]>>, HKT.Infer<F, C, "S", ReturnType<Eff["effect"]>>, HKT.Infer<F, C, "R", ReturnType<Eff["effect"]>>, HKT.Infer<F, C, "E", ReturnType<Eff["effect"]>>, AEff>;
/**
 * To be used in one-shot monads, adapter is eager and perf is native
 */
export declare function genF<F extends HKT.URIS, C, ADAPTER = {
    <K, Q, W, X, I, S, R, E, A>(_: HKT.Kind<F, C, K, Q, W, X, I, S, R, E, A>): GenHKT<HKT.Kind<F, C, K, Q, W, X, I, S, R, E, A>, A>;
}>(F: Monad<F>, config?: {
    adapter?: ADAPTER;
}): <Eff extends GenHKT<HKT.Kind<F, C, any, any, any, any, any, any, any, any, any>, any>, AEff>(f: (i: ADAPTER) => Generator<Eff, AEff, any>) => HKT.Kind<F, C, HKT.Infer<F, C, "K", Eff["effect"]>, HKT.Infer<F, C, "Q", Eff["effect"]>, HKT.Infer<F, C, "W", Eff["effect"]>, HKT.Infer<F, C, "X", Eff["effect"]>, HKT.Infer<F, C, "I", Eff["effect"]>, HKT.Infer<F, C, "S", Eff["effect"]>, HKT.Infer<F, C, "R", Eff["effect"]>, HKT.Infer<F, C, "E", Eff["effect"]>, AEff>;
//# sourceMappingURL=gen.d.ts.map