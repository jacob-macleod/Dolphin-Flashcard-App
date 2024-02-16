// ets_tracing: off

/* adapted from https://github.com/gcanti/fp-ts */
import "../Operator/index.mjs";
import * as Tp from "@effect-ts/system/Collections/Immutable/Tuple";
import { structF, tupleF } from "../Prelude/DSL/index.mjs";
import * as P from "../Prelude/index.mjs";
/**
 * @ets_optimize identity
 */

export function alt_(fx, _fy) {
  return fx;
}
/**
 * @ets_data_first alt_
 */

export function alt(that) {
  return fa => alt_(fa, that);
}
export function ap_(fab, fa) {
  return fab(fa);
}
/**
 * @ets_data_first ap_
 */

export function ap(fa) {
  return fab => ap_(fab, fa);
}
export function apFirst(_fb) {
  return fa => fa;
}
export function apSecond(fb) {
  return _fa => fb;
}
export function chain_(fa, f) {
  return f(fa);
}
/**
 * @ets_data_first chain_
 */

export function chain(f) {
  return ma => f(ma);
}
/**
 * @ets_data_first tap_
 */

export function tap(f) {
  return ma => chain_(ma, x => map_(f(x), () => x));
}
export function tap_(ma, f) {
  return chain_(ma, x => map_(f(x), () => x));
}
/**
 * @ets_optimize identity
 */

export function duplicate(ma) {
  return ma;
}
export function extend_(wa, f) {
  return f(wa);
}
/**
 * @ets_data_first extend_
 */

export function extend(f) {
  return ma => f(ma);
}
/**
 * @ets_optimize identity
 */

export function extract(wa) {
  return wa;
}
/**
 * @ets_optimize identity
 */

export function flatten(wa) {
  return wa;
}
export function foldMap_(M) {
  return (fa, f) => f(fa);
}
export function foldMap(M) {
  return f => fa => foldMap_(M)(fa, f);
}
/**
 * @ets_optimize identity
 */

export function getEq(E) {
  return E;
}
/**
 * @ets_optimize identity
 */

export function getShow(E) {
  return E;
}
export function map_(fa, f) {
  return f(fa);
}
/**
 * @ets_data_first map_
 */

export function map(f) {
  return fa => map_(fa, f);
}
export function reduce_(fa, b, f) {
  return f(b, fa);
}
/**
 * @ets_data_first reduce_
 */

export function reduce(b, f) {
  return fa => reduce_(fa, b, f);
}
export function reduceRight_(fa, b, f) {
  return f(fa, b);
}
/**
 * @ets_data_first reduceRight_
 */

export function reduceRight(b, f) {
  return fa => reduceRight_(fa, b, f);
}
export const Any = {
  any: () => ({})
};
export const Covariant = {
  map
};
export const AssociativeBoth = {
  both: b => a => Tp.tuple(a, b)
};
export const AssociativeFlatten = {
  flatten: a => a
};
export const IdentityBoth = { ...Any,
  ...AssociativeBoth
};
export const IdentityFlatten = { ...Any,
  ...AssociativeFlatten
};
export const Applicative = { ...Covariant,
  ...IdentityBoth
};
export const Monad = { ...Covariant,
  ...IdentityFlatten
};
export const Reduce = {
  reduce
};
export const ReduceRight = {
  reduceRight
};
export const FoldMap = {
  foldMap
};
export const Foldable = { ...Reduce,
  ...ReduceRight,
  ...FoldMap
};
export const ForEach = { ...Covariant,
  forEachF: () => f => f
};
export const struct = /*#__PURE__*/structF(Applicative);
export const tuple = /*#__PURE__*/tupleF(Applicative);
//# sourceMappingURL=index.mjs.map