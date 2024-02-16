// ets_tracing: off
import * as T from "../../Effect/index.mjs";
import { flow } from "../../Function/index.mjs";
import * as BA from "../BoolAlgebra/index.mjs";
export class BoolAlgebraM {
  constructor(run) {
    this.run = run;
  }

}
T._R, T._E, T._A;
export function and_(self, that) {
  return new BoolAlgebraM(T.zipWith_(self.run, that.run, BA.and_));
}
export function and(that) {
  return self => and_(self, that);
}
export function or_(self, that) {
  return new BoolAlgebraM(T.zipWith_(self.run, that.run, BA.or_));
}
export function or(that) {
  return self => or_(self, that);
}
export function implies_(self, that) {
  return new BoolAlgebraM(T.zipWith_(self.run, that.run, BA.implies_));
}
export function implies(that) {
  return self => implies_(self, that);
}
export function iff_(self, that) {
  return new BoolAlgebraM(T.zipWith_(self.run, that.run, BA.iff_));
}
export function iff(that) {
  return self => iff_(self, that);
}
export function not(self) {
  return new BoolAlgebraM(T.map_(self.run, BA.not));
}
export function as_(self, b) {
  return map_(self, _ => b);
}
export function as(b) {
  return self => as_(self, b);
}
export function chain_(self, f) {
  return new BoolAlgebraM(T.chain_(self.run, BA.chainM(_ => f(_).run)));
}
export function chain(f) {
  return self => chain_(self, f);
}
export function isSuccess(self) {
  return T.map_(self.run, BA.isSuccess);
}
export function map_(self, f) {
  return chain_(self, flow(f, success));
}
export function failure(a) {
  return new BoolAlgebraM(T.succeed(BA.failure(a)));
}
export function fromEffect(effect) {
  return new BoolAlgebraM(T.map_(effect, BA.success));
}
export function success(a) {
  return new BoolAlgebraM(T.succeed(BA.success(a)));
}
//# sourceMappingURL=index.mjs.map