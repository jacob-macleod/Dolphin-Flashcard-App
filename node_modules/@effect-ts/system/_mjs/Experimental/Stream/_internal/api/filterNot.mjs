import * as Filter from "./filter.mjs";
export function filterNot_(self, pred) {
  return Filter.filter_(self, a => !pred(a));
}
export function filterNot(pred) {
  return self => filterNot_(self, pred);
}
//# sourceMappingURL=filterNot.mjs.map