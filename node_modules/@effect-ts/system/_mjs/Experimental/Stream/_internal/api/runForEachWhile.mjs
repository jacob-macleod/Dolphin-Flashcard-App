import * as SK from "../../Sink/index.mjs";
import * as Run from "./run.mjs";
/**
 * Consumes elements of the stream, passing them to the specified callback,
 * and terminating consumption when the callback returns `false`.
 */

export function runForEachWhile_(self, f) {
  return Run.run_(self, SK.forEachWhile(f));
}
/**
 * Consumes elements of the stream, passing them to the specified callback,
 * and terminating consumption when the callback returns `false`.
 *
 * @ets_data_first runForEachWhile_
 */

export function runForEachWhile(f) {
  return self => runForEachWhile_(self, f);
}
//# sourceMappingURL=runForEachWhile.mjs.map