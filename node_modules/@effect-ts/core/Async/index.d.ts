import "../Operator/index.js";
/**
 * Async is a lightweight Effect data type that support as parameters:
 * - R: environment
 * - E: error
 * - A: output
 *
 * And additionally supports interruption
 */
import * as A from "@effect-ts/system/Async";
import * as E from "@effect-ts/system/Either";
import { NoSuchElementException } from "@effect-ts/system/GlobalExceptions";
import type { Has, Tag } from "@effect-ts/system/Has";
import type * as O from "@effect-ts/system/Option";
import type { URI } from "../Prelude/index.js";
import * as P from "../Prelude/index.js";
import type { Sync } from "../Sync/index.js";
export { branch as if, branch_ as if_ };
export declare type V = P.V<"R", "-"> & P.V<"E", "+">;
export declare const Covariant: P.Covariant<[URI<"Async", {}>], V>;
export declare const Any: P.Any<[URI<"Async", {}>], V>;
export declare const AssociativeBoth: P.AssociativeBoth<[URI<"Async", {}>], V>;
export declare const AssociativeFlatten: P.AssociativeFlatten<[URI<"Async", {}>], V>;
export declare const IdentityBoth: P.IdentityBoth<[URI<"Async", {}>], V>;
export declare const IdentityFlatten: P.IdentityFlatten<[URI<"Async", {}>], V>;
export declare const Applicative: P.Applicative<[URI<"Async", {}>], V>;
export declare const Monad: P.Monad<[URI<"Async", {}>], V>;
export declare const Fail: P.FX.Fail<[URI<"Async", {}>], V>;
export declare const Run: P.FX.Run<[URI<"Async", {}>], V>;
export declare const either: <A, R, E>(fa: A.Async<R, E, A>) => A.Async<R, never, E.Either<E, A>>;
export declare const getValidation: <Z>(A: import("../Associative/definition.js").Associative<Z>) => P.Applicative<[URI<"Async", {}>], P.V<"R", "-"> & P.Fix<"E", Z>>;
export declare const Provide: P.FX.Provide<[URI<"Async", {}>], V>;
export declare const Access: P.FX.Access<[URI<"Async", {}>], V>;
export declare const gen: <Eff extends P.GenHKT<A.Async<any, any, any>, any>, AEff>(f: (i: {
    <A>(_: Tag<A>): P.GenHKT<A.Async<Has<A>, never, A>, A>;
    <E, A_1>(_: O.Option<A_1>, onNone: () => E): P.GenHKT<A.Async<unknown, E, A_1>, A_1>;
    <A_2>(_: O.Option<A_2>): P.GenHKT<A.Async<unknown, NoSuchElementException, A_2>, A_2>;
    <E_1, A_3>(_: E.Either<E_1, A_3>): P.GenHKT<A.Async<unknown, E_1, A_3>, A_3>;
    <R, E_2, A_4>(_: A.Async<R, E_2, A_4>): P.GenHKT<A.Async<R, E_2, A_4>, A_4>;
}) => Generator<Eff, AEff, any>) => A.Async<P.Infer<[URI<"Async", {}>], unknown, "R", Eff["effect"]>, P.Infer<[URI<"Async", {}>], unknown, "E", Eff["effect"]>, AEff>;
export declare function flatten<R, E, A, R2, E2>(ffa: A.Async<R2, E2, A.Async<R, E, A>>): A.Async<R2 & R, E | E2, A>;
export declare function fromEither<E, A>(_: E.Either<E, A>): A.Async<unknown, E, never> | A.Async<unknown, never, A>;
export declare function fromSync<R, E, A>(_: Sync<R, E, A>): A.Async<R, E, A>;
export declare const match: <N extends string>(tag: N) => P.MatchFn<[URI<"Async", {}>], V, N>, matchIn: <N extends string>(tag: N) => P.MatchInFn<[URI<"Async", {}>], V, N>, matchMorph: <N extends string, X extends { [tag in N]: string; }>(MorphADT: {
    tag: N;
    _A: X;
}) => P.MatchMorphFn<[URI<"Async", {}>], V, N, X>, matchTag: P.MatchFn<[URI<"Async", {}>], V, "_tag">, matchTagIn: P.MatchInFn<[URI<"Async", {}>], V, "_tag">;
/**
 * Conditionals
 */
declare const branch: <X extends A.Async<any, any, any>, Y extends A.Async<any, any, any>>(onTrue: () => X, onFalse: () => Y) => (predicate: boolean) => A.Async<P.Infer<[URI<"Async", {}>], V, "R", X | Y>, P.Infer<[URI<"Async", {}>], V, "E", X | Y>, P.Infer<[URI<"Async", {}>], V, "A", X | Y>>;
declare const branch_: <X extends A.Async<any, any, any>, Y extends A.Async<any, any, any>>(predicate: boolean, onTrue: () => X, onFalse: () => Y) => A.Async<P.Infer<[URI<"Async", {}>], V, "R", X | Y>, P.Infer<[URI<"Async", {}>], V, "E", X | Y>, P.Infer<[URI<"Async", {}>], V, "A", X | Y>>;
export * from "@effect-ts/system/Async";
//# sourceMappingURL=index.d.ts.map