"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuspendTypeId = exports.Suspend = exports.DoneTypeId = exports.Done = void 0;

require("../../../Operator/index.js");

// ets_tracing: off
const DoneTypeId = /*#__PURE__*/Symbol();
exports.DoneTypeId = DoneTypeId;

class Done {
  constructor(io) {
    this.io = io;
    this._typeId = DoneTypeId;
  }

}

exports.Done = Done;
const SuspendTypeId = /*#__PURE__*/Symbol();
exports.SuspendTypeId = SuspendTypeId;

class Suspend {
  constructor(journal) {
    this.journal = journal;
    this._typeId = SuspendTypeId;
  }

}

exports.Suspend = Suspend;
//# sourceMappingURL=index.js.map