import * as M from "../_internal/managed.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Executes the provided finalizer after this stream's finalizers run.
 */

export function ensuring_(self, fin) {
  return new Stream(M.ensuring_(self.proc, fin));
}
/**
 * Executes the provided finalizer after this stream's finalizers run.
 */

export function ensuring(fin) {
  return self => ensuring_(self, fin);
}
//# sourceMappingURL=ensuring.mjs.map