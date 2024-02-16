import { append_, empty } from "../core.mjs";
/**
 * Fills a chunk with the result of applying `f` `n` times
 */

export function fill(n, f) {
  if (n <= 0) {
    return empty();
  }

  let builder = empty();

  for (let i = 0; i < n; i++) {
    builder = append_(builder, f(i));
  }

  return builder;
}
//# sourceMappingURL=fill.mjs.map