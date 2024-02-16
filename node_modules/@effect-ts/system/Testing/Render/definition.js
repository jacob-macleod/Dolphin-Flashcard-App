"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValueTypeId = exports.Value = exports.InfixTypeId = exports.Infix = exports.Function_ = exports.FunctionTypeId = exports.AssertionMTypeId = exports.AssertionM = void 0;

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/List/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const AssertionMTypeId = /*#__PURE__*/Symbol();
exports.AssertionMTypeId = AssertionMTypeId;

class AssertionM {
  constructor(assertion) {
    this.assertion = assertion;
    this._typeId = AssertionMTypeId;
  }

  toString() {
    return this.assertion.toString();
  }

}

exports.AssertionM = AssertionM;
const ValueTypeId = /*#__PURE__*/Symbol();
exports.ValueTypeId = ValueTypeId;

class Value {
  constructor(value) {
    this.value = value;
    this._typeId = ValueTypeId;
  }

  toString() {
    return this.value.toString();
  }

}

exports.Value = Value;
const FunctionTypeId = /*#__PURE__*/Symbol();
exports.FunctionTypeId = FunctionTypeId;

class Function_ {
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

exports.Function_ = Function_;
const InfixTypeId = /*#__PURE__*/Symbol();
exports.InfixTypeId = InfixTypeId;

class Infix {
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

exports.Infix = Infix;
//# sourceMappingURL=definition.js.map