// ets_tracing: off
import * as E from "../../../../Either/index.mjs";
import * as Ex from "../../../../Exit/index.mjs";
import * as Q from "../../../../Queue/index.mjs";
import * as C from "../core.mjs";
import * as ZipRight from "./zipRight.mjs";
export function fromQueue(queue) {
  return C.chain_(C.fromEffect(Q.take(queue)), E.fold(Ex.fold(cause => C.failCause(cause), done => C.end(done)), elem => ZipRight.zipRight_(C.write(elem), fromQueue(queue))));
}
//# sourceMappingURL=fromQueue.mjs.map