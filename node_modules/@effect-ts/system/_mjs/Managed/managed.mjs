import { unifyIndex } from "../Utils/index.mjs";
import * as T from "./deps-core.mjs";
export const ManagedURI = "@matechs/core/Eff/ManagedURI";
export class ManagedImpl {
  constructor(effect) {
    this.effect = effect;
  }

}
T._U, T._E, T._A, T._R;
export function managedApply(effect) {
  return new ManagedImpl(effect);
}
//# sourceMappingURL=managed.mjs.map