// ets_tracing: off
import * as I from "../../../Iterable/index.mjs";
import * as O from "../../../Option/index.mjs";
import * as MHM from "../HashMap/index.mjs";
export class HashSet {
  constructor() {
    this.hashMap = MHM.make();
  }

  size() {
    return this.hashMap.length.get;
  }

  isEmpty() {
    return this.size() === 0;
  }

  contains(a) {
    return O.getOrElse_(this.hashMap.get(a), () => false);
  }

  add(a) {
    this.hashMap.set(a, true);
    return this.contains(a);
  }

  remove(a) {
    this.hashMap.remove(a);
    return !this.contains(a);
  }

  [Symbol.iterator]() {
    return I.map_(this.hashMap, ([a]) => a)[Symbol.iterator]();
  }

}
/**
 * Creates a new set
 */

export function make() {
  return new HashSet();
}
/**
 * Creates a new set from an Iterable
 */

export function from(xs) {
  const res = make();

  for (const v of xs) {
    res.add(v);
  }

  return res;
}
/**
 * Calculate the number of values in a set
 */

export function size(self) {
  return self.size();
}
/**
 * returns `true` if the set is empty
 */

export function isEmpty(self) {
  return self.isEmpty();
}
/**
 * Creates a new set
 *
 * @ets_data_first contains_
 */

export function contains_(self, a) {
  return self.contains(a);
}
/**
 * return true if the set contains `a`
 *
 * @ets_data_first contains_
 */

export function contains(a) {
  return self => contains_(self, a);
}
/**
 * add `a` to the set
 */

export function add_(self, a) {
  return self.add(a);
}
/**
 * add `a` to the set
 *
 * @ets_data_first add_
 */

export function add(a) {
  return self => add_(self, a);
}
/**
 * remove `a` from the set
 */

export function remove_(self, a) {
  return self.remove(a);
}
/**
 * remove `a` from the set
 *
 * @ets_data_first remove_
 */

export function remove(a) {
  return self => remove_(self, a);
}
//# sourceMappingURL=index.mjs.map