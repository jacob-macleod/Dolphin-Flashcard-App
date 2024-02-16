// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../../../Effect/index.mjs";
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
export function dropWhileEffect(p) {
  const loop = CH.readWith(in_ => CH.unwrap(T.map_(CK.dropWhileEffect_(in_, p), leftover => {
    const more = CK.isEmpty(leftover);
    return more ? loop : CH.zipRight_(CH.write(leftover), CH.identity());
  })), _ => CH.fail(_), _ => CH.unit);
  return new C.Sink(loop);
}
//# sourceMappingURL=dropWhileEffect.mjs.map