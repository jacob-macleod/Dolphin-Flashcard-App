import * as P from "../../Prelude/index.js";
/**
 * Struct based applicative for IO[+_]
 */
export declare const struct: <NER extends Record<string, import("./definition.js").XIO<unknown>>, K = any, Q = any, W = any, X = any, I = any, S = any, R = any, E = any>(r: import("@effect-ts/system/Utils/index.js").EnforceNonEmptyRecord<NER> & Record<string, import("./definition.js").XIO<unknown>>) => import("./definition.js").XIO<{ [K_1 in keyof NER]: P.Infer<[P.URI<"XIO", {}>], P.Auto, "A", NER[K_1]>; }>;
/**
 * Tuple based applicative for IO[+_]
 */
export declare const tuple: <T extends import("./definition.js").XIO<unknown>[], K = any, Q = any, W = any, X = any, I = any, S = any, R = any, E = any>(...t: T & {
    readonly 0: import("./definition.js").XIO<unknown>;
}) => import("./definition.js").XIO<{ [K_1 in keyof T]: [T[K_1]] extends [import("./definition.js").XIO<infer A>] ? A : never; }>;
/**
 * Matchers
 */
export declare const match: <N extends string>(tag: N) => P.MatchFn<[P.URI<"XIO", {}>], P.Auto, N>, matchIn: <N extends string>(tag: N) => P.MatchInFn<[P.URI<"XIO", {}>], P.Auto, N>, matchMorph: <N extends string, X extends { [tag in N]: string; }>(MorphADT: {
    tag: N;
    _A: X;
}) => P.MatchMorphFn<[P.URI<"XIO", {}>], P.Auto, N, X>, matchTag: P.MatchFn<[P.URI<"XIO", {}>], P.Auto, "_tag">, matchTagIn: P.MatchInFn<[P.URI<"XIO", {}>], P.Auto, "_tag">;
/**
 * Conditionals
 */
declare const branch: <X extends import("./definition.js").XIO<any>, Y extends import("./definition.js").XIO<any>>(onTrue: () => X, onFalse: () => Y) => (predicate: boolean) => import("./definition.js").XIO<P.Infer<[P.URI<"XIO", {}>], P.Auto, "A", X | Y>>;
declare const branch_: <X extends import("./definition.js").XIO<any>, Y extends import("./definition.js").XIO<any>>(predicate: boolean, onTrue: () => X, onFalse: () => Y) => import("./definition.js").XIO<P.Infer<[P.URI<"XIO", {}>], P.Auto, "A", X | Y>>;
export { branch as if, branch_ as if_ };
/**
 * Do
 */
export declare const bind: <K2, Q2, W2, X2, I2, S2, R2, E2, BK, BN extends string, BA>(tag: Exclude<BN, keyof BK>, f: (a: BK) => import("./definition.js").XIO<BA>) => <K, Q, W, X, I, S, R, E>(fa: import("./definition.js").XIO<BK>) => import("./definition.js").XIO<BK & { [k in BN]: BA; }>;
declare const let_: <BK, BN extends string, BA>(tag: Exclude<BN, keyof BK>, f: (a: BK) => BA) => <K, Q, W, X, I, S, R, E>(fa: import("./definition.js").XIO<BK>) => import("./definition.js").XIO<BK & { [k in BN]: BA; }>;
declare const do_: import("./definition.js").XIO<{}>;
export { do_ as do, let_ as let };
/**
 * Generator
 */
export declare const gen: <Eff extends P.GenHKT<import("./definition.js").XIO<any>, any>, AEff>(f: (i: <K, Q, W, X, I, S, R, E, A>(_: import("./definition.js").XIO<A>) => P.GenHKT<import("./definition.js").XIO<A>, A>) => Generator<Eff, AEff, any>) => import("./definition.js").XIO<AEff>;
//# sourceMappingURL=dsls.d.ts.map