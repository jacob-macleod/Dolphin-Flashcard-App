import * as P from "../../Prelude/index.js";
export declare const tuple: <T extends import("@effect-ts/system/Sync/core.js").Sync<any, any, unknown>[], K = any, Q = any, W = any, X = any, I = any, S = any, R = unknown, E = never>(...t: T & {
    readonly 0: import("@effect-ts/system/Sync/core.js").Sync<any, any, unknown>;
}) => import("@effect-ts/system/Sync/core.js").Sync<P.Infer<[P.URI<"Sync", {}>], import("./instances.js").V, "R", T[number]>, P.Infer<[P.URI<"Sync", {}>], import("./instances.js").V, "E", T[number]>, { [K_1 in keyof T]: [T[K_1]] extends [import("@effect-ts/system/Sync/core.js").Sync<any, any, infer A>] ? A : never; }>;
export declare const struct: <NER extends Record<string, import("@effect-ts/system/Sync/core.js").Sync<any, any, unknown>>, K = any, Q = any, W = any, X = any, I = any, S = any, R = unknown, E = never>(r: import("@effect-ts/system/Utils/index.js").EnforceNonEmptyRecord<NER> & Record<string, import("@effect-ts/system/Sync/core.js").Sync<any, any, unknown>>) => import("@effect-ts/system/Sync/core.js").Sync<P.Infer<[P.URI<"Sync", {}>], import("./instances.js").V, "R", NER[keyof NER]>, P.Infer<[P.URI<"Sync", {}>], import("./instances.js").V, "E", NER[keyof NER]>, { [K_1 in keyof NER]: P.Infer<[P.URI<"Sync", {}>], import("./instances.js").V, "A", NER[K_1]>; }>;
export declare const getValidationApplicative: <Z>(A: import("../../Associative/definition.js").Associative<Z>) => P.Applicative<[P.URI<"Sync", {}>], P.V<"R", "-"> & P.Fix<"E", Z>>;
/**
 * Matchers
 */
export declare const match: <N extends string>(tag: N) => P.MatchFn<[P.URI<"Sync", {}>], import("./instances.js").V, N>, matchIn: <N extends string>(tag: N) => P.MatchInFn<[P.URI<"Sync", {}>], import("./instances.js").V, N>, matchMorph: <N extends string, X extends { [tag in N]: string; }>(MorphADT: {
    tag: N;
    _A: X;
}) => P.MatchMorphFn<[P.URI<"Sync", {}>], import("./instances.js").V, N, X>, matchTag: P.MatchFn<[P.URI<"Sync", {}>], import("./instances.js").V, "_tag">, matchTagIn: P.MatchInFn<[P.URI<"Sync", {}>], import("./instances.js").V, "_tag">;
/**
 * Conditionals
 */
declare const branch: <X extends import("@effect-ts/system/Sync/core.js").Sync<any, any, any>, Y extends import("@effect-ts/system/Sync/core.js").Sync<any, any, any>>(onTrue: () => X, onFalse: () => Y) => (predicate: boolean) => import("@effect-ts/system/Sync/core.js").Sync<P.Infer<[P.URI<"Sync", {}>], import("./instances.js").V, "R", X | Y>, P.Infer<[P.URI<"Sync", {}>], import("./instances.js").V, "E", X | Y>, P.Infer<[P.URI<"Sync", {}>], import("./instances.js").V, "A", X | Y>>;
declare const branch_: <X extends import("@effect-ts/system/Sync/core.js").Sync<any, any, any>, Y extends import("@effect-ts/system/Sync/core.js").Sync<any, any, any>>(predicate: boolean, onTrue: () => X, onFalse: () => Y) => import("@effect-ts/system/Sync/core.js").Sync<P.Infer<[P.URI<"Sync", {}>], import("./instances.js").V, "R", X | Y>, P.Infer<[P.URI<"Sync", {}>], import("./instances.js").V, "E", X | Y>, P.Infer<[P.URI<"Sync", {}>], import("./instances.js").V, "A", X | Y>>;
export { branch as if, branch_ as if_ };
//# sourceMappingURL=dsl.d.ts.map