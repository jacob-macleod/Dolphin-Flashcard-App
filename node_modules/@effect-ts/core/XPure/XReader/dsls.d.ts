import * as P from "../../Prelude/index.js";
/**
 * Struct based applicative for Reader[-_, +_]
 */
export declare const struct: <NER extends Record<string, import("./definition.js").XReader<R, unknown>>, K = any, Q = any, W = any, X = any, I = any, S = any, R = any, E = any>(r: import("@effect-ts/system/Utils/index.js").EnforceNonEmptyRecord<NER> & Record<string, import("./definition.js").XReader<R, unknown>>) => import("./definition.js").XReader<P.Infer<[P.URI<"XReader", {}>], P.Auto, "R", NER[keyof NER]>, { [K_1 in keyof NER]: P.Infer<[P.URI<"XReader", {}>], P.Auto, "A", NER[K_1]>; }>;
/**
 * Struct based applicative for Reader[-_, +_]
 */
export declare const tuple: <T extends import("./definition.js").XReader<R, unknown>[], K = any, Q = any, W = any, X = any, I = any, S = any, R = any, E = any>(...t: T & {
    readonly 0: import("./definition.js").XReader<R, unknown>;
}) => import("./definition.js").XReader<P.Infer<[P.URI<"XReader", {}>], P.Auto, "R", T[number]>, { [K_1 in keyof T]: [T[K_1]] extends [import("./definition.js").XReader<any, infer A>] ? A : never; }>;
/**
 * Matchers
 */
export declare const match: <N extends string>(tag: N) => P.MatchFn<[P.URI<"XReader", {}>], P.Auto, N>, matchIn: <N extends string>(tag: N) => P.MatchInFn<[P.URI<"XReader", {}>], P.Auto, N>, matchMorph: <N extends string, X extends { [tag in N]: string; }>(MorphADT: {
    tag: N;
    _A: X;
}) => P.MatchMorphFn<[P.URI<"XReader", {}>], P.Auto, N, X>, matchTag: P.MatchFn<[P.URI<"XReader", {}>], P.Auto, "_tag">, matchTagIn: P.MatchInFn<[P.URI<"XReader", {}>], P.Auto, "_tag">;
/**
 * Conditionals
 */
declare const branch: <X extends import("./definition.js").XReader<any, any>, Y extends import("./definition.js").XReader<any, any>>(onTrue: () => X, onFalse: () => Y) => (predicate: boolean) => import("./definition.js").XReader<P.Infer<[P.URI<"XReader", {}>], P.Auto, "R", X | Y>, P.Infer<[P.URI<"XReader", {}>], P.Auto, "A", X | Y>>;
declare const branch_: <X extends import("./definition.js").XReader<any, any>, Y extends import("./definition.js").XReader<any, any>>(predicate: boolean, onTrue: () => X, onFalse: () => Y) => import("./definition.js").XReader<P.Infer<[P.URI<"XReader", {}>], P.Auto, "R", X | Y>, P.Infer<[P.URI<"XReader", {}>], P.Auto, "A", X | Y>>;
export { branch as if, branch_ as if_ };
/**
 * Do
 */
export declare const bind: <K2, Q2, W2, X2, I2, S2, R2, E2, BK, BN extends string, BA>(tag: Exclude<BN, keyof BK>, f: (a: BK) => import("./definition.js").XReader<R2, BA>) => <K, Q, W, X, I, S, R, E>(fa: import("./definition.js").XReader<R2, BK>) => import("./definition.js").XReader<R2, BK & { [k in BN]: BA; }>;
declare const let_: <BK, BN extends string, BA>(tag: Exclude<BN, keyof BK>, f: (a: BK) => BA) => <K, Q, W, X, I, S, R, E>(fa: import("./definition.js").XReader<R, BK>) => import("./definition.js").XReader<R, BK & { [k in BN]: BA; }>;
declare const do_: import("./definition.js").XReader<any, {}>;
export { do_ as do, let_ as let };
/**
 * Generator
 */
export declare const gen: <Eff extends P.GenHKT<import("./definition.js").XReader<any, any>, any>, AEff>(f: (i: <K, Q, W, X, I, S, R, E, A>(_: import("./definition.js").XReader<R, A>) => P.GenHKT<import("./definition.js").XReader<R, A>, A>) => Generator<Eff, AEff, any>) => import("./definition.js").XReader<P.Infer<[P.URI<"XReader", {}>], unknown, "R", Eff["effect"]>, AEff>;
//# sourceMappingURL=dsls.d.ts.map