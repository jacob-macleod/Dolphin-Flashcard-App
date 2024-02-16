import * as OrDieWith from "./orDieWith.mjs";
export function orDie_(self, err) {
  return OrDieWith.orDieWith_(self, _ => err);
}
/**
 * @ets_data_first orDie_
 */

export function orDie(err) {
  return self => orDie_(self, err);
}
//# sourceMappingURL=orDie.mjs.map