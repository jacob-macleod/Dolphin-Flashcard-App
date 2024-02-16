"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buffer = buffer;
exports.buffer_ = buffer_;

var _index = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Queue/index.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Ref/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

var Take = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Take/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

var _toQueue = /*#__PURE__*/require("./toQueue.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a queue.
 *
 * @note Prefer capacities that are powers of 2 for better performance.
 */
function buffer_(self, capacity) {
  return new _definitions.Stream(M.map_(M.bind_(M.bind_(M.do, "done", () => T.toManaged(Ref.makeRef(false))), "queue", () => (0, _toQueue.toQueue_)(self, capacity)), ({
    done,
    queue
  }) => {
    return T.chain_(done.get, _ => {
      if (_) {
        return Pull.end;
      } else {
        return T.catchSome_(T.chain_(Q.take(queue), _ => Take.done(_)), _ => {
          if (O.isNone(_)) {
            return O.some(T.zipRight_(done.set(true), Pull.end));
          }

          return O.none;
        });
      }
    });
  }));
}
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a queue.
 *
 * @note Prefer capacities that are powers of 2 for better performance.
 */


function buffer(capacity) {
  return self => buffer_(self, capacity);
}
//# sourceMappingURL=buffer.js.map