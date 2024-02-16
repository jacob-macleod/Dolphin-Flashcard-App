// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
export function dropWhile(p) {
  const loop = CH.readWith(in_ => {
    const leftover = CK.dropWhile_(in_, p);
    const more = CK.isEmpty(leftover);
    return more ? loop : CH.zipRight_(CH.write(leftover), CH.identity());
  }, _ => CH.fail(_), _ => CH.unit);
  return new C.Sink(loop);
}
//# sourceMappingURL=dropWhile.mjs.map