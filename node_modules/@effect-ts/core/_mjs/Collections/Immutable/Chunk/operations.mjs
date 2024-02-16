// ets_tracing: off
import * as Chunk from "@effect-ts/system/Collections/Immutable/Chunk";
import * as Tp from "@effect-ts/system/Collections/Immutable/Tuple";
import { identity, pipe } from "@effect-ts/system/Function";
import { makeEqual } from "../../../Equal/index.mjs";
import { makeIdentity } from "../../../Identity/index.mjs";
import * as Ord from "../../../Ord/index.mjs";
import * as DSL from "../../../Prelude/DSL/index.mjs";
import * as P from "../../../Prelude/index.mjs";
export * from "@effect-ts/system/Collections/Immutable/Chunk";
/**
 * `ForEachWithIndex`'s `forEachWithIndexF` function
 */

export const forEachWithIndexF = /*#__PURE__*/P.implementForEachWithIndexF()(_ => G => {
  const succeed = DSL.succeedF(G);
  return f => fa => {
    let base = succeed(Chunk.empty());

    for (let k = 0; k < fa.length; k += 1) {
      base = G.map(({
        tuple: [bs, b]
      }) => Chunk.append_(bs, b))(G.both(f(k, Chunk.unsafeGet_(fa, k)))(base));
    }

    return base;
  };
});
/**
 * `ForEach`'s `forEachF` function
 */

export const forEachF = /*#__PURE__*/P.implementForEachF()(_ => G => f => forEachWithIndexF(G)((_, a) => f(a)));
/**
 * `ForEach`'s `forEachF` function
 */

export const forEachF_ = (fa, G) => f => forEachF(G)(f)(fa);
/**
 * `Wilt`'s `separateF` function
 */

export const separateF = /*#__PURE__*/P.implementSeparateF()(_ => G => f => x => G.map(Chunk.partitionMap(identity))(forEachF(G)(f)(x)));
/**
 * `Wilt`'s `separateF` function
 */

export const separateWithIndexF = /*#__PURE__*/P.implementSeparateWithIndexF()(_ => G => f => x => G.map(Chunk.partitionMap(identity))(forEachWithIndexF(G)(f)(x)));
/**
 * `Wither`'s `compactF` function
 */

export const compactF = /*#__PURE__*/P.implementCompactF()(_ => G => f => x => G.map(Chunk.compact)(forEachF(G)(f)(x)));
/**
 * `WitherWithIndex`'s `compactWithIndexF` function
 */

export const compactWithIndexF = /*#__PURE__*/P.implementCompactWithIndexF()(_ => G => f => x => G.map(Chunk.compact)(forEachWithIndexF(G)(f)(x)));
/**
 * Test if a value is a member of an array. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `Chunk<A>`.
 *
 * @ets_data_first elem_
 */

export function elem(E, a) {
  return as => elem_(as, E, a);
}
/**
 * Test if a value is a member of an array. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `Chunk<A>`.
 */

export function elem_(as, E, a) {
  const predicate = element => E.equals(element, a);

  let i = 0;
  const len = as.length;

  for (; i < len; i++) {
    if (predicate(Chunk.unsafeGet_(as, i))) {
      return true;
    }
  }

  return false;
}
/**
 * Creates an array of array values not included in the other given array using a `Equal` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */

export function difference_(xs, E, ys) {
  return Chunk.filter_(xs, a => !elem_(ys, E, a));
}
/**
 * Creates an array of array values not included in the other given array using a `Equal` for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @ets_data_first difference_
 */

export function difference(E, ys) {
  return xs => difference_(xs, E, ys);
}
/**
 * Derives an `Equal` over the `Chunk` of a given element type from the `Equal` of that type. The derived `Equal` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 */

export function getEqual(E) {
  return makeEqual((xs, ys) => xs === ys || Chunk.corresponds_(xs, ys, E.equals));
}
/**
 * Returns a `Identity` for `Chunk<A>`
 */

export function getIdentity() {
  return makeIdentity(Chunk.empty(), Chunk.concat_);
}
/**
 * Returns a `Ord` for `Chunk<A>` given `Ord<A>`
 */

