import * as A from "../Collections/Immutable/Array/index.js";
import * as DSL from "../Prelude/DSL/index.js";
/**
 * Struct based applicative for IO[+_]
 */
export declare const struct: <NER extends Record<string, import("@effect-ts/system/IO/index.js").IO<unknown>>, K = any, Q = any, W = any, X = any, I = any, S = any, R = any, E = any>(r: import("@effect-ts/system/Utils/index.js").EnforceNonEmptyRecord<NER> & Record<string, import("@effect-ts/system/IO/index.js").IO<unknown>>) => import("@effect-ts/system/IO/index.js").IO<{ [K_1 in keyof NER]: import("../Prelude/index.js").Infer<[import("../Prelude/index.js").URI<"IO", {}>], import("../Prelude/index.js").Auto, "A", NER[K_1]>; }>;
/**
 * Tuple based applicative for IO[+_]
 */
export declare const tuple: <T extends import("@effect-ts/system/IO/index.js").IO<unknown>[], K = any, Q = any, W = any, X = any, I = any, S = any, R = any, E = any>(...t: T & {
    readonly 0: import("@effect-ts/system/IO/index.js").IO<unknown>;
}) => import("@effect-ts/system/IO/index.js").IO<{ [K_1 in keyof T]: [T[K_1]] extends [import("@effect-ts/system/IO/index.js").IO<infer A>] ? A : never; }>;
/**
 * Initialize Do
 */
export declare const do_: import("@effect-ts/system/IO/index.js").IO<{}>;
/**
 * Bind variable in scope
 */
export declare const bind: <K2, Q2, W2, X2, I2, S2, R2, E2, BK, BN extends string, BA>(tag: Exclude<BN, keyof BK>, f: (a: BK) => import("@effect-ts/system/IO/index.js").IO<BA>) => <K, Q, W, X, I, S, R, E>(fa: import("@effect-ts/system/IO/index.js").IO<BK>) => import("@effect-ts/system/IO/index.js").IO<BK & { [k in BN]: BA; }>;
/**
 * Bind variable in scope
 */
declare const let_: <BK, BN extends string, BA>(tag: Exclude<BN, keyof BK>, f: (a: BK) => BA) => <K, Q, W, X, I, S, R, E>(fa: import("@effect-ts/system/IO/index.js").IO<BK>) => import("@effect-ts/system/IO/index.js").IO<BK & { [k in BN]: BA; }>;
export { let_ as let, do_ as do };
/**
 * Matchers
 */
export declare const match: <N extends string>(tag: N) => DSL.MatchFn<[import("../Prelude/index.js").URI<"IO", {}>], import("../Prelude/index.js").Auto, N>, matchIn: <N extends string>(tag: N) => DSL.MatchInFn<[import("../Prelude/index.js").URI<"IO", {}>], import("../Prelude/index.js").Auto, N>, matchMorph: <N extends string, X extends { [tag in N]: string; }>(MorphADT: {
    tag: N;
    _A: X;
}) => DSL.MatchMorphFn<[import("../Prelude/index.js").URI<"IO", {}>], import("../Prelude/index.js").Auto, N, X>, matchTag: DSL.MatchFn<[import("../Prelude/index.js").URI<"IO", {}>], import("../Prelude/index.js").Auto, "_tag">, matchTagIn: DSL.MatchInFn<[import("../Prelude/index.js").URI<"IO", {}>], import("../Prelude/index.js").Auto, "_tag">;
/**
 * Conditionals
 */
declare const branch: <X extends import("@effect-ts/system/IO/index.js").IO<any>, Y extends import("@effect-ts/system/IO/index.js").IO<any>>(onTrue: () => X, onFalse: () => Y) => (predicate: boolean) => import("@effect-ts/system/IO/index.js").IO<import("../Prelude/index.js").Infer<[import("../Prelude/index.js").URI<"IO", {}>], import("../Prelude/index.js").Auto, "A", X | Y>>;
declare const branch_: <X extends import("@effect-ts/system/IO/index.js").IO<any>, Y extends import("@effect-ts/system/IO/index.js").IO<any>>(predicate: boolean, onTrue: () => X, onFalse: () => Y) => import("@effect-ts/system/IO/index.js").IO<import("../Prelude/index.js").Infer<[import("../Prelude/index.js").URI<"IO", {}>], import("../Prelude/index.js").Auto, "A", X | Y>>;
export { branch as if, branch_ as if_ };
/**
 * Foreach
 */
export declare const forEachArray: <GK, GQ, GW, GX, GI, GS, GR, GE, A, B>(f: (a: A) => import("@effect-ts/system/IO/index.js").IO<B>) => <FK, FQ, FW, FX, FI, FS, FR, FE>(fa: A.Array<A>) => import("@effect-ts/system/IO/index.js").IO<A.Array<B>>;
export declare const forEachWithIndexArray: <GK, GQ, GW, GX, GI, GS, GR, GE, A, B, FK>(f: (k: number, a: A) => import("@effect-ts/system/IO/index.js").IO<B>) => <FQ, FW, FX, FI, FS, FR, FE>(fa: A.Array<A>) => import("@effect-ts/system/IO/index.js").IO<A.Array<B>>;
//# sourceMappingURL=dsls.d.ts.map