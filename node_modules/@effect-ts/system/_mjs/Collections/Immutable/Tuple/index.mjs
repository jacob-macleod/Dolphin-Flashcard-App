// ets_tracing: off
import * as Tp from "../../../Structural/index.mjs";
export const TupleSym = /*#__PURE__*/Symbol.for("@effect-ts/system/Collections/Immutable/Tuple");
export function isTuple(self) {
  return typeof self === "object" && self != null && TupleSym in self;
}
export class Tuple {
  constructor(tuple) {
    this.tuple = tuple;
  }

  [TupleSym]() {
    return TupleSym;
  }

  [Symbol.iterator]() {
    return this.tuple[Symbol.iterator]();
  }

  get [Tp.hashSym]() {
    return Tp.hashArray(this.tuple);
  }

  [Tp.equalsSym](that) {
    if (isTuple(that)) {
      return this.tuple.length === that.tuple.length && this.tuple.every((v, i) => Tp.equals(v, that.tuple[i]));
    }

    return false;
  }

  get(i) {
    return this.tuple[i];
  }

}
/**
 * Creates a new Tuple
 */

export function tuple(...args) {
  return new Tuple(args);
}
/**
 * Gets an element from the tuple
 *
 * @ets_data_first get_
 */

export function get(i) {
  return self => self.get(i);
}
/**
 * Gets an element from the tuple
 */

export function get_(self, i) {
  return self.get(i);
}
/**
 * Converts to native tuple type
 */

export function toNative(self) {
  return self.tuple;
}
/**
 * Converts from native tuple type
 */

export function fromNative(self) {
  return new Tuple(self);
}
/**
 * Replaces the element in position I
 *
 * @ets_data_first update_
 */

export function update(i, f) {
  return self => update_(self, i, f);
}
/**
 * Replaces the element in position I
 */

export function update_(self, i, f) {
  const len = self.tuple.length;
  const r = new Array(len);

  for (let k = 0; k < len; k++) {
    if (k === i) {
      r[k] = f(self.tuple[k]);
    } else {
      r[k] = self.tuple[k];
    }
  }

  return new Tuple(r);
}
/**
 * Appends a value to a tuple
 *
 * @ets_data_first append_
 */

export function append(k) {
  return self => append_(self, k);
}
/**
 * Appends a value to a tuple
 */

export function append_(self, k) {
  return new Tuple([...self.tuple, k]);
}
/**
 * Appends a value to a tuple
 *
 * @ets_data_first prepend_
 */

export function prepend(k) {
  return self => prepend_(self, k);
}
/**
 * Prepends a value to a tuple
 */

export function prepend_(self, k) {
  return new Tuple([k, ...self.tuple]);
}
/**
 * Concat tuples
 *
 * @ets_data_first concat_
 */

export function concat(that) {
  return self => concat_(self, that);
}
/**
 * Concat tuples
 */

export function concat_(self, that) {
  return new Tuple([...self.tuple, ...that.tuple]);
}
//# sourceMappingURL=index.mjs.map