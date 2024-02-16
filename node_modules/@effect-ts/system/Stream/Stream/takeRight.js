"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeRight = takeRight;
exports.takeRight_ = takeRight_;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Queue/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var BP = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../BufferedPull/index.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

var _empty = /*#__PURE__*/require("./empty.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Takes the last specified number of elements from this stream.
 */
function takeRight_(self, n) {
  if (n <= 0) {
    return _empty.empty;
  } else {
    return new _definitions.Stream(M.map_(M.bind_(M.bind_(M.bind_(M.do, "pull", () => M.mapM_(self.proc, BP.make)), "queue", () => T.toManaged(Q.makeSliding(n))), "done", () => Ref.makeManagedRef(false)), ({
      done,
      pull,
      queue
    }) => T.chain_(done.get, _ => {
      if (_) {
        return Pull.end;
      } else {
        return T.catchSome_(T.as_(T.tap_(BP.pullElement(pull), x => Q.offer_(queue, x)), A.empty()), O.fold(() => O.some(T.zipRight_(done.set(true), Q.takeAll(queue))), () => O.none));
      }
    })));
  }
}
/**
 * Takes the last specified number of elements from this stream.
 */


function takeRight(n) {
  return self => takeRight_(self, n);
}
//# sourceMappingURL=takeRight.js.map