// ets_tracing: off
export const SinkEndReasonTypeId = /*#__PURE__*/Symbol();
export const SinkEndTypeId = /*#__PURE__*/Symbol();
export class SinkEnd {
  constructor() {
    this._sinkEndReasonTypeId = SinkEndReasonTypeId;
    this._typeId = SinkEndTypeId;
  }

}
export const ScheduleTimeoutTypeId = /*#__PURE__*/Symbol();
export class ScheduleTimeout {
  constructor() {
    this._sinkEndReasonTypeId = SinkEndReasonTypeId;
    this._typeId = ScheduleTimeoutTypeId;
  }

}
export const ScheduleEndTypeId = /*#__PURE__*/Symbol();
export class ScheduleEnd {
  constructor(c) {
    this.c = c;
    this._sinkEndReasonTypeId = SinkEndReasonTypeId;
    this._typeId = ScheduleEndTypeId;
  }

}
export const UpstreamEndTypeId = /*#__PURE__*/Symbol();
export class UpstreamEnd {
  constructor() {
    this._sinkEndReasonTypeId = SinkEndReasonTypeId;
    this._typeId = UpstreamEndTypeId;
  }

}
//# sourceMappingURL=SinkEndReason.mjs.map