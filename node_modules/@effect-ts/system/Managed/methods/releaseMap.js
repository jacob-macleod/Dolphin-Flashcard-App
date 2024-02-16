"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.releaseMap = void 0;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var _deps = /*#__PURE__*/require("../deps.js");

var _managed = /*#__PURE__*/require("../managed.js");

var _finalizer = /*#__PURE__*/require("../ReleaseMap/finalizer.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Provides access to the entire map of resources allocated by this {@link Managed}.
 */
const releaseMap = /*#__PURE__*/(0, _managed.managedApply)( /*#__PURE__*/(0, _deps.map)(tp => Tp.tuple(_finalizer.noopFinalizer, tp.get(1)))( /*#__PURE__*/(0, _deps.environment)()));
exports.releaseMap = releaseMap;
//# sourceMappingURL=releaseMap.js.map