export function getOrd(O) {
  return Ord.makeOrd((a, b) => {
    const aLen = a.length;
    const bLen = b.length;
    const len = Math.min(aLen, bLen);

    for (let i = 0; i < len; i++) {
      const ordering = O.compare(Chunk.unsafeGet_(a, i), Chunk.unsafeGet_(b, i));

      if (ordering !== 0) {
        return ordering;
      }
    }

    return Ord.number.compare(aLen, bLen);
  });
}
/**
 * Returns a `Show` for `Chunk<A>` given `Show<A>`
 */

export function getShow(S) {
  return {
    show: as => `[${Chunk.join_(Chunk.map_(as, S.show), ", ")}]`
  };
}
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */

export function intersection_(xs, E, ys) {
  return Chunk.filter_(xs, a => elem_(ys, E, a));
}
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @ets_data_first intersection_
 */

export function intersection(E, ys) {
  return xs => intersection_(xs, E, ys);
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

export function foldMap_(fa, M, f) {
  return foldMapWithIndex_(fa, M, (_, a) => f(a));
}
/**
 * Fold Identity with a mapping function that consider also the index
 */

export function foldMapWithIndex(M) {
  return f => fa => foldMapWithIndex_(fa, M, f);
}
/**
 * Fold Identity with a mapping function that consider also the index
 */

export function foldMapWithIndex_(fa, M, f) {
  return Chunk.reduce_(Chunk.zipWithIndex(fa), M.identity, (b, {
    tuple: [a, i]
  }) => M.combine(b, f(i, a)));
}
/**
 * Sort the elements of an array in increasing order
 *
 * @ets_data_first sort_
 */

export function sort(O) {
  return as => sort_(as, O);
}
/**
 * Sort the elements of an array in increasing order
 */

export function sort_(as, O) {
  return Chunk.from([...Chunk.toArray(as)].sort((x, y) => O.compare(x, y)));
}
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`,
 * then `ords[1]`, then `ords[2]`, etc...
 *
 * @ets_data_first sortBy_
 */

export function sortBy(ords) {
  return as => sortBy_(as, ords);
}
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`,
 * then `ords[1]`, then `ords[2]`, etc...
 */

export function sortBy_(as, ords) {
  const M = Ord.getIdentity();
  return sort_(as, ords.reduce((x, y) => M.combine(x, y), M.identity));
}
/**
 * Creates an array of unique values, in order, from all given arrays using a `Equal` for equality comparisons
 */

export function union_(xs, E, ys) {
  return Chunk.concat_(xs, Chunk.filter_(ys, a => !elem_(xs, E, a)));
}
/**
 * Creates an array of unique values, in order, from all given arrays using a `Equal` for equality comparisons
 *
 * @ets_data_first union_
 */

export function union(E, ys) {
  return xs => union_(xs, E, ys);
}
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 */

export function uniq_(as, E) {
  let r = Chunk.empty();
  const len = as.length;
  let i = 0;

  for (; i < len; i++) {
    const a = Chunk.unsafeGet_(as, i);

    if (!elem_(r, E, a)) {
      r = Chunk.append_(r, a);
    }
  }

  return len === r.length ? as : r;
}
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 *
 * @ets_data_first uniq_
 */

export function uniq(E) {
  return as => uniq_(as, E);
}
/**
 * Separate elements based on a apredicate
 *
 * @ets_data_first partition_
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
 * Separate elements based on a map function that also carry the index
 */

export function partitionMapWithIndex_(fa, f) {
  const left = [];
  const right = [];

  for (let i = 0; i < fa.length; i++) {
    const e = f(i, Chunk.unsafeGet_(fa, i));

    if (e._tag === "Left") {
      left.push(e.left);
    } else {
      right.push(e.right);
    }
  }

  return Tp.tuple(Chunk.from(left), Chunk.from(right));
}
/**
 * Separate elements based on a map function that also carry the index
 *
 * @ets_data_first partitionMapWithIndex_
 */

export function partitionMapWithIndex(f) {
  return fa => partitionMapWithIndex_(fa, f);
}
/**
 * Separate elements based on a predicate that also carry the index
 *
 * @ets_data_first partitionWithIndex
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
    const a = Chunk.unsafeGet_(fa, i);

    if (predicateWithIndex(i, a)) {
      right.push(a);
    } else {
      left.push(a);
    }
  }

  return Tp.tuple(Chunk.from(left), Chunk.from(right));
}
//# sourceMappingURL=operations.mjs.map