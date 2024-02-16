// ets_tracing: off
import "../../../Operator/index.mjs";
import * as St from "../../../Structural/index.mjs";
export const FailTypeId = /*#__PURE__*/Symbol();
export class Fail {
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
export const DieTypeId = /*#__PURE__*/Symbol();
export class Die {
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
export const SucceedTypeId = /*#__PURE__*/Symbol();
export class Succeed {
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
export const RetryTypeId = /*#__PURE__*/Symbol();

const _retryHash = /*#__PURE__*/St.randomInt();

export class Retry {
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
export const unit = /*#__PURE__*/new Succeed(undefined);
export function succeed(a) {
  return new Succeed(a);
}
export function fail(e) {
  return new Fail(e);
}
export function die(e) {
  return new Die(e);
}
export const retry = /*#__PURE__*/new Retry();
//# sourceMappingURL=index.mjs.map