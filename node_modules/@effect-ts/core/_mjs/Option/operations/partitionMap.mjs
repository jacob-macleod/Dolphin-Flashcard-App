// ets_tracing: off
import * as O from "@effect-ts/system/Option";
import { separate } from "./separate.mjs";
/**
 * Partition + Map
 *
 * @ets_data_first partitionMap_
 */

export function partitionMap(f) {
  return fa => partitionMap_(fa, f);
}
/**
 * Partition + Map
 */

export function partitionMap_(fa, f) {
  return separate(O.map_(fa, f));
}
//# sourceMappingURL=partitionMap.mjs.map