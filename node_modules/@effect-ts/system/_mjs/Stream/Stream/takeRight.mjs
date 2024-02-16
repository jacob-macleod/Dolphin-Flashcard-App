// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as Q from "../../Queue/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as BP from "../BufferedPull/index.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";
import { empty } from "./empty.mjs";
/**
 * Takes the last specified number of elements from this stream.
 */

export function takeRight_(self, n) {
  if (n <= 0) {
    return empty;
  } else {
    return new Stream(M.map_(M.bind_(M.bind_(M.bind_(M.do, "pull", () => M.mapM_(self.proc, BP.make)), "queue", () => T.toManaged(Q.makeSliding(n))), "done", () => Ref.makeManagedRef(false)), ({
      done,
      pull,
      queue
    }) => T.chain_(done.get, _ => {
      if (_) {
        return Pull.end;
      } else {
        return T.catchSome_(T.as_(T.tap_(BP.pullElement(pull), x => Q.offer_(queue, x)), A.empty()), O.fold(() => O.some(T.zipRight_(done.set(true), Q.takeAll(queue))), () => O.none));
      }
    })));
  }
}
/**
 * Takes the last specified number of elements from this stream.
 */

export function takeRight(n) {
  return self => takeRight_(self, n);
}
//# sourceMappingURL=takeRight.mjs.map