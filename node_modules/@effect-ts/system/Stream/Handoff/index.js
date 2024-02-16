"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.make = make;
exports.offer = offer;
exports.offer_ = offer_;
exports.poll = poll;
exports.take = take;

require("../../Operator/index.js");

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var _index3 = /*#__PURE__*/require("../../Function/index.js");

var _index4 = /*#__PURE__*/require("../../Option/index.js");

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Promise/index.js"));

var _index6 = /*#__PURE__*/require("../../Utils/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class Empty {
  constructor(notifyConsumer) {
    this.notifyConsumer = notifyConsumer;
    this._tag = "Empty";
  }

}

class Full {
  constructor(a, notifyProducer) {
    this.a = a;
    this.notifyProducer = notifyProducer;
    this._tag = "Full";
  }

}
/**
 * A synchronous queue-like abstraction that allows a producer to offer
 * an element and wait for it to be taken, and allows a consumer to wait
 * for an element to be available.
 */


class Handoff {
  constructor(ref) {
    this.ref = ref;
    this._tag = "Handoff";
  }

}

function make() {
  return T.map_(T.chain_(P.make(), p => R.makeRef(new Empty(p))), ref => new Handoff(ref));
}

function offer_(h, a) {
  return T.chain_(P.make(), p => T.flatten(R.modify_(h.ref, (0, _index6.matchTag)({
    Empty: ({
      notifyConsumer
    }) => Tp.tuple(T.zipRight_(P.succeed((0, _index3.constVoid)())(notifyConsumer), P.await(p)), new Full(a, p)),
    Full: s => Tp.tuple(T.chain_(P.await(s.notifyProducer), () => offer_(h, a)), s)
  }))));
}

function offer(a) {
  return h => offer_(h, a);
}

function take(h) {
  return T.chain_(P.make(), p => T.flatten(R.modify_(h.ref, (0, _index6.matchTag)({
    Empty: s => Tp.tuple(T.chain_(P.await(s.notifyConsumer), () => take(h)), s),
    Full: ({
      a,
      notifyProducer
    }) => Tp.tuple(T.as_(P.succeed((0, _index3.constVoid)())(notifyProducer), a), new Empty(p))
  }))));
}

function poll(h) {
  return T.chain_(P.make(), p => T.flatten(R.modify_(h.ref, (0, _index6.matchTag)({
    Empty: s => Tp.tuple(T.succeed(_index4.none), s),
    Full: ({
      a,
      notifyProducer
    }) => Tp.tuple(T.as_(P.succeed((0, _index3.constVoid)())(notifyProducer), (0, _index4.some)(a)), new Empty(p))
  }))));
}
//# sourceMappingURL=index.js.map