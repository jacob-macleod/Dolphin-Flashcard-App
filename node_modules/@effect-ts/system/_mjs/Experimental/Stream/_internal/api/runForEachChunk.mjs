import * as SK from "../../Sink/index.mjs";
import * as Run from "./run.mjs";
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 */

export function runForEachChunk_(self, f) {
  return Run.run_(self, SK.forEachChunk(f));
}
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 *
 * @ets_data_first runForEachChunk_
 */

export function runForEachChunk(f) {
  return self => runForEachChunk_(self, f);
}
//# sourceMappingURL=runForEachChunk.mjs.map