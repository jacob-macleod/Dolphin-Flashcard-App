import * as AccessEffect from "./accessEffect.mjs";
export function accessServiceEffect(s) {
  return f => AccessEffect.accessEffect(r => f(r[s.key]));
}
//# sourceMappingURL=accessServiceEffect.mjs.map