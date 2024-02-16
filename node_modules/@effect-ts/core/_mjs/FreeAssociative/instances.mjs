// ets_tracing: off
import * as FA from "@effect-ts/system/FreeAssociative";
import { makeAssociative } from "../Associative/index.mjs";
import { makeIdentity } from "../Identity/index.mjs";
export function getAssociative() {
  return makeAssociative(FA.concat_);
}
export function getIdentity() {
  return makeIdentity(FA.init(), FA.concat_);
}
//# sourceMappingURL=instances.mjs.map