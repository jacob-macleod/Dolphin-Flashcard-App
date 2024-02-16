import * as E from "../../../../Either/index.mjs";
import * as Ex from "../../../../Exit/index.mjs";
import * as Q from "../../../../Queue/index.mjs";
import * as C from "../core.mjs";
import * as ZipRight from "./zipRight.mjs";
export function toQueue(queue) {
  return C.readWithCause(in_ => ZipRight.zipRight_(C.fromEffect(Q.offer_(queue, E.right(in_))), toQueue(queue)), cause => C.fromEffect(Q.offer_(queue, E.left(Ex.halt(cause)))), done => C.fromEffect(Q.offer_(queue, E.left(Ex.succeed(done)))));
}
//# sourceMappingURL=toQueue.mjs.map