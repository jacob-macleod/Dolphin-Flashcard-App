import "../Operator/index.js";
import * as X from "@effect-ts/system/XPure";
import type { URI } from "../Prelude/index.js";
import * as P from "../Prelude/index.js";
export declare type V = P.V<"S", "_"> & P.V<"R", "-"> & P.V<"E", "+"> & P.V<"X", "+">;
export declare const Any: P.Any<[URI<"XPure", {}>], V>;
export declare const Covariant: P.Covariant<[URI<"XPure", {}>], V>;
export declare const AssociativeBoth: P.AssociativeBoth<[URI<"XPure", {}>], V>;
export declare const AssociativeEither: P.AssociativeEither<[URI<"XPure", {}>], V>;
export declare const AssociativeFlatten: P.AssociativeFlatten<[URI<"XPure", {}>], V>;
export declare const Applicative: P.Applicative<[URI<"XPure", {}>], V>;
export declare const Access: P.FX.Access<[URI<"XPure", {}>], V>;
export declare const Fail: P.FX.Fail<[URI<"XPure", {}>], V>;
export declare const Provide: P.FX.Provide<[URI<"XPure", {}>], V>;
export declare const Monad: P.Monad<[URI<"XPure", {}>], V>;
export declare const StateCategory: P.Category<[URI<"XPureStateCategory", {}>], V>;
export declare const Category: P.Category<[URI<"XPureReaderCategory", {}>], V>;
export declare const struct: <NER extends Record<string, X.XPure<any, S, S, any, any, unknown>>, K = any, Q = any, W = any, X = never, I = any, S = any, R = unknown, E = never>(r: import("@effect-ts/system/Utils/index.js").EnforceNonEmptyRecord<NER> & Record<string, X.XPure<any, S, S, any, any, unknown>>) => X.XPure<P.Infer<[URI<"XPure", {}>], V, "X", NER[keyof NER]>, P.Infer<[URI<"XPure", {}>], V, "S", NER[keyof NER]>, P.Infer<[URI<"XPure", {}>], V, "S", NER[keyof NER]>, P.Infer<[URI<"XPure", {}>], V, "R", NER[keyof NER]>, P.Infer<[URI<"XPure", {}>], V, "E", NER[keyof NER]>, { [K_1 in keyof NER]: P.Infer<[URI<"XPure", {}>], V, "A", NER[K_1]>; }>;
export declare const tuple: <T extends X.XPure<any, S, S, any, any, unknown>[], K = any, Q = any, W = any, X = never, I = any, S = any, R = unknown, E = never>(...t: T & {
    readonly 0: X.XPure<any, S, S, any, any, unknown>;
}) => X.XPure<P.Infer<[URI<"XPure", {}>], V, "X", T[number]>, P.Infer<[URI<"XPure", {}>], V, "S", T[number]>, P.Infer<[URI<"XPure", {}>], V, "S", T[number]>, P.Infer<[URI<"XPure", {}>], V, "R", T[number]>, P.Infer<[URI<"XPure", {}>], V, "E", T[number]>, { [K_1 in keyof T]: [T[K_1]] extends [X.XPure<any, any, any, any, any, infer A>] ? A : never; }>;
/**
 * Matchers
 */
export declare const match: <N extends string>(tag: N) => P.MatchFn<[URI<"XPure", {}>], V, N>, matchIn: <N extends string>(tag: N) => P.MatchInFn<[URI<"XPure", {}>], V, N>, matchMorph: <N extends string, X extends { [tag in N]: string; }>(MorphADT: {
    tag: N;
    _A: X;
}) => P.MatchMorphFn<[URI<"XPure", {}>], V, N, X>, matchTag: P.MatchFn<[URI<"XPure", {}>], V, "_tag">, matchTagIn: P.MatchInFn<[URI<"XPure", {}>], V, "_tag">;
export * from "@effect-ts/system/XPure";
//# sourceMappingURL=index.d.ts.map