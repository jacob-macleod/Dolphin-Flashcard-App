// ets_tracing: off
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as Ref from "../../../../Ref/index.mjs";
import * as C from "../core.mjs";
import * as ReadWith from "./readWith.mjs";
import * as Unwrap from "./unwrap.mjs";
import * as ZipRight from "./zipRight.mjs";
/**
 * Creates a channel backed by a buffer. When the buffer is empty, the channel will simply
 * passthrough its input as output. However, when the buffer is non-empty, the value inside
 * the buffer will be passed along as output.
 */

export function buffer(empty, isEmpty, ref) {
  return Unwrap.unwrap(Ref.modify_(ref, v => {
    if (isEmpty(v)) {
      return Tp.tuple(ReadWith.readWith(_in => ZipRight.zipRight_(C.write(_in), buffer(empty, isEmpty, ref)), err => C.fail(err), done => C.end(done)), v);
    } else {
      return Tp.tuple(ZipRight.zipRight_(C.write(v), buffer(empty, isEmpty, ref)), empty);
    }
  }));
}
//# sourceMappingURL=buffer.mjs.map