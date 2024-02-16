import type { Equal } from "../Equal/index.js";
import type { Identity } from "../Identity/index.js";
import * as IO from "../IO/index.js";
import * as DSL from "../Prelude/DSL/index.js";
import type { URI } from "../Prelude/index.js";
import * as P from "../Prelude/index.js";
import type { Show } from "../Show/index.js";
export declare type Forest<A> = ReadonlyArray<Tree<A>>;
export interface Tree<A> {
    readonly value: A;
    readonly forest: Forest<A>;
}
export declare function make<A>(value: A, forest?: Forest<A>): Tree<A>;
export declare function getShow<A>(S: Show<A>): Show<Tree<A>>;
export declare function getEqual<A>(E: Equal<A>): Equal<Tree<A>>;
/**
 * Neat 2-dimensional drawing of a forest
 */
export declare function drawForest(forest: Forest<string>): string;
/**
 * Neat 2-dimensional drawing of a tree
 */
export declare function drawTree(tree: Tree<string>): string;
/**
 * Build a tree from a seed value
 */
export declare function unfoldTree<A, B>(b: B, f: (b: B) => [A, Array<B>]): Tree<A>;
/**
 * Build a tree from a seed value
 */
export declare function unfoldTreeSafe<A, B>(b: B, f: (b: B) => [A, Array<B>]): IO.IO<Tree<A>>;
/**
 * Build a tree from a seed value
 */
export declare function unfoldForest<A, B>(bs: Array<B>, f: (b: B) => [A, Array<B>]): Forest<A>;
/**
 * Build a tree from a seed value
 */
export declare function unfoldForestSafe<A, B>(bs: Array<B>, f: (b: B) => [A, Array<B>]): IO.IO<Forest<A>>;
/**
 * Monadic tree builder, in depth-first order
 */
export declare function unfoldTreeM<M extends P.URIS, C>(M: P.Monad<M, C> & P.Applicative<M, C>): <K, Q, W, X, I, S, R, E, A, B>(b: B, f: (b: B) => P.Kind<M, C, K, Q, W, X, I, S, R, E, [A, Array<B>]>) => P.Kind<M, C, K, Q, W, X, I, S, R, E, Tree<A>>;
/**
 * Monadic forest builder, in depth-first order
 */
export declare function unfoldForestM<M extends P.URIS, C>(M: P.Monad<M, C> & P.Applicative<M, C>): <K, Q, W, X, I, S, R, E, A, B>(bs: Array<B>, f: (b: B) => P.Kind<M, C, K, Q, W, X, I, S, R, E, [A, Array<B>]>) => P.Kind<M, C, K, Q, W, X, I, S, R, E, Forest<A>>;
export declare function elem_<A>(E: Equal<A>): (fa: Tree<A>, a: A) => boolean;
export declare function elem<A>(E: Equal<A>): (a: A) => (fa: Tree<A>) => boolean;
/**
 * Fold a tree into a "summary" value in depth-first order.
 *
 * For each node in the tree, apply `f` to the `value` and the result of applying `f` to each `forest`.
 *
 * This is also known as the catamorphism on trees.
 */
