// ets_tracing: off
import * as List from "@effect-ts/system/Collections/Immutable/List";
import { makeEqual } from "../../../Equal/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import { makeIdentity } from "../../../Identity/index.mjs";
import * as P from "../../../Prelude/index.mjs";
import * as A from "../Array/index.mjs";
export * from "@effect-ts/system/Collections/Immutable/List";
/**
 * `ForEach`'s `forEachF` function
 */

export const forEachF = /*#__PURE__*/P.implementForEachF()(() => G => f => fa => List.reduceRight_(fa, P.succeedF(G)(List.empty()), (a, acc) => G.map(({
  tuple: [b, l]
}) => List.prepend_(l, b))(G.both(acc)(f(a)))));
/**
 * Sort the given list by passing each value through the function and
 * comparing the resulting value.
 *
 * Performs a stable sort.
 *
 * @complexity O(n * log(n))
 */

export function sortBy(O) {
  const so = sortBy_(O);
  return f => l => so(l, f);
}
/**
 * Sort the given list by passing each value through the function and
 * comparing the resulting value.
 *
 * Performs a stable sort.
 *
 * @complexity O(n * log(n))
 */

export function sortBy_(O) {
  return (l, f) => {
    if (l.length === 0) {
      return l;
    }

    const arr = [];
    let i = 0;
    List.forEach_(l, elm => arr.push({
      idx: i++,
      elm,
      prop: f(elm)
    }));
    arr.sort(({
      idx: i,
      prop: a
    }, {
      idx: j,
      prop: b
    }) => {
      const c = O.compare(a, b);
      return c !== 0 ? c : i < j ? -1 : 1;
    });
    const newL = List.emptyPushable();

    for (let i = 0; i < arr.length; ++i) {
      List.push_(newL, arr[i].elm);
    }

    return newL;
  };
}
/**
 * `Wiltable`'s `separateF` function
 */

export const separateF = /*#__PURE__*/P.implementSeparateF()(_ => G => f => x => G.map(List.separate)(forEachF(G)(f)(x)));
/**
 * `Wither`'s `compactF` function
 */

export const compactF = /*#__PURE__*/P.implementCompactF()(_ => G => f => x => G.map(List.compact)(forEachF(G)(f)(x)));
/**
 * Test if a value is a member of an array. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `Array<A>`.
 */

export function elem(E) {
  const elemE = elem_(E);
  return a => as => elemE(as, a);
}
/**
 * Test if a value is a member of a list. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an list of type `List<A>`.
 */

export function elem_(E) {
  return (as, a) => List.find_(as, y => E.equals(y, a))._tag === "Some";
}
/**
 * Creates an array of array values not included in the other given array using a `Equal` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */

export function difference_(E) {
  const elemE = elem_(E);
  return (xs, ys) => List.filter_(xs, a => !elemE(ys, a));
}
/**
 * Creates an array of array values not included in the other given array using a `Equal` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */

export function difference(E) {
  const diff = difference_(E);
  return ys => xs => diff(xs, ys);
}
/**
 * Derives an `Equal` over the `Array` of a given element type from the `Equal` of that type. The derived `Equal` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 */

export function getEqual(E) {
  const eq = A.getEqual(E);
  return makeEqual((xs, ys) => xs === ys || xs.length === ys.length && eq.equals(List.toArray(xs), List.toArray(ys)));
}
/**
 * Returns a `Identity` for `List<A>`
 */

export function getIdentity() {
  return makeIdentity(List.empty(), List.concat_);
}
/**
 * Returns a `Show` for `Array<A>` given `Show<A>`
 */

export function getShow(S) {
  return {
    show: as => `[${List.join_(List.map_(as, S.show), ", ")}]`
  };
}
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first list.
 */

export function intersection_(E) {
  const elemE = elem_(E);
  return (xs, ys) => List.filter_(xs, a => elemE(ys, a));
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
 * Fold Identity with a mapping function that consider also the index
 */

export function foldMap_(M) {
  return (fa, f) => List.reduce_(fa, M.identity, (b, a) => M.combine(b, f(a)));
}
/**
 * Fold Identity with a mapping function that consider also the index
 */

export function foldMap(M) {
  const fmap = foldMap_(M);
  return f => fa => fmap(fa, f);
}
/**
 * Creates an array of unique values, in order, from all given arrays using a `Equal` for equality comparisons
 */

export function union_(E) {
  const elemE = elem_(E);
  return (xs, ys) => List.concat_(xs, List.filter_(ys, a => !elemE(xs, a)));
}
/**
 * Creates an array of unique values, in order, from all given arrays using a `Equal` for equality comparisons
 */

export function union(E) {
  const un = union_(E);
  return ys => xs => un(xs, ys);
}
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 */

export function uniq(E) {
  const elemS = elem_(E);
  return as => List.reduce_(as, List.emptyPushable(), (acc, a) => {
    if (!elemS(acc, a)) {
      List.push_(acc, a);
    }

    return acc;
  });
}
//# sourceMappingURL=operations.mjs.map