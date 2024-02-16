"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.live = exports.LiveId = exports.Live = void 0;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Effect/index.js"));

var _index2 = /*#__PURE__*/require("../../Has/index.js");

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Layer/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const LiveId = /*#__PURE__*/Symbol.for("@effect-ts/system/Test/LiveId");
exports.LiveId = LiveId;
const Live = /*#__PURE__*/(0, _index2.tag)(LiveId);
exports.Live = Live;
const live = /*#__PURE__*/L.fromEffect_( /*#__PURE__*/T.access(r => ({
  serviceId: LiveId,
  provide: T.provideAll(r)
})), Live);
exports.live = live;
//# sourceMappingURL=index.js.map