// ets_tracing: off
import * as core from "../core.mjs";
import * as forEach from "./forEach.mjs";
/**
 * Groups elements in chunks of up to n elements
 */

export function grouped_(self, n) {
  let gr = core.empty();
  let current = core.empty();
  forEach.forEach_(self, a => {
    current = core.append_(current, a);

    if (core.size(current) >= n) {
      gr = core.append_(gr, current);
      current = core.empty();
    }
  });

  if (core.size(current) > 0) {
    gr = core.append_(gr, current);
  }

  return gr;
}
/**
 * Groups elements in chunks of up to n elements
 *
 * @ets_data_first grouped_
 */

export function grouped(n) {
  return self => grouped_(self, n);
}
//# sourceMappingURL=grouped.mjs.map