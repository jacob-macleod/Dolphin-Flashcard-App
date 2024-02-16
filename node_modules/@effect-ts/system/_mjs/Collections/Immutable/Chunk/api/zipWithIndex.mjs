import { zipWithIndexOffset_ } from "./zipWithIndexOffset.mjs";
/**
 * Zips this chunk with the index of every element, starting from the initial
 * index value.
 */

export function zipWithIndex(self) {
  return zipWithIndexOffset_(self, 0);
}
//# sourceMappingURL=zipWithIndex.mjs.map