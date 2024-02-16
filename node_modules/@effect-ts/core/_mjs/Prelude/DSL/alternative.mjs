// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
export function orElseF(F) {
  return fb => fa => F.map(e => e._tag === "Left" ? e.left : e.right)(F.orElseEither(fb)(fa));
}
//# sourceMappingURL=alternative.mjs.map