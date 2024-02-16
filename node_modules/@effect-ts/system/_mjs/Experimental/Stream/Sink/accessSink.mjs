// ets_tracing: off
import * as T from "../../../Effect/index.mjs";
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
export function accessSink(f) {
  return new C.Sink(CH.unwrap(T.access(_ => f(_).channel)));
}
//# sourceMappingURL=accessSink.mjs.map