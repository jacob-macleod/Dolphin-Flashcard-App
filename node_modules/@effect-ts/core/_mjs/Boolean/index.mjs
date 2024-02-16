// ets_tracing: off
import "../Operator/index.mjs";
import * as C from "../Closure/index.mjs";
import * as Eq from "../Equal/index.mjs";
import * as I from "../Identity/index.mjs";
import { And, BooleanProd, BooleanSum, Or } from "../Newtype/index.mjs";
export const ConjunctionClosure = /*#__PURE__*/C.makeClosure((l, r) => l && r);
export const DisjunctionClosure = /*#__PURE__*/C.makeClosure((l, r) => l || r);
export const ProdClosure = /*#__PURE__*/C.makeClosure((l, r) => l && r);
export const SumClosure = /*#__PURE__*/C.makeClosure((l, r) => l || r);
export const ConjunctionIdentity = /*#__PURE__*/I.makeIdentity(true, ConjunctionClosure.combine);
export const DisjunctionIdentity = /*#__PURE__*/I.makeIdentity(false, DisjunctionClosure.combine);
export const ProdIdentity = /*#__PURE__*/I.makeIdentity(false, ProdClosure.combine);
export const SumIdentity = /*#__PURE__*/I.makeIdentity(false, SumClosure.combine);
export const Equal = /*#__PURE__*/Eq.strict();
export function fold(onFalse, onTrue) {
  return value => value ? onTrue() : onFalse();
}
export function not(a) {
  return !a;
}
export function invert(b) {
  return !b;
}
export function and_(x, y) {
  return x && y;
}
export function and(y) {
  return x => x && y;
}
export function or_(x, y) {
  return x || y;
}
export function or(y) {
  return x => x || y;
}
export function xor_(x, y) {
  return x && !y || !x && y;
}
export function xor(y) {
  return x => x && !y || !x && y;
}
export function allPass_(a, ps) {
  return ps.every(f => f(a));
}
export function allPass(ps) {
  return a => ps.every(f => f(a));
}
export function anyPass_(a, ps) {
  return ps.some(f => f(a));
}
export function anyPass(ps) {
  return a => ps.some(f => f(a));
}
export function andPass_(f, g) {
  return a => and_(f(a), g(a));
}
export function andPass(g) {
  return f => andPass_(f, g);
}
export function orPass_(f, g) {
  return a => or_(f(a), g(a));
}
export function orPass(g) {
  return f => orPass_(f, g);
}
//# sourceMappingURL=index.mjs.map