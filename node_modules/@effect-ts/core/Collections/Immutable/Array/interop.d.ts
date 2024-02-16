import * as T from "@effect-ts/system/Effect";
import * as S from "@effect-ts/system/Sync";
import * as A from "./operations.js";
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 */
export declare function mapEffect_<A, R, E, B>(self: A.Array<A>, f: (a: A) => T.Effect<R, E, B>): T.Effect<R, E, A.Array<B>>;
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 *
 * @ets_data_first mapEffect_
 */
export declare function mapEffect<A, R, E, B>(f: (a: A) => T.Effect<R, E, B>): (self: A.Array<A>) => T.Effect<R, E, A.Array<B>>;
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 */
export declare function mapEffectPar_<A, R, E, B>(self: A.Array<A>, f: (a: A) => T.Effect<R, E, B>): T.Effect<R, E, A.Array<B>>;
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 *
 * @ets_data_first mapEffectPar_
 */
export declare function mapEffectPar<A, R, E, B>(f: (a: A) => T.Effect<R, E, B>): (self: A.Array<A>) => T.Effect<R, E, A.Array<B>>;
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 */
export declare function mapEffectParN_<A, R, E, B>(self: A.Array<A>, n: number, f: (a: A) => T.Effect<R, E, B>): T.Effect<R, E, A.Array<B>>;
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 *
 * @ets_data_first mapEffectParN_
 */
export declare function mapEffectParN<A, R, E, B>(n: number, f: (a: A) => T.Effect<R, E, B>): (self: A.Array<A>) => T.Effect<R, E, A.Array<B>>;
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 */
export declare function mapSync_<A, R, E, B>(self: A.Array<A>, f: (a: A) => S.Sync<R, E, B>): S.Sync<R, E, A.Array<B>>;
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 *
 * @ets_data_first mapSync_
 */
export declare function mapSync<A, R, E, B>(f: (a: A) => S.Sync<R, E, B>): (self: A.Array<A>) => S.Sync<R, E, A.Array<B>>;
//# sourceMappingURL=interop.d.ts.map