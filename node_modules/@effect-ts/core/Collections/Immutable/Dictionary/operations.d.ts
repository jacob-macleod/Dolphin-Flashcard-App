import * as R from "@effect-ts/system/Collections/Immutable/Dictionary";
import * as Tp from "@effect-ts/system/Collections/Immutable/Tuple";
import type { Associative } from "../../../Associative/index.js";
import type { Closure } from "../../../Closure/index.js";
import type { Equal } from "../../../Equal/index.js";
import type { Identity } from "../../../Identity/index.js";
import type { DictionaryURI } from "../../../Modules/index.js";
import type * as HKT from "../../../Prelude/HKT/index.js";
import type { Foldable, URI } from "../../../Prelude/index.js";
import * as P from "../../../Prelude/index.js";
import type { Show } from "../../../Show/index.js";
export * from "@effect-ts/system/Collections/Immutable/Dictionary";
/**
 * Traverse Record with Applicative, passing index to f
 */
export declare const forEachWithIndexF: P.ForEachWithIndexFn<[HKT.URI<"Dictionary", {}>], HKT.Auto>;
/**
 * Traverse Record with Applicative
 */
export declare const forEachF: P.ForeachFn<[HKT.URI<"Dictionary", {}>], HKT.Auto>;
/**
 * Fold + MapWithIndex
 */
export declare const foldMapWithIndex: P.FoldMapWithIndexFn<[URI<DictionaryURI>]>;
/**
 * Fold + Map
 */
export declare const foldMap: P.FoldMapFn<[URI<DictionaryURI>]>;
/**
 * WiltWithIndex's separate
 */
export declare const separateWithIndexF: P.WiltWithIndex<[HKT.URI<"Dictionary", {}>], HKT.Auto>;
/**
 * Wilt's separate
 */
export declare const separateF: P.Wilt<[HKT.URI<"Dictionary", {}>], HKT.Auto>;
/**
 * WitherWithIndex's compactWithIndex
 */
export declare const compactWithIndexF: P.WitherWithIndex<[HKT.URI<"Dictionary", {}>], HKT.Auto>;
/**
 * Wither's compact
 */
export declare const compactF: P.Wither<[HKT.URI<"Dictionary", {}>], HKT.Auto>;
/**
 * Like fromFoldable + map
 */
export declare function fromFoldableMap_<F extends HKT.URIS, C, B>(M: Closure<B>, F: Foldable<F, C>): <K, Q, W, X, I, S, R, E, A>(fa: HKT.Kind<F, C, K, Q, W, X, I, S, R, E, A>, f: (a: A) => Tp.Tuple<[string, B]>) => R.Dictionary<B>;
/**
 * Like fromFoldable + map
 */
export declare function fromFoldableMap<F extends HKT.URIS, C, B>(M: Closure<B>, F: Foldable<F, C>): <A>(f: (a: A) => Tp.Tuple<[string, B]>) => <K, Q, W, X, I, S, R, E>(fa: HKT.Kind<F, C, K, Q, W, X, I, S, R, E, A>) => R.Dictionary<B>;
/**
 * Construct a Record from a Foldable and a Closure of values
 */
export declare function fromFoldable<F extends HKT.URIS, C, A>(M: Closure<A>, F: Foldable<F>): <K, Q, W, X, I, S, R, E>(fa: HKT.Kind<F, C, K, Q, W, X, I, S, R, E, Tp.Tuple<[string, A]>>) => R.Dictionary<A>;
/**
 * Get Show of Record given Show of values
 */
export declare function getShow<A>(S: Show<A>): Show<R.Dictionary<A>>;
/**
 * Test whether one record contains all of the keys and values contained in another record
 */
export declare function isSubrecord_<A>(E: Equal<A>): (x: R.Dictionary<A>, y: R.Dictionary<A>) => boolean;
/**
 * Test whether one record contains all of the keys and values contained in another record
 */
export declare function isSubrecord<A>(E: Equal<A>): (y: R.Dictionary<A>) => (x: R.Dictionary<A>) => boolean;
/**
 * Get Equals for record given Equals of values
 */
export declare function getEqual<A>(E: Equal<A>): Equal<R.Dictionary<A>>;
/**
 * Returns a `Identity` instance for records given a `Associative` instance for their values
 */
export declare function getIdentity<A>(S: Associative<A>): Identity<R.Dictionary<A>>;
//# sourceMappingURL=operations.d.ts.map