"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._Z0 = exports._Z = exports._R = exports._E0 = exports._E = exports.RightDoneTypeId = exports.RightDone = exports.MergeDecisionTypeId = exports.MergeDecision = exports.LeftDoneTypeId = exports.LeftDone = exports.DoneTypeId = exports.Done = exports.BothRunningTypeId = exports.BothRunning = exports.AwaitTypeId = exports.Await = void 0;
exports.awaitConst = awaitConst;
exports.await_ = await_;
exports.concrete = concrete;
exports.done = done;
const BothRunningTypeId = /*#__PURE__*/Symbol();
exports.BothRunningTypeId = BothRunningTypeId;

class BothRunning {
  constructor(left, right) {
    this.left = left;
    this.right = right;
    this._typeId = BothRunningTypeId;
  }

}

exports.BothRunning = BothRunning;
const LeftDoneTypeId = /*#__PURE__*/Symbol();
exports.LeftDoneTypeId = LeftDoneTypeId;

class LeftDone {
  constructor(f) {
    this.f = f;
    this._typeId = LeftDoneTypeId;
  }

}

exports.LeftDone = LeftDone;
const RightDoneTypeId = /*#__PURE__*/Symbol();
exports.RightDoneTypeId = RightDoneTypeId;

class RightDone {
  constructor(f) {
    this.f = f;
    this._typeId = RightDoneTypeId;
  }

}

exports.RightDone = RightDone;
const _R = "_R";
exports._R = _R;
const _E0 = "_E0";
exports._E0 = _E0;
const _Z0 = "_Z0";
exports._Z0 = _Z0;
const _E = "_E";
exports._E = _E;
const _Z = "_Z";
exports._Z = _Z;
const MergeDecisionTypeId = /*#__PURE__*/Symbol();
exports.MergeDecisionTypeId = MergeDecisionTypeId;

class MergeDecision {
  constructor() {
    this._mergeDecisionTypeId = MergeDecisionTypeId;
  }

}

exports.MergeDecision = MergeDecision;

function concrete(decision) {//
}

const DoneTypeId = /*#__PURE__*/Symbol();
exports.DoneTypeId = DoneTypeId;

class Done extends MergeDecision {
  constructor(io) {
    super();
    this.io = io;
    this._typeId = DoneTypeId;
  }

}

exports.Done = Done;
const AwaitTypeId = /*#__PURE__*/Symbol();
exports.AwaitTypeId = AwaitTypeId;

class Await extends MergeDecision {
  constructor(f) {
    super();
    this.f = f;
    this._typeId = AwaitTypeId;
  }

}

exports.Await = Await;

function done(io) {
  return new Done(io);
}

function await_(f) {
  return new Await(f);
}

function awaitConst(io) {
  return new Await(_ => io);
}
//# sourceMappingURL=mergeHelpers.js.map