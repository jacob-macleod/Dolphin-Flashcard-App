import { fold } from "../../Identity/index.mjs";
import { getFirstIdentity } from "./getFirstIdentity.mjs";
export function getFirst(...items) {
  return fold(getFirstIdentity())(items);
}
//# sourceMappingURL=getFirst.mjs.map