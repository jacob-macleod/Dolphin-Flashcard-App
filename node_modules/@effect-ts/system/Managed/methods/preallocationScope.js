"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preallocationScope = void 0;

var _core = /*#__PURE__*/require("../core.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../deps-core.js"));

var _makeExit = /*#__PURE__*/require("../makeExit.js");

var _api = /*#__PURE__*/require("./api.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Creates a scope in which resources can be safely preallocated.
 */
const preallocationScope = /*#__PURE__*/(0, _core.map_)(_api.scope, allocate => managed => T.map_(allocate(managed), ({
  tuple: [release, res]
}) => (0, _makeExit.makeExit_)(T.succeed(res), (_, exit) => release(exit))));
exports.preallocationScope = preallocationScope;
//# sourceMappingURL=preallocationScope.js.map