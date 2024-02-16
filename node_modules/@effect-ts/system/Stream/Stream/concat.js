"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concat = concat;
exports.concat_ = concat_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Cause/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Ref/index.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Stream/Pull/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Concatenates the specified stream with this stream, resulting in a stream
 * that emits the elements from this stream and then the elements from the specified stream.
 */
function concat_(self, that) {
  return new _definitions.Stream(M.map_(M.let_(M.tap_(M.bind_(M.bind_(M.bind_(M.do, "currStream", () => T.toManaged(Ref.makeRef(Pull.end))), "switchStream", () => M.switchable()), "switched", () => T.toManaged(Ref.makeRef(false))), ({
    currStream,
    switchStream
  }) => T.toManaged(T.chain_(switchStream(self.proc), currStream.set))), "pull", ({
    currStream,
    switchStream,
    switched
  }) => {
    const go = T.catchAllCause_(T.flatten(currStream.get), _ => O.fold_(C.sequenceCauseOption(_), () => T.chain_(Ref.getAndSet_(switched, true), _ => {
      if (_) {
        return Pull.end;
      } else {
        return T.zipRight_(T.chain_(switchStream(that.proc), currStream.set), go);
      }
    }), e => Pull.halt(e)));
    return go;
  }), ({
    pull
  }) => pull));
}
/**
 * Concatenates the specified stream with this stream, resulting in a stream
 * that emits the elements from this stream and then the elements from the specified stream.
 */


function concat(that) {
  return self => concat_(self, that);
}
//# sourceMappingURL=concat.js.map