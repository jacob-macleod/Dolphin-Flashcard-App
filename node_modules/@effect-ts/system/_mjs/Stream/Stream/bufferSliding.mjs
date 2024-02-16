import { pipe } from "../../Function/index.mjs";
import * as Q from "../../Queue/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { bufferSignal } from "./_internal/bufferSignal.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` elements in a sliding queue.
 *
 * @note Prefer capacities that are powers of 2 for better performance.
 */

export function bufferSliding_(self, capacity) {
  return new Stream(M.chain_(M.bind_(M.do, "queue", () => T.toManagedRelease_(Q.makeSliding(capacity), Q.shutdown)), ({
    queue
  }) => bufferSignal(self, queue)));
}
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` elements in a sliding queue.
 *
 * @note Prefer capacities that are powers of 2 for better performance.
 */

export function bufferSliding(capacity) {
  return self => bufferSliding_(self, capacity);
}
//# sourceMappingURL=bufferSliding.mjs.map