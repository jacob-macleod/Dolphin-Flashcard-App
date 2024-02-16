import * as SK from "../../Sink/index.mjs";
import * as RunManaged from "./runManaged.mjs";
/**
 * Like `Stream#forEach`, but returns a `Managed` so the finalization order
 * can be controlled.
 */

export function runForEachManaged_(self, f) {
  return RunManaged.runManaged_(self, SK.forEach(f));
}
/**
 * Like `Stream#forEach`, but returns a `Managed` so the finalization order
 * can be controlled.
 *
 * @ets_data_first runForEachManaged_
 */

export function runForEachManaged(f) {
  return self => runForEachManaged_(self, f);
}
//# sourceMappingURL=runForEachManaged.mjs.map