"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.provideServiceManaged = provideServiceManaged;
exports.provideSomeManaged = provideSomeManaged;

var _use = /*#__PURE__*/require("../Managed/use.js");

var has = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./has.js"));

var provide = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./provide.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Provides a managed to the given effect
 */
function provideSomeManaged(managed) {
  return self => (0, _use.use_)(managed, a => provide.provide_(self, a));
}
/**
 * Provides a managed to the given effect
 */


function provideServiceManaged(tag) {
  return managed => self => (0, _use.use_)(managed, a => has.provideService(tag)(a)(self));
}
//# sourceMappingURL=provideManaged.js.map