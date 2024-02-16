import * as SK from "../../Sink/index.mjs";
import * as Run from "./run.mjs";
/**
 * Runs the stream and collects all of its elements to a chunk.
 */

export function runCollect(self) {
  return Run.run_(self, SK.collectAll());
}
//# sourceMappingURL=runCollect.mjs.map