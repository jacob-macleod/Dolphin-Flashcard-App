// ets_tracing: off
import * as Ord from "@effect-ts/system/Ord";
import { makeAssociative } from "./makeAssociative.mjs";
/**
 * Fold `Associative` through an `Array`
 */

export function fold(S) {
  return a => as => as.reduce((x, y) => S.combine(x, y), a);
}
/**
 * `Associative` that returns first element
 */

export function first() {
  return makeAssociative(x => x);
}
/**
 * `Associative` that returns last element
 */

export function last() {
  return makeAssociative((_, y) => y);
}
/**
 * Given a tuple of `Associative` returns an `Associative` for the tuple
 */

export function tuple(...associatives) {
  return makeAssociative((x, y) => associatives.map((s, i) => s.combine(x[i], y[i])));
}
/**
 * The dual of a `Associative`, obtained by swapping the arguments of `combine`.
 */

export function inverted(S) {
  return makeAssociative((x, y) => S.combine(y, x));
}
/**
 * `Associative` for function combination
 */

export function func(S) {
  return () => makeAssociative((f, g) => a => S.combine(f(a), g(a)));
}
/**
 * `Associative` for a structure
 */

export function struct(associatives) {
  return makeAssociative((x, y) => {
    const r = {};

    for (const key of Object.keys(associatives)) {
      r[key] = associatives[key].combine(x[key], y[key]);
    }

    return r;
  });
}
/**
 * `Associative` that returns last `Min` of elements
 */

export function min(O) {
  return makeAssociative(Ord.min(O));
}
/**
 * `Associative` that returns last `Max` of elements
 */

export function max(O) {
  return makeAssociative(Ord.max(O));
}
/**
 * Returns a `Associative` instance for objects preserving their type
 */

export function object() {
  return makeAssociative((x, y) => Object.assign({}, x, y));
}
/**
 * You can glue items between and stay associative
 */

export function intercalate(a) {
  return S => makeAssociative((x, y) => S.combine(x, S.combine(a, y)));
}
export * from "./definition.mjs";
//# sourceMappingURL=operations.mjs.map