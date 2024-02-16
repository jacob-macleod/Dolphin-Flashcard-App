"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.race = race;
exports.race_ = race_;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Either/index.js"));

var _index2 = /*#__PURE__*/require("../../../Function/index.js");

var Map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

var RaceBoth = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./raceBoth.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Runs both sinks in parallel on the input, returning the result or the error from the
 * one that finishes first.
 */
function race_(self, that) {
  return Map.map_(RaceBoth.raceBoth_(self, that), E.fold(_index2.identity, _index2.identity));
}
/**
 * Runs both sinks in parallel on the input, returning the result or the error from the
 * one that finishes first.
 */


function race(that) {
  return self => race_(self, that);
}
//# sourceMappingURL=race.js.map