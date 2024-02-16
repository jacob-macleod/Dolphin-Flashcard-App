export const BothRunningTypeId = /*#__PURE__*/Symbol();
export class BothRunning {
  constructor(left, right) {
    this.left = left;
    this.right = right;
    this._typeId = BothRunningTypeId;
  }

}
export const LeftDoneTypeId = /*#__PURE__*/Symbol();
export class LeftDone {
  constructor(f) {
    this.f = f;
    this._typeId = LeftDoneTypeId;
  }

}
export const RightDoneTypeId = /*#__PURE__*/Symbol();
export class RightDone {
  constructor(f) {
    this.f = f;
    this._typeId = RightDoneTypeId;
  }

}
export const _R = "_R";
export const _E0 = "_E0";
export const _Z0 = "_Z0";
export const _E = "_E";
export const _Z = "_Z";
export const MergeDecisionTypeId = /*#__PURE__*/Symbol();
export class MergeDecision {
  constructor() {
    this._mergeDecisionTypeId = MergeDecisionTypeId;
  }

}
export function concrete(decision) {//
}
export const DoneTypeId = /*#__PURE__*/Symbol();
export class Done extends MergeDecision {
  constructor(io) {
    super();
    this.io = io;
    this._typeId = DoneTypeId;
  }

}
export const AwaitTypeId = /*#__PURE__*/Symbol();
export class Await extends MergeDecision {
  constructor(f) {
    super();
    this.f = f;
    this._typeId = AwaitTypeId;
  }

}
export function done(io) {
  return new Done(io);
}
export function await_(f) {
  return new Await(f);
}
export function awaitConst(io) {
  return new Await(_ => io);
}
//# sourceMappingURL=mergeHelpers.mjs.map