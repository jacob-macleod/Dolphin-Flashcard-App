import * as A from "@effect-ts/system/Collections/Immutable/Array";
import { pipe } from "@effect-ts/system/Function";
import { makeEqual } from "../../../Equal/index.mjs";
import { makeIdentity } from "../../../Identity/index.mjs";
import * as Ord from "../../../Ord/index.mjs";
import * as P from "../../../Prelude/index.mjs";
import * as C from "../Chunk/operations.mjs";
import * as Tp from "../Tuple/index.mjs";
export * from "@effect-ts/system/Collections/Immutable/Array";
/**
 * `ForEachWithIndex`'s `forEachWithIndexF` function
 */

export const forEachWithIndexF = /*#__PURE__*/P.implementForEachWithIndexF()(_ => G => f => fa => G.map(C.toArray)(C.forEachWithIndexF(G)(f)(C.from(fa))));
/**
 * `ForEach`'s `forEachF` function
 */

export const forEachF = /*#__PURE__*/P.implementForEachF()(_ => G => f => forEachWithIndexF(G)((_, a) => f(a)));
/**
 * `Wilt`'s `separateF` function
 */

export const separateF = /*#__PURE__*/P.implementSeparateF()(_ => G => f => x => G.map(A.separate)(forEachF(G)(f)(x)));
/**
 * `Wilt`'s `separateF` function
 */

export const separateWithIndexF = /*#__PURE__*/P.implementSeparateWithIndexF()(_ => G => f => x => G.map(A.separate)(forEachWithIndexF(G)(f)(x)));
/**
 * `Wither`'s `compactF` function
 */

export const compactF = /*#__PURE__*/P.implementCompactF()(_ => G => f => x => G.map(A.compact)(forEachF(G)(f)(x)));
/**
 * `WitherWithIndex`'s `compactWithIndexF` function
 */

export const compactWithIndexF = /*#__PURE__*/P.implementCompactWithIndexF()(_ => G => f => x => G.map(A.compact)(forEachWithIndexF(G)(f)(x)));
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
 * Test if a value is a member of an array. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `Array<A>`.
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
 * Derives an `Equal` over the `Array` of a given element type from the `Equal` of that type. The derived `Equal` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 */

export function getEqual(E) {
  return makeEqual((xs, ys) => xs === ys || xs.length === ys.length && xs.every((x, i) => E.equals(x, ys[i])));
}
/**
 * Returns a `Identity` for `Array<A>`
 */

export function getIdentity() {
  return makeIdentity(A.empty(), A.concat_);
}
/**
 * Returns a `Ord` for `Array<A>` given `Ord<A>`
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
 * Returns a `Show` for `Array<A>` given `Show<A>`
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
  return (fa, f) => fa.reduce((b, a, i) => M.combine(b, f(i, a)), M.identity);
}
/**
 * Sort the elements of an array in increasing order
 */

export function sort(O) {
  return as => [...as].sort((x, y) => O.compare(x, y));
}
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`,
 * then `ords[1]`, then `ords[2]`, etc...
 */

export function sortBy(ords) {
  const M = Ord.getIdentity();
  return sort(ords.reduce((x, y) => M.combine(x, y), M.identity));
}
/**
 * Creates an array of unique values, in order, from all given arrays using a `Equal` for equality comparisons
 */

export function union_(E) {
  const elemE = elem_(E);
  return (xs, ys) => A.concat_(xs, ys.filter(a => !elemE(xs, a)));
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
 * Separate elements based on a apredicate
 */

export function partition(predicate) {
  return fa => partitionWithIndex((_, a) => predicate(a))(fa);
}
/**
 * Separate elements based on a apredicate
 */

export function partition_(fa, predicate) {
  return partitionWithIndex((_, a) => predicate(a))(fa);
}
/**
 * Separate elements based on a map function
 */

export function partitionMap(f) {
  return partitionMapWithIndex((_, a) => f(a));
}
/**
 * Separate elements based on a map function
 */

export function partitionMap_(fa, f) {
  return partitionMapWithIndex_(fa, (_, a) => f(a));
}
/**
 * Separate elements based on a map function that also carry the index
 */

export function partitionMapWithIndex_(fa, f) {
  const left = [];
  const right = [];

  for (let i = 0; i < fa.length; i++) {
    const e = f(i, fa[i]);

    if (e._tag === "Left") {
      left.push(e.left);
    } else {
      right.push(e.right);
    }
  }

  return Tp.tuple(left, right);
}
/**
 * Separate elements based on a map function that also carry the index
 */

export function partitionMapWithIndex(f) {
  return fa => partitionMapWithIndex_(fa, f);
}
/**
 * Separate elements based on a predicate that also carry the index
 */

export function partitionWithIndex(predicateWithIndex) {
  return fa => partitionWithIndex_(fa, predicateWithIndex);
}
/**
 * Separate elements based on a predicate that also carry the index
 */

export function partitionWithIndex_(fa, predicateWithIndex) {
  const left = [];
  const right = [];

  for (let i = 0; i < fa.length; i++) {
    const a = fa[i];

    if (predicateWithIndex(i, a)) {
      right.push(a);
    } else {
      left.push(a);
    }
  }

  return Tp.tuple(left, right);
}
//# sourceMappingURL=operations.mjs.map