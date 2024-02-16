"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateTypeId = exports.HandoffSignalTypeId = exports.Handoff = exports.HaltTypeId = exports.Halt = exports.FullTypeId = exports.Full = exports.EndTypeId = exports.End = exports.EmptyTypeId = exports.Empty = exports.EmitTypeId = exports.Emit = void 0;
exports.make = make;
exports.offer = offer;
exports.poll = poll;
exports.take = take;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Effect/index.js"));

var _index3 = /*#__PURE__*/require("../../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Option/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Promise/index.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Ref/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Handoff {
  constructor(ref) {
    this.ref = ref;
  }

}

exports.Handoff = Handoff;

function make() {
  return T.map_(T.chain_(P.make(), p => Ref.makeRef(new Empty(p))), _ => new Handoff(_));
}

const StateTypeId = /*#__PURE__*/Symbol();
exports.StateTypeId = StateTypeId;
const EmptyTypeId = /*#__PURE__*/Symbol();
exports.EmptyTypeId = EmptyTypeId;

class Empty {
  constructor(notifyConsumer) {
    this.notifyConsumer = notifyConsumer;
    this._stateTypeId = StateTypeId;
    this._typeId = EmptyTypeId;
  }

}

exports.Empty = Empty;
const FullTypeId = /*#__PURE__*/Symbol();
exports.FullTypeId = FullTypeId;

class Full {
  constructor(a, notifyConsumer) {
    this.a = a;
    this.notifyConsumer = notifyConsumer;
    this._stateTypeId = StateTypeId;
    this._typeId = FullTypeId;
  }

}

exports.Full = Full;

function offer(handoff, a) {
  return T.chain_(P.make(), p => {
    return T.flatten(Ref.modify_(handoff.ref, s => {
      if (s._typeId === FullTypeId) {
        return Tp.tuple(T.zipRight_(P.await(s.notifyConsumer), offer(handoff, a)), s);
      } else {
        return Tp.tuple(T.zipRight_(P.succeed_(s.notifyConsumer, undefined), P.await(p)), new Full(a, p));
      }
    }));
  });
}

function take(handoff) {
  return T.chain_(P.make(), p => {
    return T.flatten(Ref.modify_(handoff.ref, s => {
      if (s._typeId === FullTypeId) {
        return Tp.tuple(T.as_(P.succeed_(s.notifyConsumer, undefined), s.a), new Empty(p));
      } else {
        return Tp.tuple(T.zipRight_(P.await(s.notifyConsumer), take(handoff)), s);
      }
    }));
  });
}

function poll(handoff) {
  return T.chain_(P.make(), p => {
    return T.flatten(Ref.modify_(handoff.ref, s => {
      if (s._typeId === FullTypeId) {
        return Tp.tuple(T.as_(P.succeed_(s.notifyConsumer, undefined), O.some(s.a)), new Empty(p));
      } else {
        return Tp.tuple(T.succeed(O.none), s);
      }
    }));
  });
}

const HandoffSignalTypeId = /*#__PURE__*/Symbol();
exports.HandoffSignalTypeId = HandoffSignalTypeId;
const EmitTypeId = /*#__PURE__*/Symbol();
exports.EmitTypeId = EmitTypeId;

class Emit {
  constructor(els) {
    this.els = els;
    this._handoffSignalTypeId = HandoffSignalTypeId;
    this._typeId = EmitTypeId;
  }

}

exports.Emit = Emit;
const HaltTypeId = /*#__PURE__*/Symbol();
exports.HaltTypeId = HaltTypeId;

class Halt {
  constructor(error) {
    this.error = error;
    this._handoffSignalTypeId = HandoffSignalTypeId;
    this._typeId = HaltTypeId;
  }

}

exports.Halt = Halt;
const EndTypeId = /*#__PURE__*/Symbol();
exports.EndTypeId = EndTypeId;

class End {
  constructor(reason) {
    this.reason = reason;
    this._handoffSignalTypeId = HandoffSignalTypeId;
    this._typeId = EndTypeId;
  }

}

exports.End = End;
//# sourceMappingURL=Handoff.js.map