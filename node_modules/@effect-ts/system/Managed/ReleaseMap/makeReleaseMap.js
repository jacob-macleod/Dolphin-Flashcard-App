"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeReleaseMap = void 0;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../deps-core.js"));

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./deps-ref.js"));

var _ReleaseMap = /*#__PURE__*/require("./ReleaseMap.js");

var _Running = /*#__PURE__*/require("./Running.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const makeReleaseMap = /*#__PURE__*/T.map_( /*#__PURE__*/R.makeRef( /*#__PURE__*/new _Running.Running(0, /*#__PURE__*/new Map())), s => new _ReleaseMap.ReleaseMap(s));
exports.makeReleaseMap = makeReleaseMap;
//# sourceMappingURL=makeReleaseMap.js.map