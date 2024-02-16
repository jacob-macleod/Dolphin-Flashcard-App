import "../Operator/index.js";
/**
 * The `Const` type constructor, which wraps its first type argument and ignores its second.
 * That is, `Const<E, A>` is isomorphic to `E` for any `A`.
 *
 * `Const` has some useful instances. For example, the `Applicative` instance allows us to collect results using a `Monoid`
 * while ignoring return values.
 */
import type * as As from "../Associative/index.js";
import type { Bounded } from "../Bounded/index.js";
import type { Equal } from "../Equal/index.js";
import type * as Id from "../Identity/index.js";
import type { Ord } from "../Ord/index.js";
import type { URI } from "../Prelude/index.js";
import * as P from "../Prelude/index.js";
import type { Show } from "../Show/index.js";
/**
 * The `Const` type constructor, which wraps its first type argument and ignores its second.
 * That is, `Const<E, A>` is isomorphic to `E` for any `A`.
 *
 * `Const` has some useful instances. For example, the `Applicative` instance allows us to collect results using a `Identity`
 * while ignoring return values.
 */
export declare type Const<E, A> = E & {
    readonly _A: A;
};
/**
 * Map + MapLeft
 */
export declare function bimap_<E, A, G, B>(fea: Const<E, A>, f: (e: E) => G, g: (a: A) => B): Const<G, B>;
/**
 * Map + MapLeft
 */
export declare function bimap<E, G, A, B>(f: (e: E) => G, g: (a: A) => B): (fa: Const<E, A>) => Const<G, B>;
/**
 * Contramap input
 */
export declare const contramap_: <E, A, B>(fa: Const<E, A>, f: (b: B) => A) => Const<E, B>;
/**
 * Contramap input
 */
export declare function contramap<A, B>(f: (b: B) => A): <E>(fa: Const<E, A>) => Const<E, B>;
/**
 * The `Any` instance for `Const[E, +_]`
 */
export declare function getAny<E>(e: E): P.Any<[URI<"Const", {}>], P.Fix<"E", E>>;
/**
 * The `AssociativeBoth` instance for `Const[E, +_]`
 */
export declare function getAssociativeBoth<E>(A: As.Associative<E>): P.AssociativeBoth<[URI<"Const", {}>], P.Fix<"E", E>>;
/**
 * The `Contravariant` instance for `Const[+_, +_]`
 */
export declare const Contravariant: P.Contravariant<[URI<"Const", {}>], P.V<"E", "+">>;
/**
 * The `Covariant` instance for `Const[E, +_]`
 */
export declare const Covariant: P.Covariant<[URI<"Const", {}>], P.V<"E", "+">>;
/**
 * The `IdentityBoth` instance for `Const[E, +_]`
 */
export declare function getIdentityBoth<E>(I: Id.Identity<E>): P.IdentityBoth<[URI<"Const", {}>], P.Fix<"E", E>>;
/**
 * The `Applicative` instance for `Const[E, +_]`
 */
export declare function getApplicative<E>(I: Id.Identity<E>): P.Applicative<[URI<"Const", {}>], P.Fix<"E", E>>;
/**
 * The `Show` instance for `Const[E, +_]`
 */
export declare function getShow<E>(S: Show<E>): <A>() => Show<Const<E, A>>;
/**
 * The `Bounded` instance for `Const[E, +_]`
 */
export declare function getBounded<E>(B: Bounded<E>): <A>() => Bounded<Const<E, A>>;
/**
 * The `Equal` instance for `Const[E, +_]`
 */
export declare function getEqual<E>(E: Equal<E>): <A>() => Equal<Const<E, A>>;
/**
 * The `Identity` instance for `Const[E, +_]`
 */
export declare function getIdentity<E>(I: Id.Identity<E>): <A>() => Id.Identity<Const<E, A>>;
/**
 * The `Ord` instance for `Const[E, +_]`
 */
export declare function getOrd<E>(O: Ord<E>): <A>() => Ord<Const<E, A>>;
/**
 * The `Associative` instance for `Const[E, +_]`
 */
export declare function getAssociative<E>(A: As.Associative<E>): <A>() => As.Associative<Const<E, A>>;
/**
 * Construct `Const[E, A]`
 */
export declare const makeConst: <E>(e: E) => <A = never>() => Const<E, A>;
/**
 * Maps `Const[E, A]` to `Const[E, B]` via `f : A => B`
 *
 * @ets_optimize identity
 */
export declare const map_: <E, A, B>(fa: Const<E, A>, f: (a: A) => B) => Const<E, B>;
/**
 * Maps `Const[E, A]` to `Const[E, B]` via `f : A => B`
 */
export declare function map<A, B>(f: (a: A) => B): {
    /**
     * @ets_optimize identity
     */
    <E>(fa: Const<E, A>): Const<E, B>;
};
/**
 * Maps `Const[E, A]` to `Const[E1, A]` via `f : E => E1`
 */
export declare const mapLeft_: <E, A, G>(fea: Const<E, A>, f: (e: E) => G) => Const<G, A>;
/**
 * Maps `Const[E, A]` to `Const[E1, A]` via `f : E => E1`
 */
export declare function mapLeft<E, G>(f: (e: E) => G): {
    <A>(fa: Const<E, A>): Const<G, A>;
};
//# sourceMappingURL=index.d.ts.map