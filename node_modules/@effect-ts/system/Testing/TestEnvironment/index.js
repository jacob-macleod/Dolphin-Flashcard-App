"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestEnvironment = void 0;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Effect/index.js"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Layer/index.js"));

var Random = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Random/index.js"));

var Annotations = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Annotations/index.js"));

var Live = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Live/index.js"));

var TestClock = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../TestClock/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const defaultEnv = /*#__PURE__*/L.succeed(T.defaultEnv);
const deterministicRandom = /*#__PURE__*/L.fromEffect_( /*#__PURE__*/T.succeedWith(() => new Random.LiveRandom(4374897389)), Random.HasRandom);
const TestEnvironment = /*#__PURE__*/defaultEnv[">=>"]( /*#__PURE__*/Annotations.live["+++"](Live.live)[">+>"]( /*#__PURE__*/TestClock.defaultTestClock["+++"](deterministicRandom)));
exports.TestEnvironment = TestEnvironment;
//# sourceMappingURL=index.js.map