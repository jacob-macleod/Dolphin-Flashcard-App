import * as SK from "../../Sink/index.mjs";
import * as RunManaged from "./runManaged.mjs";
/**
 * Like `Stream#forEachChunk`, but returns a `Managed` so the finalization order
 * can be controlled.
 */

export function runForEachChunkManaged_(self, f) {
  return RunManaged.runManaged_(self, SK.forEachChunk(f));
}
/**
 * Like `Stream#forEachChunk`, but returns a `Managed` so the finalization order
 * can be controlled.
 */

export function runForEachChunkManaged(f) {
  return self => runForEachChunkManaged_(self, f);
}
//# sourceMappingURL=runForEachChunkManaged.mjs.map