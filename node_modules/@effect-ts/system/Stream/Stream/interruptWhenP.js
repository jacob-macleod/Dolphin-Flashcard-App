"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interruptWhenP = interruptWhenP;
exports.interruptWhenP_ = interruptWhenP_;

var _index = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Promise/index.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Stream/Pull/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Interrupts the evaluation of this stream when the provided promise resolves. This
 * combinator will also interrupt any in-progress element being pulled from upstream.
 *
 * If the promise completes with a failure, the stream will emit that failure.
 */
function interruptWhenP_(self, p) {
  return new _definitions.Stream(M.map_(M.let_(M.let_(M.bind_(M.bind_(M.do, "as", () => self.proc), "done", () => Ref.makeManagedRef(false)), "asPull", ({
    done
  }) => T.zipRight_(T.zipRight_(T.asSomeError(P.await(p)), done.set(true)), T.fail(O.none))), "pull", ({
    as,
    asPull,
    done
  }) => T.chain_(T.zipWith_(done.get, P.isDone(p), (a, b) => [a, b]), ([a, b]) => {
    if (a) {
      return Pull.end;
    } else if (b) {
      return asPull;
    } else {
      return T.transplant(graft => T.raceFirst_(graft(as), asPull));
    }
  })), ({
    pull
  }) => pull));
}
/**
 * Interrupts the evaluation of this stream when the provided promise resolves. This
 * combinator will also interrupt any in-progress element being pulled from upstream.
 *
 * If the promise completes with a failure, the stream will emit that failure.
 */


function interruptWhenP(p) {
  return self => interruptWhenP_(self, p);
}
//# sourceMappingURL=interruptWhenP.js.map