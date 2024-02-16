// ets_tracing: off
import { instance } from "../Prelude/index.mjs";
/**
 * Creates a new `Identity`
 */

export function makeIdentity(identity, op) {
  return {
    combine: op,
    identity
  };
}
export * from "./definition.mjs";
//# sourceMappingURL=makeIdentity.mjs.map