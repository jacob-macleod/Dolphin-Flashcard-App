"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emit = emit;
exports.fail = fail;
exports.halt = halt;
exports.more = void 0;
exports.restartable = restartable;

require("../../Operator/index.js");

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var _index5 = /*#__PURE__*/require("../../Function/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function emit(z, leftover) {
  return T.fail(Tp.tuple(E.right(z), leftover));
}

function fail(e, leftover) {
  return T.fail(Tp.tuple(E.left(e), leftover));
}

function halt(c) {
  return T.mapError_(T.halt(c), e => Tp.tuple(E.left(e), A.empty()));
}

const more = T.unit;
/**
 * Decorates a Push with a Effect value that re-initializes it with a fresh state.
 */

exports.more = more;

function restartable(sink) {
  return M.map_(M.bind_(M.bind_(M.bind_(M.do, "switchSink", () => M.switchable()), "initialSink", ({
    switchSink
  }) => T.toManaged(switchSink(sink))), "currSink", ({
    initialSink
  }) => T.toManaged(R.makeRef(initialSink))), ({
    currSink,
    switchSink
  }) => {
    const restart = T.chain_(switchSink(sink), currSink.set);

    const newPush = input => T.chain_(currSink.get, f => f(input));

    return Tp.tuple(newPush, restart);
  });
}
//# sourceMappingURL=index.js.map