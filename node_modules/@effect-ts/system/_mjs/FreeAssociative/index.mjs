var _a, _b, _c; // ets_tracing: off


import "../Operator/index.mjs";
import { Stack } from "../Stack/index.mjs";
import * as St from "../Structural/index.mjs";

const _brand = /*#__PURE__*/Symbol();

export function isFreeAssociative(self) {
  return typeof self === "object" && self != null && _brand in self;
}
export class IEmpty {
  constructor() {
    this._tag = "Empty";
    this[_a] = _brand;
  }

  get [(_a = _brand, St.hashSym)]() {
    return St.hash(toArray(this));
  }

  [St.equalsSym](that) {
    return isFreeAssociative(that) && St.equals(toArray(this), toArray(that));
  }

}
export class IElement {
  constructor(element) {
    this.element = element;
    this._tag = "Element";
    this[_b] = _brand;
  }

  get [(_b = _brand, St.hashSym)]() {
    return St.hash(toArray(this));
  }

  [St.equalsSym](that) {
    return isFreeAssociative(that) && St.equals(toArray(this), toArray(that));
  }

}
export class IConcat {
  constructor(left, right) {
    this.left = left;
    this.right = right;
    this._tag = "Concat";
    this[_c] = _brand;
  }

}
_c = _brand;
export function init() {
  return new IEmpty();
}
export function of(a) {
  return new IElement(a);
}
export function concat(r) {
  return l => new IConcat(l, r);
}
export function concat_(l, r) {
  return new IConcat(l, r);
}
export function append(a) {
  return _ => new IConcat(_, new IElement(a));
}
export function append_(_, a) {
  return new IConcat(_, new IElement(a));
}
export function prepend(a) {
  return _ => new IConcat(new IElement(a), _);
}
export function prepend_(_, a) {
  return new IConcat(new IElement(a), _);
}
export function toArray(_) {
  const as = [];
  let current = _;
  let stack = undefined;

  while (typeof current !== "undefined") {
    switch (current._tag) {
      case "Empty":
        {
          current = undefined;
          break;
        }

      case "Element":
        {
          as.push(current.element);
          current = undefined;
          break;
        }

      case "Concat":
        {
          const p = stack;
          stack = new Stack(current.right, p);
          current = current.left;
          break;
        }
    }

    if (typeof current === "undefined") {
      if (typeof stack !== "undefined") {
        current = stack.value;
        stack = stack.previous;
      }
    }
  }

  return as;
}
//# sourceMappingURL=index.mjs.map