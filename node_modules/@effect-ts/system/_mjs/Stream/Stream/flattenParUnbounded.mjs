import { flattenPar_ } from "./flattenPar.mjs";
/**
 * Like `flattenPar`, but executes all streams concurrently.
 */

export function flattenParUnbounded(self, outputBuffer = 16) {
  return flattenPar_(self, Number.MAX_SAFE_INTEGER, outputBuffer);
}
//# sourceMappingURL=flattenParUnbounded.mjs.map