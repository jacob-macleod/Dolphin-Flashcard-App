"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaseBrand = exports.Case = void 0;
exports.Tagged = Tagged;
exports.TaggedADT = TaggedADT;
exports.caseKeys = exports.caseArgs = void 0;
exports.hasCaseBrand = hasCaseBrand;

var St = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Structural/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const CaseBrand = /*#__PURE__*/Symbol();
exports.CaseBrand = CaseBrand;

function hasCaseBrand(self) {
  return typeof self === "object" && self != null && CaseBrand in self;
}

const h0 = /*#__PURE__*/St.hashString("@effect-ts/system/Case");
const caseArgs = /*#__PURE__*/Symbol();
exports.caseArgs = caseArgs;
const caseKeys = /*#__PURE__*/Symbol(); // @ts-expect-error

exports.caseKeys = caseKeys;
const Case = class {
  constructor(args) {
    this[caseArgs] = args;

    if (typeof args === "object" && args != null) {
      const keys = Object.keys(args);

      for (let i = 0; i < keys.length; i++) {
        this[keys[i]] = args[keys[i]];
      }
    }

    this[caseKeys] = Object.keys(this).sort();
  }

  static make(args) {
    return new this(args);
  }

  copy(args) {
    // @ts-expect-error
    return new this.constructor({ ...this[caseArgs],
      ...args
    });
  }

  get [CaseBrand]() {
    return this[caseKeys];
  }

  get [St.hashSym]() {
    let h = h0;

    for (const k of this[caseKeys]) {
      h = St.combineHash(h, St.hash(this[k]));
    }

    return h;
  }

  [St.equalsSym](that) {
    if (this === that) {
      return true;
    }

    if (that instanceof this.constructor) {
      const kthat = that[CaseBrand];
      const len = kthat.length;

      if (len !== this[caseKeys].length) {
        return false;
      }

      let eq = true;
      let i = 0;

      while (eq && i < len) {
        eq = this[caseKeys][i] === kthat[i] && St.equals(this[this[caseKeys][i]], that[kthat[i]]);
        i++;
      }

      return eq;
    }

    return false;
  }

};
exports.Case = Case;

function TaggedADT() {
  // @ts-expect-error
  return Tagged;
}

function Tagged(tag, key) {
  var _a;

  if (key) {
    class X extends Case {
      constructor() {
        super(...arguments); // @ts-expect-error

        this[_a] = tag;
      }

    }

    _a = key;
    X._tag = tag; // @ts-expect-error

    return X;
  }

  class X extends Case {
    constructor() {
      super(...arguments);
      this._tag = tag;
    }

  }

  X._tag = tag; // @ts-expect-error

  return X;
}
//# sourceMappingURL=index.js.map