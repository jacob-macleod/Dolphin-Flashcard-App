// ets_tracing: off
import * as L from "../../Collections/Immutable/List/index.mjs";
export const AssertionMTypeId = /*#__PURE__*/Symbol();
export class AssertionM {
  constructor(assertion) {
    this.assertion = assertion;
    this._typeId = AssertionMTypeId;
  }

  toString() {
    return this.assertion.toString();
  }

}
export const ValueTypeId = /*#__PURE__*/Symbol();
export class Value {
  constructor(value) {
    this.value = value;
    this._typeId = ValueTypeId;
  }

  toString() {
    return this.value.toString();
  }

}
export const FunctionTypeId = /*#__PURE__*/Symbol();
export class Function_ {
  constructor(name, paramLists) {
    this.name = name;
    this.paramLists = paramLists;
    this._typeId = FunctionTypeId;
  }

  toString() {
    const params = L.join_(L.map_(this.paramLists, l => L.join_(L.map_(l, x => x.toString()), ", ")), ", ");
    return `${this.name}(${params})`;
  }

}
export const InfixTypeId = /*#__PURE__*/Symbol();
export class Infix {
  constructor(left, op, right) {
    this.left = left;
    this.op = op;
    this.right = right;
    this._typeId = InfixTypeId;
  }

  toString() {
    return `(${this.left.toString()} ${this.op} ${this.right.toString()})`;
  }

}
//# sourceMappingURL=definition.mjs.map