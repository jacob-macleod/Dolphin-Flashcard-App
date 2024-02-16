import "../Operator/index.js";
import * as T from "@effect-ts/system/Effect";
import * as I from "../Identity/index.js";
import * as DSL from "../Prelude/DSL/index.js";
import type { URI } from "../Prelude/index.js";
import * as P from "../Prelude/index.js";
export * from "@effect-ts/system/Effect";
export { EffectURI } from "../Modules/index.js";
export declare type V = P.V<"R", "-"> & P.V<"E", "+">;
export declare const Any: P.Any<[URI<"Effect", {}>], V>;
export declare const AssociativeEither: P.AssociativeEither<[URI<"Effect", {}>], V>;
export declare const AssociativeFlatten: P.AssociativeFlatten<[URI<"Effect", {}>], V>;
export declare const AssociativeBoth: P.AssociativeBoth<[URI<"Effect", {}>], V>;
export declare const Covariant: P.Covariant<[URI<"Effect", {}>], V>;
export declare const IdentityFlatten: P.IdentityFlatten<[URI<"Effect", {}>], V>;
export declare const IdentityBoth: P.IdentityBoth<[URI<"Effect", {}>], V>;
export declare const Monad: P.Monad<[URI<"Effect", {}>], V>;
export declare const Applicative: P.Applicative<[URI<"Effect", {}>], V>;
export declare const Fail: P.FX.Fail<[URI<"Effect", {}>], V>;
export declare const Run: P.FX.Run<[URI<"Effect", {}>], V>;
export declare const Access: P.FX.Access<[URI<"Effect", {}>], V>;
export declare const Provide: P.FX.Provide<[URI<"Effect", {}>], V>;
export declare const getValidationApplicative: <Z>(A: import("../Associative/definition.js").Associative<Z>) => P.Applicative<[URI<"Effect", {}>], P.V<"R", "-"> & P.Fix<"E", Z>>;
export declare const Category: P.Category<[URI<"EffectCategory", {}>], V>;
/**
 * Matchers
 */
export declare const match: <N extends string>(tag: N) => DSL.MatchFn<[URI<"Effect", {}>], V, N>, matchIn: <N extends string>(tag: N) => DSL.MatchInFn<[URI<"Effect", {}>], V, N>, matchMorph: <N extends string, X extends { [tag in N]: string; }>(MorphADT: {
    tag: N;
    _A: X;
}) => DSL.MatchMorphFn<[URI<"Effect", {}>], V, N, X>, matchTag: DSL.MatchFn<[URI<"Effect", {}>], V, "_tag">, matchTagIn: DSL.MatchInFn<[URI<"Effect", {}>], V, "_tag">;
/**
 * Derive sequential identity
 */
export declare function getIdentity<A>(Id: I.Identity<A>): <R = unknown, E = never>() => I.Identity<T.Effect<R, E, A>>;
/**
 * Derive parallel identity
 */
export declare function getIdentityPar<A>(Id: I.Identity<A>): <R = unknown, E = never>() => I.Identity<T.Effect<R, E, A>>;
//# sourceMappingURL=instances.d.ts.map