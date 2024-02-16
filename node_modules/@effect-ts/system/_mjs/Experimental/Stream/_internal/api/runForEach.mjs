import * as SK from "../../Sink/index.mjs";
import * as Run from "./run.mjs";
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 */

export function runForEach_(self, f) {
  return Run.run_(self, SK.forEach(f));
}
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 *
 * @ets_data_first runForEach_
 */

export function runForEach(f) {
  return self => runForEach_(self, f);
}
//# sourceMappingURL=runForEach.mjs.map