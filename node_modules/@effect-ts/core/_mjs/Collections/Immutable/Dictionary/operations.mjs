// ets_tracing: off
import * as R from "@effect-ts/system/Collections/Immutable/Dictionary";
import * as Tp from "@effect-ts/system/Collections/Immutable/Tuple";
import * as O from "@effect-ts/system/Option";
import * as E from "../../../Either/index.mjs";
import { makeEqual } from "../../../Equal/index.mjs";
import { identity, pipe, tuple } from "../../../Function/index.mjs";
import { makeIdentity } from "../../../Identity/index.mjs";
import * as P from "../../../Prelude/index.mjs";
import { succeedF } from "../../../Prelude/index.mjs";
import * as A from "../Array/index.mjs";
export * from "@effect-ts/system/Collections/Immutable/Dictionary";
/**
 * Traverse Record with Applicative, passing index to f
 */

export const forEachWithIndexF = /*#__PURE__*/P.implementForEachWithIndexF()(_ => G => {
  const succeed = succeedF(G);
  return f => fa => {
    let base = succeed({});

    for (const k of Object.keys(fa)) {
      base = G.map(({
        tuple: [x, b]
      }) => Object.assign(x, {
        [k]: b
      }))(G.both(f(k, fa[k]))(base));
    }

    return base;
  };
});
/**
 * Traverse Record with Applicative
 */

export const forEachF = /*#__PURE__*/P.implementForEachF()(_ => G => f => forEachWithIndexF(G)((_, a) => f(a)));
/**
 * Fold + MapWithIndex
 */

export const foldMapWithIndex = I => f => R.reduceWithIndex(I.identity, (k, b, a) => I.combine(b, f(k, a)));
/**
 * Fold + Map
 */

export const foldMap = I => f => foldMapWithIndex(I)((_, a) => f(a));
/**
 * WiltWithIndex's separate
 */

export const separateWithIndexF = /*#__PURE__*/P.implementSeparateWithIndexF()(() => G => f => x => G.map(({
  tuple: [left, right]
}) => Tp.tuple(R.fromArray(left), R.fromArray(right)))(A.separateF(G)(([k, a]) => G.map(E.bimap(b => Tp.tuple(k, b), a => Tp.tuple(k, a)))(f(k, a)))(R.collect(tuple)(x))));
/**
 * Wilt's separate
 */

export const separateF = /*#__PURE__*/P.implementSeparateF()(() => G => f => separateWithIndexF(G)((_, a) => f(a)));
/**
 * WitherWithIndex's compactWithIndex
 */

export const compactWithIndexF = /*#__PURE__*/P.implementCompactWithIndexF()(() => G => f => x => G.map(R.fromArray)(A.compactF(G)(([k, a]) => G.map(O.map(b => Tp.tuple(k, b)))(f(k, a)))(R.collect(tuple)(x))));
/**
 * Wither's compact
 */

export const compactF = /*#__PURE__*/P.implementCompactF()(() => G => f => compactWithIndexF(G)((_, a) => f(a)));
export function fromFoldableMap_(M, F) {
  return (fa, f) => {
    return F.reduce({}, (r, a) => {
      const [k, b] = f(a).tuple;
      r[k] = Object.prototype.hasOwnProperty.call(r, k) ? M.combine(r[k], b) : b;
      return r;
    })(fa);
  };
}
export function fromFoldableMap(M, F) {
  const ff = fromFoldableMap_(M, F);
  return f => fa => ff(fa, f);
}
export function fromFoldable(M, F) {
  const fromFoldableMapM = fromFoldableMap(M, F);
  return fromFoldableMapM(identity);
}
/**
 * Get Show of Record given Show of values
 */

export function getShow(S) {
  return {
    show: r => {
      const elements = R.collect((k, a) => `${JSON.stringify(k)}: ${S.show(a)}`)(r).join(", ");
      return elements === "" ? "{}" : `{ ${elements} }`;
    }
  };
}
/**
 * Test whether one record contains all of the keys and values contained in another record
 */

export function isSubrecord_(E) {
  return (x, y) => {
    for (const k in x) {
      if (!Object.prototype.hasOwnProperty.call(y, k) || !E.equals(x[k], y[k])) {
        return false;
      }
    }

    return true;
  };
}
/**
 * Test whether one record contains all of the keys and values contained in another record
 */

export function isSubrecord(E) {
  const is = isSubrecord_(E);
  return y => x => is(x, y);
}
/**
 * Get Equals for record given Equals of values
 */

export function getEqual(E) {
  const isSubrecordE = isSubrecord_(E);
  return makeEqual((x, y) => isSubrecordE(x, y) && isSubrecordE(y, x));
}
/**
 * Returns a `Identity` instance for records given a `Associative` instance for their values
 */

export function getIdentity(S) {
  return makeIdentity(R.empty, (x, y) => {
    if (x === R.empty) {
      return y;
    }

    if (y === R.empty) {
      return x;
    }

    const keys = Object.keys(y);
    const len = keys.length;

    if (len === 0) {
      return x;
    }

    const r = { ...x
    };

    for (let i = 0; i < len; i++) {
      const k = keys[i];
      r[k] = Object.prototype.hasOwnProperty.call(x, k) ? S.combine(x[k], y[k]) : y[k];
    }

    return r;
  });
}
//# sourceMappingURL=operations.mjs.map