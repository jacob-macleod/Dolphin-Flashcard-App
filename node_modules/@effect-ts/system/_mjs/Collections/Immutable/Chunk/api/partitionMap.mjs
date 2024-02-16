import * as Tp from "../../Tuple/index.mjs";
import * as Chunk from "../core.mjs";
import { forEach_ } from "./forEach.mjs";
/**
 * Partitions the elements of this chunk into two chunks using the specified
 * function.
 */

export function partitionMap_(self, f) {
  let bs = Chunk.empty();
  let cs = Chunk.empty();
  forEach_(self, a => {
    const x = f(a);

    if (x._tag === "Left") {
      bs = Chunk.append_(bs, x.left);
    } else {
      cs = Chunk.append_(cs, x.right);
    }
  });
  return Tp.tuple(bs, cs);
}
/**
 * Partitions the elements of this chunk into two chunks using the specified
 * function.
 *
 * @ets_data_first partitionMap_
 */

export function partitionMap(f) {
  return self => partitionMap_(self, f);
}
//# sourceMappingURL=partitionMap.mjs.map