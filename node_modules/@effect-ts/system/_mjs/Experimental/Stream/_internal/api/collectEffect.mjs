// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as LoopOnPartialChunksElements from "./loopOnPartialChunksElements.mjs";
/**
 * Performs an effectful filter and map in a single step.
 */

export function collectEffect_(self, pf) {
  return LoopOnPartialChunksElements.loopOnPartialChunksElements_(self, (a, emit) => O.fold_(pf(a), () => T.unit, _ => T.asUnit(T.chain_(_, emit))));
}
/**
 * Performs an effectful filter and map in a single step.
 *
 * @ets_data_first collectEffect_
 */

export function collectEffect(pf) {
  return self => collectEffect_(self, pf);
}
//# sourceMappingURL=collectEffect.mjs.map