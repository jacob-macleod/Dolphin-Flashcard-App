import * as ZipWithPar from "./zipWithPar.mjs";
/**
 * Like `zipPar`, but keeps only the result from `that` sink.
 */

export function zipParRight_(self, that) {
  return ZipWithPar.zipWithPar_(self, that, (_, c) => c);
}
/**
 * Like `zipPar`, but keeps only the result from `that` sink.
 *
 * @ets_data_first zipParRight_
 */

export function zipParRight(that) {
  return self => zipParRight_(self, that);
}
//# sourceMappingURL=zipParRight.mjs.map