"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Promise = void 0;

class Promise {
  constructor(state, blockingOn) {
    this.state = state;
    this.blockingOn = blockingOn;
  }

}

exports.Promise = Promise;
//# sourceMappingURL=promise.js.map