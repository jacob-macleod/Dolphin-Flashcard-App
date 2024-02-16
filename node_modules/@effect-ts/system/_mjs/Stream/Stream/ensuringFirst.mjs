import * as M from "../_internal/managed.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Executes the provided finalizer before this stream's finalizers run.
 */

export function ensuringFirst(fin) {
  return self => ensuringFirst_(self, fin);
}
/**
 * Executes the provided finalizer before this stream's finalizers run.
 */

export function ensuringFirst_(self, fin) {
  return new Stream(M.ensuringFirst_(self.proc, fin));
}
//# sourceMappingURL=ensuringFirst.mjs.map