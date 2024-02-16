// ets_tracing: off
import * as Tp from "../../Tuple/index.mjs";
import * as Chunk from "../core.mjs";
/**
 * Returns two splits of this chunk at the specified index.
 */

export function splitAt_(self, n) {
  return Tp.tuple(Chunk.take_(self, n), Chunk.drop_(self, n));
}
/**
 * Returns two splits of this chunk at the specified index.
 *
 * @ets_data_first splitAt_
 */

export function splitAt(n) {
  return self => splitAt_(self, n);
}
//# sourceMappingURL=splitAt.mjs.map