import * as SK from "../../Sink/index.mjs";
import * as RunManaged from "./runManaged.mjs";
/**
 * Like `Stream#forEachWhile`, but returns a `Managed` so the finalization order
 * can be controlled.
 */

export function runForEachWhileManaged_(self, f) {
  return RunManaged.runManaged_(self, SK.forEachWhile(f));
}
/**
 * Like `Stream#forEachWhile`, but returns a `Managed` so the finalization order
 * can be controlled.
 *
 * @ets_data_first runForEachWhileManaged_
 */

export function runForEachWhileManaged(f) {
  return self => runForEachWhileManaged_(self, f);
}
//# sourceMappingURL=runForEachWhileManaged.mjs.map