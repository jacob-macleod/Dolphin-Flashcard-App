// ets_tracing: off
import * as core from "../../../../Effect/core.mjs";
import * as O from "../../../../Option/index.mjs";
import { append_, empty } from "../core.mjs";

function loop(s, f, builder) {
  return core.chain_(f(s), o => {
    if (O.isSome(o)) {
      return loop(o.value.get(1), f, append_(builder, o.value.get(0)));
    } else {
      return core.succeed(builder);
    }
  });
}
/**
 * Constructs a `Chunk` by repeatedly applying the effectual function `f` as
 * long as it returns `Some`.
 */


export function unfoldEffect(s, f) {
  return loop(s, f, empty());
}
//# sourceMappingURL=unfoldEffect.mjs.map