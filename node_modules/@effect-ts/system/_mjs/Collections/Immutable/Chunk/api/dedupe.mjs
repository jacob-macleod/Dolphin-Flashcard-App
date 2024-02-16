// ets_tracing: off
import * as St from "../../../../Structural/index.mjs";
import * as Chunk from "../core.mjs";
import * as forEach from "./forEach.mjs";
/**
 * Deduplicates adjacent elements that are identical.
 */

export function dedupe(chunk) {
  const builder = Chunk.builder();
  let lastA = null;
  forEach.forEach_(chunk, a => {
    if (!St.equals(lastA, a)) {
      builder.append(a);
      lastA = a;
    }
  });
  return builder.build();
}
//# sourceMappingURL=dedupe.mjs.map