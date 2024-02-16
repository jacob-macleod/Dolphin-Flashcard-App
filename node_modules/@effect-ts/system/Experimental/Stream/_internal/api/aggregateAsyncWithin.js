"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aggregateAsyncWithin = aggregateAsyncWithin;
exports.aggregateAsyncWithin_ = aggregateAsyncWithin_;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Either/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var AggregateAsyncWithinEither = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./aggregateAsyncWithinEither.js"));

var Collect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./collect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Like `aggregateAsyncWithinEither`, but only returns the `Right` results.
 */
function aggregateAsyncWithin_(self, sink, schedule) {
  return Collect.collect_(AggregateAsyncWithinEither.aggregateAsyncWithinEither_(self, sink, schedule), E.fold(() => O.none, v => O.some(v)));
}
/**
 * Like `aggregateAsyncWithinEither`, but only returns the `Right` results.
 *
 * @ets_data_first aggregateAsyncWithin_
 */


function aggregateAsyncWithin(sink, schedule) {
  return self => aggregateAsyncWithin_(self, sink, schedule);
}
//# sourceMappingURL=aggregateAsyncWithin.js.map