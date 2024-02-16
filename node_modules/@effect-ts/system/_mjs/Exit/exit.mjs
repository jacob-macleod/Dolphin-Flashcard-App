import * as St from "../Structural/index.mjs";
export class Success {
  constructor(value) {
    this.value = value;
    this._tag = "Success";
  }

  get [St.hashSym]() {
    return St.hash(this.value);
  }

  [St.equalsSym](that) {
    return that instanceof Success && St.equals(this.value, that.value);
  }

}
export class Failure {
  constructor(cause) {
    this.cause = cause;
    this._tag = "Failure";
  }

  get [St.hashSym]() {
    return St.hash(this.cause);
  }

  [St.equalsSym](that) {
    return that instanceof Failure && St.equals(this.cause, that.cause);
  }

}
//# sourceMappingURL=exit.mjs.map