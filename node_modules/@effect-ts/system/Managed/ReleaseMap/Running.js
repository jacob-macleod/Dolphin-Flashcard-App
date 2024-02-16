"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Running = void 0;

class Running {
  constructor(nextKey, _finalizers) {
    this.nextKey = nextKey;
    this._finalizers = _finalizers;
    this._tag = "Running";
  }

  finalizers() {
    return this._finalizers;
  }

}

exports.Running = Running;
//# sourceMappingURL=Running.js.map