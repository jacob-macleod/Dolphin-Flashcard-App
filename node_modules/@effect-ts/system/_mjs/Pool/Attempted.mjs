// ets_tracing: off
import * as T from "../Effect/index.mjs";
import * as Ex from "../Exit/index.mjs";
export class Attempted {
  constructor(result, finalizer) {
    this.result = result;
    this.finalizer = finalizer;
  }

}
T._E, T._A;
export function isFailure(self) {
  return self.result._tag === "Failure";
}
export function forEachUnit_(self, f) {
  return Ex.foldM_(self.result, _ => T.unit, a => f(a));
}
export function forEachUnit(f) {
  return self => forEachUnit_(self, f);
}
export function toManaged(self) {
  return T.toManaged(T.done(self.result));
}
//# sourceMappingURL=Attempted.mjs.map