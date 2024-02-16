// ets_tracing: off
import * as Tp from "../../Tuple/index.mjs";
import { append_, empty } from "../core.mjs";
import { forEach_ } from "./forEach.mjs";
/**
 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
 */

export function unzip(as) {
  let fa = empty();
  let fb = empty();
  forEach_(as, ({
    tuple: [a, b]
  }) => {
    fa = append_(fa, a);
    fb = append_(fb, b);
  });
  return Tp.tuple(fa, fb);
}
//# sourceMappingURL=unzip.mjs.map