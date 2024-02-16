// ets_tracing: off
import * as A from "@effect-ts/system/Collections/Immutable/Array";
import * as L from "@effect-ts/system/Collections/Immutable/List";
import * as NA from "@effect-ts/system/Collections/Immutable/NonEmptyArray";
import { pipe } from "@effect-ts/system/Function";
import { makeAssociative } from "../../../Associative/index.mjs";
import { makeEqual } from "../../../Equal/index.mjs";
import * as Ord from "../../../Ord/index.mjs";
import * as DSL from "../../../Prelude/DSL/index.mjs";
import * as P from "../../../Prelude/index.mjs";
export * from "@effect-ts/system/Collections/Immutable/NonEmptyArray";
/**
 * `ForEachWithIndex`'s `forEachWithIndexF` function
 */

export const forEachWithIndexF = /*#__PURE__*/P.implementForEachWithIndexF()(_ => G => f => x => G.map(L.toArray)(A.reduceWithIndex_(x, DSL.succeedF(G)(L.empty()), (k, b, a) => G.map(({
  tuple: [x, y]
}) => L.append_(x, y))(G.both(f(k, a))(b)))));
/**
 * `ForEach`'s `forEachF` function
 */

export const forEachF = /*#__PURE__*/P.implementForEachF()(_ => G => f => forEachWithIndexF(G)((_, a) => f(a)));
/**
 * Test if a value is a member of an array. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `NonEmptyArray<A>`.
 */

export function elem(E) {
  const elemE = elem_(E);
  return a => as => elemE(as, a);
}
/**
 * Test if a value is a member of an array. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `NonEmptyArray<A>`.
 */

export function elem_(E) {
  return (as, a) => {
    const predicate = element => E.equals(element, a);

    let i = 0;
    const len = as.length;

    for (; i < len; i++) {
      if (predicate(as[i])) {
        return true;
      }
    }

    return false;
  };
}
/**
 * Creates an array of array values not included in the other given array using a `Equal` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */

export function difference_(E) {
  const elemE = elem_(E);
  return (xs, ys) => xs.filter(a => !elemE(ys, a));
}
/**
 * Creates an array of array values not included in the other given array using a `Equal` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */

export function difference(E) {
  const elemE = elem_(E);
  return ys => xs => xs.filter(a => !elemE(ys, a));
}
/**
 * Derives an `Equal` over the `NonEmptyArray` of a given element type from the `Equal` of that type. The derived `Equal` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 */

export function getEqual(E) {
  return makeEqual((xs, ys) => xs === ys || xs.length === ys.length && xs.every((x, i) => E.equals(x, ys[i])));
}
/**
 * Returns a `Ord` for `NonEmptyArray<A>` given `Ord<A>`
 */

export function getOrd(O) {
  return Ord.makeOrd((a, b) => {
    const aLen = a.length;
    const bLen = b.length;
    const len = Math.min(aLen, bLen);

    for (let i = 0; i < len; i++) {
      const ordering = O.compare(a[i], b[i]);

      if (ordering !== 0) {
        return ordering;
      }
    }

    return Ord.number.compare(aLen, bLen);
  });
}
/**
 * Returns a `Show` for `NonEmptyArray<A>` given `Show<A>`
 */

export function getShow(S) {
  return {
    show: as => `[${as.map(S.show).join(", ")}]`
  };
}
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */

export function intersection_(E) {
  const elemE = elem_(E);
  return (xs, ys) => xs.filter(a => elemE(ys, a));
}
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */

export function intersection(E) {
  const int = intersection_(E);
  return ys => xs => int(xs, ys);
}
/**
 * Fold Identity with a mapping function
 */

export function foldMap(M) {
  return f => foldMapWithIndex(M)((_, a) => f(a));
}
/**
 * Fold Identity with a mapping function
 */

export function foldMap_(M) {
  return (fa, f) => foldMapWithIndex_(M)(fa, (_, a) => f(a));
}
/**
 * Fold Identity with a mapping function that consider also the index
 */

export function foldMapWithIndex(M) {
  return f => fa => foldMapWithIndex_(M)(fa, f);
}
/**
 * Fold Identity with a mapping function that consider also the index
 */

export function foldMapWithIndex_(M) {
  return ([fa0, ...fa], f) => fa.reduce((b, a, i) => M.combine(b, f(i + 1, a)), f(0, fa0));
}
/**
 * Sort the elements of an array in increasing order
 */

export function sort(O) {
  return as => [...as].sort(O.compare);
}
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`,
 * then `ords[1]`, then `ords[2]`, etc...
 */

export function sortBy(ords) {
  const M = Ord.getIdentity();
  return sort(ords.reduce(M.combine, M.identity));
}
/**
 * Creates an array of unique values, in order, from all given arrays using a `Equal` for equality comparisons
 */

export function union(E) {
  const elemE = elem_(E);
  return (xs, ys) => NA.concat_(xs, ys.filter(a => !elemE(xs, a)));
}
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 */

export function uniq(E) {
  const elemS = elem_(E);
  return as => {
    const r = [];
    const len = as.length;
    let i = 0;

    for (; i < len; i++) {
      const a = as[i];

      if (!elemS(r, a)) {
        r.push(a);
      }
    }

    return len === r.length ? as : r;
  };
}
/**
 * Get an Associative instance for NonEmptyArray
 */

export function getAssociative() {
  return makeAssociative(NA.concat_);
}
//# sourceMappingURL=operations.mjs.map