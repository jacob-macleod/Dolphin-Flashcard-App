"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AtomicNumber = void 0;

require("../../Operator/index.js");

var _index2 = /*#__PURE__*/require("../AtomicReference/index.js");

// ets_tracing: off
class AtomicNumber extends _index2.AtomicReference {
  constructor(n) {
    super(n);
    this.incrementAndGet = this.incrementAndGet.bind(this);
    this.decrementAndGet = this.decrementAndGet.bind(this);
  }

  incrementAndGet() {
    this.set(this.get + 1);
    return this.get;
  }

  decrementAndGet() {
    this.set(this.get - 1);
    return this.get;
  }

  getAndIncrement() {
    const ret = this.get;
    this.set(this.get + 1);
    return ret;
  }

}

exports.AtomicNumber = AtomicNumber;
//# sourceMappingURL=index.js.map