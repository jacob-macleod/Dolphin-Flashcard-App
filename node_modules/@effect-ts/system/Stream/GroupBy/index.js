"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupBy = void 0;
exports.filter = filter;
exports.filter_ = filter_;
exports.first = first;
exports.first_ = first_;

require("../../Operator/index.js");

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Queue/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var _chainPar = /*#__PURE__*/require("../Stream/chainPar.js");

var _filterM = /*#__PURE__*/require("../Stream/filterM.js");

var _flattenExitOption = /*#__PURE__*/require("../Stream/flattenExitOption.js");

var _fromQueueWithShutdown = /*#__PURE__*/require("../Stream/fromQueueWithShutdown.js");

var _map = /*#__PURE__*/require("../Stream/map.js");

var _zipWithIndex = /*#__PURE__*/require("../Stream/zipWithIndex.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Representation of a grouped stream.
 * This allows to filter which groups will be processed.
 * Once merge is used all groups will be processed in parallel and the results will
 * be merged in arbitrary order.
 */
class GroupBy {
  constructor(grouped, buffer) {
    this.grouped = grouped;
    this.buffer = buffer;
    this.merge = this.merge.bind(this);
  }

  merge(f) {
    return (0, _chainPar.chainPar)(Number.MAX_SAFE_INTEGER, this.buffer)(({
      tuple: [k, q]
    }) => f(k, (0, _flattenExitOption.flattenExitOption)((0, _fromQueueWithShutdown.fromQueueWithShutdown)(q))))(this.grouped);
  }

}
/**
 * Only consider the first n groups found in the stream.
 */


exports.GroupBy = GroupBy;

function first_(self, n) {
  const g1 = (0, _map.map)(_ => _.get(0))((0, _filterM.filterM)(elem => {
    const {
      tuple: [{
        tuple: [, q]
      }, i]
    } = elem;

    if (i < n) {
      return T.as_(T.succeed(elem), true);
    } else {
      return T.as_(Q.shutdown(q), false);
    }
  })((0, _zipWithIndex.zipWithIndex)(self.grouped)));
  return new GroupBy(g1, self.buffer);
}
/**
 * Only consider the first n groups found in the stream.
 */


function first(n) {
  return self => first_(self, n);
}
/**
 * Filter the groups to be processed.
 */


function filter_(self, f) {
  const g1 = (0, _filterM.filterM)(elem => {
    const {
      tuple: [k, q]
    } = elem;

    if (f(k)) {
      return T.as_(T.succeed(elem), true);
    } else {
      return T.as_(Q.shutdown(q), false);
    }
  })(self.grouped);
  return new GroupBy(g1, self.buffer);
}
/**
 * Filter the groups to be processed.
 */


function filter(f) {
  return self => filter_(self, f);
}
//# sourceMappingURL=index.js.map