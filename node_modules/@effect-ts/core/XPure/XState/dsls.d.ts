import * as P from "../../Prelude/index.js";
/**
 * Struct based applicative for Reader[-_, +_]
 */
export declare const struct: <NER extends Record<string, import("./definition.js").XState<S, unknown>>, K = any, Q = any, W = any, X = any, I = any, S = any, R = any, E = any>(r: import("@effect-ts/system/Utils/index.js").EnforceNonEmptyRecord<NER> & Record<string, import("./definition.js").XState<S, unknown>>) => import("./definition.js").XState<P.Infer<[P.URI<"XState", {}>], import("./definition.js").V, "S", NER[keyof NER]>, { [K_1 in keyof NER]: P.Infer<[P.URI<"XState", {}>], import("./definition.js").V, "A", NER[K_1]>; }>;
/**
 * Struct based applicative for Reader[-_, +_]
 */
export declare const tuple: <T extends import("./definition.js").XState<S, unknown>[], K = any, Q = any, W = any, X = any, I = any, S = any, R = any, E = any>(...t: T & {
    readonly 0: import("./definition.js").XState<S, unknown>;
}) => import("./definition.js").XState<P.Infer<[P.URI<"XState", {}>], import("./definition.js").V, "S", T[number]>, { [K_1 in keyof T]: [T[K_1]] extends [import("./definition.js").XState<any, infer A>] ? A : never; }>;
/**
 * Matchers
 */
export declare const match: <N extends string>(tag: N) => P.MatchFn<[P.URI<"XState", {}>], import("./definition.js").V, N>, matchIn: <N extends string>(tag: N) => P.MatchInFn<[P.URI<"XState", {}>], import("./definition.js").V, N>, matchMorph: <N extends string, X extends { [tag in N]: string; }>(MorphADT: {
    tag: N;
    _A: X;
}) => P.MatchMorphFn<[P.URI<"XState", {}>], import("./definition.js").V, N, X>, matchTag: P.MatchFn<[P.URI<"XState", {}>], import("./definition.js").V, "_tag">, matchTagIn: P.MatchInFn<[P.URI<"XState", {}>], import("./definition.js").V, "_tag">;
/**
 * Conditionals
 */
declare const branch: <X extends import("./definition.js").XState<any, any>, Y extends import("./definition.js").XState<any, any>>(onTrue: () => X, onFalse: () => Y) => (predicate: boolean) => import("./definition.js").XState<P.Infer<[P.URI<"XState", {}>], import("./definition.js").V, "S", X | Y>, P.Infer<[P.URI<"XState", {}>], import("./definition.js").V, "A", X | Y>>;
declare const branch_: <X extends import("./definition.js").XState<any, any>, Y extends import("./definition.js").XState<any, any>>(predicate: boolean, onTrue: () => X, onFalse: () => Y) => import("./definition.js").XState<P.Infer<[P.URI<"XState", {}>], import("./definition.js").V, "S", X | Y>, P.Infer<[P.URI<"XState", {}>], import("./definition.js").V, "A", X | Y>>;
export { branch as if, branch_ as if_ };
/**
 * Do
 */
export declare const bind: <K2, Q2, W2, X2, I2, S2, R2, E2, BK, BN extends string, BA>(tag: Exclude<BN, keyof BK>, f: (a: BK) => import("./definition.js").XState<S2, BA>) => <K, Q, W, X, I, S, R, E>(fa: import("./definition.js").XState<S2, BK>) => import("./definition.js").XState<S2, BK & { [k in BN]: BA; }>;
declare const let_: <BK, BN extends string, BA>(tag: Exclude<BN, keyof BK>, f: (a: BK) => BA) => <K, Q, W, X, I, S, R, E>(fa: import("./definition.js").XState<S, BK>) => import("./definition.js").XState<S, BK & { [k in BN]: BA; }>;
declare const do_: import("./definition.js").XState<any, {}>;
export { do_ as do, let_ as let };
/**
 * Generator
 */
export declare const gen: <Eff extends P.GenHKT<import("./definition.js").XState<any, any>, any>, AEff>(f: (i: <K, Q, W, X, I, S, R, E, A>(_: import("./definition.js").XState<S, A>) => P.GenHKT<import("./definition.js").XState<S, A>, A>) => Generator<Eff, AEff, any>) => import("./definition.js").XState<P.Infer<[P.URI<"XState", {}>], unknown, "S", Eff["effect"]>, AEff>;
//# sourceMappingURL=dsls.d.ts.map