import { fold } from "../../Identity/index.mjs";
import { getLastIdentity } from "./getLastIdentity.mjs";
export function getLast(...items) {
  return fold(getLastIdentity())(items);
}
//# sourceMappingURL=getLast.mjs.map