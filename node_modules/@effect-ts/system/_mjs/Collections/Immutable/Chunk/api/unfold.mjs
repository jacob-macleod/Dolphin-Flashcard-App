// ets_tracing: off
import * as O from "../../../../Option/index.mjs";
import { append_, empty } from "../core.mjs";
/**
 * Constructs a `Chunk` by repeatedly applying the function `f` as long as it
 * returns `Some`.
 */

export function unfold(s, f) {
  let builder = empty();
  let cont = true;
  let s1 = s;

  while (cont) {
    const x = f(s1);

    if (O.isSome(x)) {
      s1 = x[1];
      builder = append_(builder, x[0]);
    } else {
      cont = false;
    }
  }

  return builder;
}
//# sourceMappingURL=unfold.mjs.map