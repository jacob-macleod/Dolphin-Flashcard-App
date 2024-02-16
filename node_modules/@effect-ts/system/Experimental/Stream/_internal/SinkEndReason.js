"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpstreamEndTypeId = exports.UpstreamEnd = exports.SinkEndTypeId = exports.SinkEndReasonTypeId = exports.SinkEnd = exports.ScheduleTimeoutTypeId = exports.ScheduleTimeout = exports.ScheduleEndTypeId = exports.ScheduleEnd = void 0;
// ets_tracing: off
const SinkEndReasonTypeId = /*#__PURE__*/Symbol();
exports.SinkEndReasonTypeId = SinkEndReasonTypeId;
const SinkEndTypeId = /*#__PURE__*/Symbol();
exports.SinkEndTypeId = SinkEndTypeId;

class SinkEnd {
  constructor() {
    this._sinkEndReasonTypeId = SinkEndReasonTypeId;
    this._typeId = SinkEndTypeId;
  }

}

exports.SinkEnd = SinkEnd;
const ScheduleTimeoutTypeId = /*#__PURE__*/Symbol();
exports.ScheduleTimeoutTypeId = ScheduleTimeoutTypeId;

class ScheduleTimeout {
  constructor() {
    this._sinkEndReasonTypeId = SinkEndReasonTypeId;
    this._typeId = ScheduleTimeoutTypeId;
  }

}

exports.ScheduleTimeout = ScheduleTimeout;
const ScheduleEndTypeId = /*#__PURE__*/Symbol();
exports.ScheduleEndTypeId = ScheduleEndTypeId;

class ScheduleEnd {
  constructor(c) {
    this.c = c;
    this._sinkEndReasonTypeId = SinkEndReasonTypeId;
    this._typeId = ScheduleEndTypeId;
  }

}

exports.ScheduleEnd = ScheduleEnd;
const UpstreamEndTypeId = /*#__PURE__*/Symbol();
exports.UpstreamEndTypeId = UpstreamEndTypeId;

class UpstreamEnd {
  constructor() {
    this._sinkEndReasonTypeId = SinkEndReasonTypeId;
    this._typeId = UpstreamEndTypeId;
  }

}

exports.UpstreamEnd = UpstreamEnd;
//# sourceMappingURL=SinkEndReason.js.map