export declare function fold<A, B>(f: (a: A, bs: readonly B[]) => B): (tree: Tree<A>) => B;
export declare function map_<A, B>(fa: Tree<A>, f: (a: A) => B): Tree<B>;
export declare function of<A>(a: A): Tree<A>;
export declare function ap_<A, B>(fab: Tree<(a: A) => B>, fa: Tree<A>): Tree<B>;
export declare function chain_<A, B>(fa: Tree<A>, f: (a: A) => Tree<B>): Tree<B>;
export declare function reduce_<A, B>(fa: Tree<A>, b: B, f: (b: B, a: A) => B): B;
export declare function foldMap_<M>(M: Identity<M>): <A>(fa: Tree<A>, f: (a: A) => M) => M;
export declare function reduceRight_<A, B>(fa: Tree<A>, b: B, f: (a: A, b: B) => B): B;
export declare const forEachF: P.ForeachFn<[URI<"Tree", {}>], P.Auto>;
export declare const ForEach: P.ForEach<[URI<"Tree", {}>], P.Auto>;
export declare const sequence: <F extends P.URIS, FC>(App: P.Covariant<F, FC> & P.IdentityBoth<F, FC>) => <K, Q, W, X, I, S, R, E, FK, FQ, FW, FX, FI, FS, FR, FE, A>(_: Tree<F extends [any, ...infer Next] ? P.URItoKind<F[0]["_C"], FC, P.OrFix<"K", F[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", F[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", F[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", F[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", F[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", F[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", F[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", F[0]["_C"], P.OrFix<"E", FC, FE>>, Next extends [any, ...infer Next] ? P.URItoKind<Next[0]["_C"], FC, P.OrFix<"K", Next[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", Next[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", Next[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", Next[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", Next[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", Next[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", Next[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", Next[0]["_C"], P.OrFix<"E", FC, FE>>, Next extends [any, ...infer Next] ? P.URItoKind<Next[0]["_C"], FC, P.OrFix<"K", Next[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", Next[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", Next[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", Next[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", Next[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", Next[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", Next[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", Next[0]["_C"], P.OrFix<"E", FC, FE>>, Next extends [any, ...infer Next] ? P.URItoKind<Next[0]["_C"], FC, P.OrFix<"K", Next[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", Next[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", Next[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", Next[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", Next[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", Next[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", Next[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", Next[0]["_C"], P.OrFix<"E", FC, FE>>, Next extends [any, ...infer Next] ? P.URItoKind<Next[0]["_C"], FC, P.OrFix<"K", Next[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", Next[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", Next[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", Next[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", Next[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", Next[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", Next[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", Next[0]["_C"], P.OrFix<"E", FC, FE>>, Next extends [any, ...infer Next] ? P.URItoKind<Next[0]["_C"], FC, P.OrFix<"K", Next[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", Next[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", Next[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", Next[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", Next[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", Next[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", Next[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", Next[0]["_C"], P.OrFix<"E", FC, FE>>, Next extends [any, ...infer Next] ? P.URItoKind<Next[0]["_C"], FC, P.OrFix<"K", Next[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", Next[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", Next[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", Next[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", Next[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", Next[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", Next[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", Next[0]["_C"], P.OrFix<"E", FC, FE>>, Next extends [any, ...infer Next] ? P.URItoKind<Next[0]["_C"], FC, P.OrFix<"K", Next[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", Next[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", Next[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", Next[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", Next[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", Next[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", Next[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", Next[0]["_C"], P.OrFix<"E", FC, FE>>, Next extends [any, ...infer Next] ? P.URItoKind<Next[0]["_C"], FC, P.OrFix<"K", Next[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", Next[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", Next[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", Next[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", Next[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", Next[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", Next[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", Next[0]["_C"], P.OrFix<"E", FC, FE>>, Next extends [any, ...infer Next] ? P.URItoKind<Next[0]["_C"], FC, P.OrFix<"K", Next[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", Next[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", Next[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", Next[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", Next[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", Next[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", Next[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", Next[0]["_C"], P.OrFix<"E", FC, FE>>, Next extends [any, ...infer Next] ? P.URItoKind<Next[0]["_C"], FC, P.OrFix<"K", Next[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", Next[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", Next[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", Next[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", Next[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", Next[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", Next[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", Next[0]["_C"], P.OrFix<"E", FC, FE>>, any>[Next[0]["_F"]] : A>[Next[0]["_F"]] : A>[Next[0]["_F"]] : A>[Next[0]["_F"]] : A>[Next[0]["_F"]] : A>[Next[0]["_F"]] : A>[Next[0]["_F"]] : A>[Next[0]["_F"]] : A>[Next[0]["_F"]] : A>[Next[0]["_F"]] : A>[F[0]["_F"]] : A>) => F extends [any, ...infer Next] ? P.URItoKind<F[0]["_C"], FC, P.OrFix<"K", F[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", F[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", F[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", F[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", F[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", F[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", F[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", F[0]["_C"], P.OrFix<"E", FC, FE>>, Next extends [any, ...infer Next] ? P.URItoKind<Next[0]["_C"], FC, P.OrFix<"K", Next[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", Next[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", Next[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", Next[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", Next[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", Next[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", Next[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", Next[0]["_C"], P.OrFix<"E", FC, FE>>, Next extends [any, ...infer Next] ? P.URItoKind<Next[0]["_C"], FC, P.OrFix<"K", Next[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", Next[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", Next[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", Next[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", Next[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", Next[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", Next[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", Next[0]["_C"], P.OrFix<"E", FC, FE>>, Next extends [any, ...infer Next] ? P.URItoKind<Next[0]["_C"], FC, P.OrFix<"K", Next[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", Next[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", Next[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", Next[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", Next[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", Next[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", Next[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", Next[0]["_C"], P.OrFix<"E", FC, FE>>, Next extends [any, ...infer Next] ? P.URItoKind<Next[0]["_C"], FC, P.OrFix<"K", Next[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", Next[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", Next[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", Next[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", Next[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", Next[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", Next[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", Next[0]["_C"], P.OrFix<"E", FC, FE>>, Next extends [any, ...infer Next] ? P.URItoKind<Next[0]["_C"], FC, P.OrFix<"K", Next[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", Next[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", Next[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", Next[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", Next[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", Next[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", Next[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", Next[0]["_C"], P.OrFix<"E", FC, FE>>, Next extends [any, ...infer Next] ? P.URItoKind<Next[0]["_C"], FC, P.OrFix<"K", Next[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", Next[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", Next[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", Next[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", Next[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", Next[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", Next[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", Next[0]["_C"], P.OrFix<"E", FC, FE>>, Next extends [any, ...infer Next] ? P.URItoKind<Next[0]["_C"], FC, P.OrFix<"K", Next[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", Next[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", Next[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", Next[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", Next[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", Next[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", Next[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", Next[0]["_C"], P.OrFix<"E", FC, FE>>, Next extends [any, ...infer Next] ? P.URItoKind<Next[0]["_C"], FC, P.OrFix<"K", Next[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", Next[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", Next[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", Next[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", Next[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", Next[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", Next[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", Next[0]["_C"], P.OrFix<"E", FC, FE>>, Next extends [any, ...infer Next] ? P.URItoKind<Next[0]["_C"], FC, P.OrFix<"K", Next[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", Next[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", Next[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", Next[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", Next[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", Next[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", Next[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", Next[0]["_C"], P.OrFix<"E", FC, FE>>, Next extends [any, ...infer Next] ? P.URItoKind<Next[0]["_C"], FC, P.OrFix<"K", Next[0]["_C"], P.OrFix<"K", FC, FK>>, P.OrFix<"Q", Next[0]["_C"], P.OrFix<"Q", FC, FQ>>, P.OrFix<"W", Next[0]["_C"], P.OrFix<"W", FC, FW>>, P.OrFix<"X", Next[0]["_C"], P.OrFix<"X", FC, FX>>, P.OrFix<"I", Next[0]["_C"], P.OrFix<"I", FC, FI>>, P.OrFix<"S", Next[0]["_C"], P.OrFix<"S", FC, FS>>, P.OrFix<"R", Next[0]["_C"], P.OrFix<"R", FC, FR>>, P.OrFix<"E", Next[0]["_C"], P.OrFix<"E", FC, FE>>, any>[Next[0]["_F"]] : Tree<A>>[Next[0]["_F"]] : Tree<A>>[Next[0]["_F"]] : Tree<A>>[Next[0]["_F"]] : Tree<A>>[Next[0]["_F"]] : Tree<A>>[Next[0]["_F"]] : Tree<A>>[Next[0]["_F"]] : Tree<A>>[Next[0]["_F"]] : Tree<A>>[Next[0]["_F"]] : Tree<A>>[Next[0]["_F"]] : Tree<A>>[F[0]["_F"]] : Tree<A>;
export declare function extract<A>(wa: Tree<A>): A;
export declare function extend_<A, B>(wa: Tree<A>, f: (wa: Tree<A>) => B): Tree<B>;
export declare function extend<A, B>(f: (fa: Tree<A>) => B): (ma: Tree<A>) => Tree<B>;
export declare function ap<A>(fa: Tree<A>): <B>(fab: Tree<(a: A) => B>) => Tree<B>;
export declare function apFirst<B>(fb: Tree<B>): <A>(fa: Tree<A>) => Tree<A>;
export declare function apFirst_<A, B>(fa: Tree<A>, fb: Tree<B>): Tree<A>;
export declare function apSecond<B>(fb: Tree<B>): <A>(fa: Tree<A>) => Tree<B>;
export declare function apSecond_<A, B>(fa: Tree<A>, fb: Tree<B>): Tree<B>;
export declare function chain<A, B>(f: (a: A) => Tree<B>): (ma: Tree<A>) => Tree<B>;
export declare function tap<A, B>(f: (a: A) => Tree<B>): (ma: Tree<A>) => Tree<A>;
export declare function tap_<A, B>(ma: Tree<A>, f: (a: A) => Tree<B>): Tree<A>;
export declare function duplicate<A>(ma: Tree<A>): Tree<Tree<A>>;
export declare function flatten<A>(mma: Tree<Tree<A>>): Tree<A>;
export declare function foldMap<M>(M: Identity<M>): <A>(f: (a: A) => M) => (fa: Tree<A>) => M;
export declare function map<A, B>(f: (a: A) => B): (fa: Tree<A>) => Tree<B>;
export declare function reduce<A, B>(b: B, f: (b: B, a: A) => B): (fa: Tree<A>) => B;
export declare function reduceRight<A, B>(b: B, f: (a: A, b: B) => B): (fa: Tree<A>) => B;
export declare const Foldable: P.Foldable<[URI<"Tree", {}>], P.Auto>;
export declare const Monad: P.Monad<[URI<"Tree", {}>], P.Auto>;
export declare const Applicative: P.Applicative<[URI<"Tree", {}>], P.Auto>;
export declare const gen: <Eff extends DSL.GenHKT<Tree<any>, any>, AEff>(f: (i: <K, Q, W, X, I, S, R, E, A>(_: Tree<A>) => DSL.GenHKT<Tree<A>, A>) => Generator<Eff, AEff, any>) => Tree<AEff>;
export declare const bind: <K2, Q2, W2, X2, I2, S2, R2, E2, BK, BN extends string, BA>(tag: Exclude<BN, keyof BK>, f: (a: BK) => Tree<BA>) => <K, Q, W, X, I, S, R, E>(fa: Tree<BK>) => Tree<BK & { [k in BN]: BA; }>;
declare const do_: Tree<{}>;
export { do_ as do };
export { branch as if, branch_ as if_ };
export declare const struct: <NER extends Record<string, Tree<unknown>>, K = any, Q = any, W = any, X = any, I = any, S = any, R = any, E = any>(r: import("@effect-ts/system/Utils/index.js").EnforceNonEmptyRecord<NER> & Record<string, Tree<unknown>>) => Tree<{ [K_1 in keyof NER]: P.Infer<[URI<"Tree", {}>], P.Auto, "A", NER[K_1]>; }>;
export declare const tuple: <T extends Tree<unknown>[], K = any, Q = any, W = any, X = any, I = any, S = any, R = any, E = any>(...t: T & {
    readonly 0: Tree<unknown>;
}) => Tree<{ [K_1 in keyof T]: [T[K_1]] extends [Tree<infer A>] ? A : never; }>;
/**
 * Matchers
 */
export declare const match: <N extends string>(tag: N) => DSL.MatchFn<[URI<"Tree", {}>], P.Auto, N>, matchIn: <N extends string>(tag: N) => DSL.MatchInFn<[URI<"Tree", {}>], P.Auto, N>, matchMorph: <N extends string, X extends { [tag in N]: string; }>(MorphADT: {
    tag: N;
    _A: X;
}) => DSL.MatchMorphFn<[URI<"Tree", {}>], P.Auto, N, X>, matchTag: DSL.MatchFn<[URI<"Tree", {}>], P.Auto, "_tag">, matchTagIn: DSL.MatchInFn<[URI<"Tree", {}>], P.Auto, "_tag">;
/**
 * Conditionals
 */
declare const branch: <X extends Tree<any>, Y extends Tree<any>>(onTrue: () => X, onFalse: () => Y) => (predicate: boolean) => Tree<P.Infer<[URI<"Tree", {}>], P.Auto, "A", X | Y>>;
declare const branch_: <X extends Tree<any>, Y extends Tree<any>>(predicate: boolean, onTrue: () => X, onFalse: () => Y) => Tree<P.Infer<[URI<"Tree", {}>], P.Auto, "A", X | Y>>;
//# sourceMappingURL=core.d.ts.map