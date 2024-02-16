"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IEmpty = exports.IElement = exports.IConcat = void 0;
exports.append = append;
exports.append_ = append_;
exports.concat = concat;
exports.concat_ = concat_;
exports.init = init;
exports.isFreeAssociative = isFreeAssociative;
exports.of = of;
exports.prepend = prepend;
exports.prepend_ = prepend_;
exports.toArray = toArray;

require("../Operator/index.js");

var _index2 = /*#__PURE__*/require("../Stack/index.js");

var St = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Structural/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _a, _b, _c; // ets_tracing: off


const _brand = /*#__PURE__*/Symbol();

function isFreeAssociative(self) {
  return typeof self === "object" && self != null && _brand in self;
}

class IEmpty {
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

exports.IEmpty = IEmpty;

class IElement {
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

exports.IElement = IElement;

class IConcat {
  constructor(left, right) {
    this.left = left;
    this.right = right;
    this._tag = "Concat";
    this[_c] = _brand;
  }

}

exports.IConcat = IConcat;
_c = _brand;

function init() {
  return new IEmpty();
}

function of(a) {
  return new IElement(a);
}

function concat(r) {
  return l => new IConcat(l, r);
}

function concat_(l, r) {
  return new IConcat(l, r);
}

function append(a) {
  return _ => new IConcat(_, new IElement(a));
}

function append_(_, a) {
  return new IConcat(_, new IElement(a));
}

function prepend(a) {
  return _ => new IConcat(new IElement(a), _);
}

function prepend_(_, a) {
  return new IConcat(new IElement(a), _);
}

function toArray(_) {
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
          stack = new _index2.Stack(current.right, p);
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
//# sourceMappingURL=index.js.map