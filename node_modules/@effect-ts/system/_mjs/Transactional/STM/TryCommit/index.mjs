// ets_tracing: off
import "../../../Operator/index.mjs";
export const DoneTypeId = /*#__PURE__*/Symbol();
export class Done {
  constructor(io) {
    this.io = io;
    this._typeId = DoneTypeId;
  }

}
export const SuspendTypeId = /*#__PURE__*/Symbol();
export class Suspend {
  constructor(journal) {
    this.journal = journal;
    this._typeId = SuspendTypeId;
  }

}
//# sourceMappingURL=index.mjs.map