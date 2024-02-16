"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pending = exports.Done = void 0;

class Done {
  constructor(value) {
    this.value = value;
    this._tag = "Done";
  }

}

exports.Done = Done;

class Pending {
  constructor(joiners) {
    this.joiners = joiners;
    this._tag = "Pending";
  }

}

exports.Pending = Pending;
//# sourceMappingURL=state.js.map