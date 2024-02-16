import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { filter } from "./filter.mjs";
/**
 * Partition
 *
 * @ets_data_first partition_
 */

export function partition(predicate) {
  return fa => partition_(fa, predicate);
}
/**
 * Partition
 */

export function partition_(fa, predicate) {
  return Tp.tuple(filter(a => !predicate(a))(fa), filter(predicate)(fa));
}
//# sourceMappingURL=partition.mjs.map