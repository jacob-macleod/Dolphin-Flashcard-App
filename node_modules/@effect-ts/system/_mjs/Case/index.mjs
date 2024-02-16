// ets_tracing: off
import * as St from "../Structural/index.mjs";
export const CaseBrand = /*#__PURE__*/Symbol();
export function hasCaseBrand(self) {
  return typeof self === "object" && self != null && CaseBrand in self;
}
const h0 = /*#__PURE__*/St.hashString("@effect-ts/system/Case");
export const caseArgs = /*#__PURE__*/Symbol();
export const caseKeys = /*#__PURE__*/Symbol(); // @ts-expect-error

export const Case = class {
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
export function TaggedADT() {
  // @ts-expect-error
  return Tagged;
}
export function Tagged(tag, key) {
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
//# sourceMappingURL=index.mjs.map