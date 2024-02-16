import * as FoldLeft from "./foldLeft.mjs";
/**
 * A sink that counts the number of elements fed to it.
 */

export function count() {
  return FoldLeft.foldLeft(0, (s, _) => s + 1);
}
//# sourceMappingURL=count.mjs.map