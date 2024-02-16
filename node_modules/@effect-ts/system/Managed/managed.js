"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManagedURI = exports.ManagedImpl = void 0;
exports.managedApply = managedApply;

var _index = /*#__PURE__*/require("../Utils/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./deps-core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ManagedURI = "@matechs/core/Eff/ManagedURI";
exports.ManagedURI = ManagedURI;

class ManagedImpl {
  constructor(effect) {
    this.effect = effect;
  }

}

exports.ManagedImpl = ManagedImpl;
T._U, T._E, T._A, T._R;

function managedApply(effect) {
  return new ManagedImpl(effect);
}
//# sourceMappingURL=managed.js.map