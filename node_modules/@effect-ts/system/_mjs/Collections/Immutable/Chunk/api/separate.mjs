import { identity } from "../../../../Function/index.mjs";
import { partitionMap_ } from "./partitionMap.mjs";
/**
 * Partitions the elements of this chunk into two chunks
 */

export function separate(self) {
  return partitionMap_(self, identity);
}
//# sourceMappingURL=separate.mjs.map