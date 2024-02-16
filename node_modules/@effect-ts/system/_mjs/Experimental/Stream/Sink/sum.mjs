import * as FoldLeft from "./foldLeft.mjs";
/**
 * A sink that sums incoming numeric values.
 */

export function sum() {
  return FoldLeft.foldLeft(0, (a, b) => a + b);
}
//# sourceMappingURL=sum.mjs.map