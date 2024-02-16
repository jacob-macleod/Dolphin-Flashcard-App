import * as P from "../../Prelude/index.mjs";
import { getSeparateF } from "./separate.mjs";
/**
 * Get `Wiltable` instance given `Identity<E>`
 */

export function getWiltable(M) {
  const separateF = getSeparateF(M);
  return {
    separateF
  };
}
//# sourceMappingURL=getWiltable.mjs.map