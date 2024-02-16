// ets_tracing: off
import * as T from "@effect-ts/system/Effect";
import * as S from "@effect-ts/system/Sync";
import * as A from "./operations.mjs";
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 */

export function mapEffect_(self, f) {
  return T.map_(T.forEach_(self, f), A.from);
}
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 *
 * @ets_data_first mapEffect_
 */

export function mapEffect(f) {
  return self => mapEffect_(self, f);
}
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 */

export function mapEffectPar_(self, f) {
  return T.map_(T.forEachPar_(self, f), A.from);
}
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 *
 * @ets_data_first mapEffectPar_
 */

export function mapEffectPar(f) {
  return self => mapEffectPar_(self, f);
}
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 */

export function mapEffectParN_(self, n, f) {
  return T.map_(T.forEachParN_(self, n, f), A.from);
}
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 *
 * @ets_data_first mapEffectParN_
 */

export function mapEffectParN(n, f) {
  return self => mapEffectParN_(self, n, f);
}
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 */

export function mapSync_(self, f) {
  return S.map_(S.forEach_(self, f), A.from);
}
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 *
 * @ets_data_first mapSync_
 */

export function mapSync(f) {
  return self => mapSync_(self, f);
}
//# sourceMappingURL=interop.mjs.map