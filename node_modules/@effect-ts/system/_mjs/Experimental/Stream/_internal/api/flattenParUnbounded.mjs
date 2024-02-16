import * as FlattenPar from "./flattenPar.mjs";
/**
 * Like `flattenPar`, but executes all streams concurrently.
 */

export function flattenParUnbounded_(self, outputBuffer = 16) {
  return FlattenPar.flattenPar_(self, Number.MAX_SAFE_INTEGER, outputBuffer);
}
/**
 * Like `flattenPar`, but executes all streams concurrently.
 *
 * @ets_data_first flattenParUnbounded_
 */

export function flattenParUnbounded(outputBuffer = 16) {
  return self => flattenParUnbounded_(self, outputBuffer);
}
//# sourceMappingURL=flattenParUnbounded.mjs.map