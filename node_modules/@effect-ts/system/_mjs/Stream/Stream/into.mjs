import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { intoManaged_ } from "./intoManaged.mjs";
/**
 * Enqueues elements of this stream into a queue. Stream failure and ending will also be
 * signalled.
 */

export function into_(self, queue) {
  return M.use_(intoManaged_(self, queue), () => T.unit);
}
/**
 * Enqueues elements of this stream into a queue. Stream failure and ending will also be
 * signalled.
 */

export function into(queue) {
  return self => into_(self, queue);
}
//# sourceMappingURL=into.mjs.map