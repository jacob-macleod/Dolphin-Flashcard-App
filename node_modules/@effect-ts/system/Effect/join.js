"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.join = join;
exports.joinEither = joinEither;
exports.joinEither_ = joinEither_;
exports.join_ = join_;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var _core = /*#__PURE__*/require("./core.js");

var _map = /*#__PURE__*/require("./map.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Depending on provided environment returns either this one or the other effect.
 *
 * @ets_data_first join_
 */
function join(that, __trace) {
  return self => {
    return join_(self, that, __trace);
  };
}
/**
 * Depending on provided environment returns either this one or the other effect.
 */


function join_(self, that, __trace) {
  return (0, _core.accessM)(_ => E.fold_(_, r => (0, _core.provideAll_)(self, r), r1 => (0, _core.provideAll_)(that, r1)), __trace);
}
/**
 * Depending on provided environment returns either this one or the other effect.
 */


function joinEither_(self, that, __trace) {
  return (0, _core.accessM)(_ => E.fold_(_, r => (0, _map.map_)((0, _core.provideAll_)(self, r), E.left), r1 => (0, _map.map_)((0, _core.provideAll_)(that, r1), E.right)), __trace);
}
/**
 * Depending on provided environment returns either this one or the other effect.
 */


function joinEither(that, __trace) {
  return self => joinEither_(self, that, __trace);
}
//# sourceMappingURL=join.js.map