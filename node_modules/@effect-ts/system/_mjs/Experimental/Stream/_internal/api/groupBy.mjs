import * as GB from "../../GroupBy/index.mjs";
/**
 * More powerful version of `Stream.groupByKey`
 */

export function groupBy_(self, f, buffer = 16) {
  return GB.make_(self, f, buffer);
}
/**
 * More powerful version of `Stream.groupByKey`
 *
 * @ets_data_first groupBy_
 */

export function groupBy(f, buffer = 16) {
  return self => groupBy_(self, f, buffer);
}
//# sourceMappingURL=groupBy.mjs.map