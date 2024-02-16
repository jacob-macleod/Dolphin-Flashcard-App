// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as ScanEffect from "./scanEffect.mjs";
/**
 * Statefully maps over the elements of this stream to produce all intermediate results
 * of type `S` given an initial S.
 */

export function scan_(self, s, f) {
  return ScanEffect.scanEffect_(self, s, (s, a) => T.succeed(f(s, a)));
}
/**
 * Statefully maps over the elements of this stream to produce all intermediate results
 * of type `S` given an initial S.
 *
 * @ets_data_first scan_
 */

export function scan(s, f) {
  return self => scan_(self, s, f);
}
//# sourceMappingURL=scan.mjs.map