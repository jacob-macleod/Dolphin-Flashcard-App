import { append_, empty } from "../core.mjs";
/**
 * Build a chunk with an integer range with both min/max included
 */

export function range(min, max) {
  let builder = empty();

  for (let i = min; i <= max; i++) {
    builder = append_(builder, i);
  }

  return builder;
}
//# sourceMappingURL=range.mjs.map