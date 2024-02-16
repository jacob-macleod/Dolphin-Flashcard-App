import * as ZipWithPar from "./zipWithPar.mjs";
/**
 * Like `zipPar`, but keeps only the result from this sink.
 */

export function zipParLeft_(self, that) {
  return ZipWithPar.zipWithPar_(self, that, (b, _) => b);
}
/**
 * Like `zipPar`, but keeps only the result from this sink.
 *
 * @ets_data_first zipParLeft_
 */

export function zipParLeft(that) {
  return self => zipParLeft_(self, that);
}
//# sourceMappingURL=zipParLeft.mjs.map