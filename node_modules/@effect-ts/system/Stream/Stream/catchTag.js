"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchTag = catchTag;
exports.catchTag_ = catchTag_;

var CatchAll = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./catchAll.js"));

var Fail = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fail.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Recovers from specified error.
 *
 * @ets_data_first catchTag_
 */
function catchTag(k, f) {
  return self => catchTag_(self, k, f);
}
/**
 * Recovers from specified error.
 */


function catchTag_(self, k, f) {
  return CatchAll.catchAll_(self, e => {
    if ("_tag" in e && e["_tag"] === k) {
      return f(e);
    }

    return Fail.fail(e);
  });
}
//# sourceMappingURL=catchTag.js.map