// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
import { chainF } from "./chain.mjs";
import { succeedF } from "./succeed.mjs";
export function doF(F) {
  return succeedF(F)({});
}
export function bindF(F) {
  return (tag, f) => mk => chainF(F)(k => F.map(a => Object.assign({}, k, {
    [tag]: a
  }))(f(k)))(mk);
}
export function letF(F) {
  return (tag, f) => mk => F.map(k => Object.assign({}, k, {
    [tag]: f(k)
  }))(mk);
}
//# sourceMappingURL=do.mjs.map