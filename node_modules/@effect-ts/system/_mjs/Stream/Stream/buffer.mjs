// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as Q from "../../Queue/index.mjs";
import * as Ref from "../../Ref/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Pull from "../Pull/index.mjs";
import * as Take from "../Take/index.mjs";
import { Stream } from "./definitions.mjs";
import { toQueue_ } from "./toQueue.mjs";
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a queue.
 *
 * @note Prefer capacities that are powers of 2 for better performance.
 */

export function buffer_(self, capacity) {
  return new Stream(M.map_(M.bind_(M.bind_(M.do, "done", () => T.toManaged(Ref.makeRef(false))), "queue", () => toQueue_(self, capacity)), ({
    done,
    queue
  }) => {
    return T.chain_(done.get, _ => {
      if (_) {
        return Pull.end;
      } else {
        return T.catchSome_(T.chain_(Q.take(queue), _ => Take.done(_)), _ => {
          if (O.isNone(_)) {
            return O.some(T.zipRight_(done.set(true), Pull.end));
          }

          return O.none;
        });
      }
    });
  }));
}
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a queue.
 *
 * @note Prefer capacities that are powers of 2 for better performance.
 */

export function buffer(capacity) {
  return self => buffer_(self, capacity);
}
//# sourceMappingURL=buffer.mjs.map