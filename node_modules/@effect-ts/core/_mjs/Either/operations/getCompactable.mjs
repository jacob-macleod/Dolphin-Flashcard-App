import * as P from "../../Prelude/index.mjs";
import { getCompact } from "./compactOption.mjs";
import { getSeparate } from "./separate.mjs";
/**
 * Get `Compactable` instance given `Identity<E>`
 */

export function getCompactable(M) {
  const C = getCompact(M);
  const S = getSeparate(M);
  return { ...C,
    ...S
  };
}
//# sourceMappingURL=getCompactable.mjs.map