import "../Operator/index.js";
import type { Equal } from "../Equal/index.js";
import type { Identity } from "../Identity/index.js";
import type { URI } from "../Prelude/index.js";
import * as P from "../Prelude/index.js";
import type { Show } from "../Show/index.js";
export declare type Id<A> = A;
/**
 * @ets_optimize identity
 */
export declare function alt_<A>(fx: A, _fy: () => A): A;
/**
 * @ets_data_first alt_
 */
export declare function alt<A>(that: () => A): (fa: A) => A;
export declare function ap_<A, B>(fab: (a: A) => B, fa: A): B;
/**
 * @ets_data_first ap_
 */
export declare function ap<A>(fa: A): <B>(fab: (a: A) => B) => B;
export declare function apFirst<B>(_fb: B): <A>(fa: A) => A;
export declare function apSecond<B>(fb: B): <A>(_fa: A) => B;
export declare function chain_<A, B>(fa: A, f: (a: A) => B): B;
/**
 * @ets_data_first chain_
 */
export declare function chain<A, B>(f: (a: A) => B): (ma: A) => B;
/**
 * @ets_data_first tap_
 */
export declare function tap<A, B>(f: (a: A) => B): (ma: A) => A;
export declare function tap_<A, B>(ma: A, f: (a: A) => B): A;
/**
 * @ets_optimize identity
 */
export declare function duplicate<A>(ma: A): A;
export declare function extend_<A, B>(wa: A, f: (wa: A) => B): B;
/**
 * @ets_data_first extend_
 */
export declare function extend<A, B>(f: (fa: A) => B): (ma: A) => B;
/**
 * @ets_optimize identity
 */
export declare function extract<A>(wa: A): A;
/**
 * @ets_optimize identity
 */
export declare function flatten<A>(wa: A): A;
export declare function foldMap_<M>(M: Identity<M>): <A>(fa: A, f: (a: A) => M) => M;
export declare function foldMap<M>(M: Identity<M>): <A>(f: (a: A) => M) => (fa: A) => M;
/**
 * @ets_optimize identity
 */
export declare function getEq<A>(E: Equal<A>): Equal<Id<A>>;
/**
 * @ets_optimize identity
 */
export declare function getShow<A>(E: Show<A>): Show<Id<A>>;
export declare function map_<A, B>(fa: A, f: (a: A) => B): B;
/**
 * @ets_data_first map_
 */
export declare function map<A, B>(f: (a: A) => B): (fa: A) => B;
export declare function reduce_<A, B>(fa: A, b: B, f: (b: B, a: A) => B): B;
/**
 * @ets_data_first reduce_
 */
export declare function reduce<A, B>(b: B, f: (b: B, a: A) => B): (fa: A) => B;
export declare function reduceRight_<A, B>(fa: A, b: B, f: (a: A, b: B) => B): B;
/**
 * @ets_data_first reduceRight_
 */
export declare function reduceRight<A, B>(b: B, f: (a: A, b: B) => B): (fa: A) => B;
export declare const Any: P.Any<[URI<"Id", {}>], P.Auto>;
export declare const Covariant: P.Covariant<[URI<"Id", {}>], P.Auto>;
export declare const AssociativeBoth: P.AssociativeBoth<[URI<"Id", {}>], P.Auto>;
export declare const AssociativeFlatten: P.AssociativeFlatten<[URI<"Id", {}>], P.Auto>;
export declare const IdentityBoth: P.IdentityBoth<[URI<"Id", {}>], P.Auto>;
export declare const IdentityFlatten: P.IdentityFlatten<[URI<"Id", {}>], P.Auto>;
export declare const Applicative: P.Applicative<[URI<"Id", {}>], P.Auto>;
export declare const Monad: P.Monad<[URI<"Id", {}>], P.Auto>;
export declare const Reduce: P.Reduce<[URI<"Id", {}>], P.Auto>;
export declare const ReduceRight: P.ReduceRight<[URI<"Id", {}>], P.Auto>;
export declare const FoldMap: P.FoldMap<[URI<"Id", {}>], P.Auto>;
export declare const Foldable: P.Foldable<[URI<"Id", {}>], P.Auto>;
export declare const ForEach: P.ForEach<[URI<"Id", {}>], P.Auto>;
export declare const struct: <NER extends Record<string, unknown>, K = any, Q = any, W = any, X = any, I = any, S = any, R = any, E = any>(r: import("@effect-ts/system/Utils/index.js").EnforceNonEmptyRecord<NER> & Record<string, unknown>) => { [K_1 in keyof NER]: P.Infer<[URI<"Id", {}>], P.Auto, "A", NER[K_1]>; };
export declare const tuple: <T extends unknown[], K = any, Q = any, W = any, X = any, I = any, S = any, R = any, E = any>(...t: T & {
    readonly 0: unknown;
}) => { [K_1 in keyof T]: [T[K_1]] extends [infer A] ? A : never; };
//# sourceMappingURL=index.d.ts.map