"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SucceedTypeId = exports.Succeed = exports.RetryTypeId = exports.Retry = exports.FailTypeId = exports.Fail = exports.DieTypeId = exports.Die = void 0;
exports.die = die;
exports.fail = fail;
exports.retry = void 0;
exports.succeed = succeed;
exports.unit = void 0;

require("../../../Operator/index.js");

var St = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Structural/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const FailTypeId = /*#__PURE__*/Symbol();
exports.FailTypeId = FailTypeId;

class Fail {
  constructor(value) {
    this.value = value;
    this._typeId = FailTypeId;
  }

  get [St.hashSym]() {
    return St.hash(this.value);
  }

  [St.equalsSym](that) {
    return that instanceof Fail && St.equals(this.value, that.value);
  }

}

exports.Fail = Fail;
const DieTypeId = /*#__PURE__*/Symbol();
exports.DieTypeId = DieTypeId;

class Die {
  constructor(value) {
    this.value = value;
    this._typeId = DieTypeId;
  }

  get [St.hashSym]() {
    return St.hash(this.value);
  }

  [St.equalsSym](that) {
    return that instanceof Die && St.equals(this.value, that.value);
  }

}

exports.Die = Die;
const SucceedTypeId = /*#__PURE__*/Symbol();
exports.SucceedTypeId = SucceedTypeId;

class Succeed {
  constructor(value) {
    this.value = value;
    this._typeId = SucceedTypeId;
  }

  get [St.hashSym]() {
    return St.hash(this.value);
  }

  [St.equalsSym](that) {
    return that instanceof Succeed && St.equals(this.value, that.value);
  }

}

exports.Succeed = Succeed;
const RetryTypeId = /*#__PURE__*/Symbol();
exports.RetryTypeId = RetryTypeId;

const _retryHash = /*#__PURE__*/St.randomInt();

class Retry {
  constructor() {
    this._typeId = RetryTypeId;
  }

  get [St.hashSym]() {
    return St.opt(_retryHash);
  }

  [St.equalsSym](that) {
    return that instanceof Retry;
  }

}

exports.Retry = Retry;
const unit = /*#__PURE__*/new Succeed(undefined);
exports.unit = unit;

function succeed(a) {
  return new Succeed(a);
}

function fail(e) {
  return new Fail(e);
}

function die(e) {
  return new Die(e);
}

const retry = /*#__PURE__*/new Retry();
exports.retry = retry;
//# sourceMappingURL=index.js.map