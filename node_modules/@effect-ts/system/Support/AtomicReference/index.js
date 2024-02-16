"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AtomicReference = void 0;

require("../../Operator/index.js");

// ets_tracing: off
class AtomicReference {
  constructor(initial) {
    this.initial = initial;
    this.current = initial;
  }

  get get() {
    return this.current;
  }

  getAndSet(value) {
    const old = this.current;
    this.set(value);
    return old;
  }

  set(value) {
    this.current = value;
  }

  compareAndSet(old, value) {
    if (this.get === old) {
      this.set(value);
      return true;
    }

    return false;
  }

}

exports.AtomicReference = AtomicReference;
//# sourceMappingURL=index.js.map