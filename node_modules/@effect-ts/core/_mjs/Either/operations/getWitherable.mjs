import * as P from "../../Prelude/index.mjs";
import { getCompactF } from "./compactOption.mjs";
/**
 * Get `Witherable` instance given `Identity<E>`
 */

export function getWitherable(M) {
  const compactF = getCompactF(M);
  return {
    compactF
  };
}
//# sourceMappingURL=getWitherable.mjs.map