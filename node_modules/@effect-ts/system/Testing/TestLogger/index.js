"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logLine = exports.TestLogger = exports.LoggerId = exports.FromConsole = void 0;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Effect/index.js"));

var _index2 = /*#__PURE__*/require("../../Has/index.js");

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Layer/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const LoggerId = /*#__PURE__*/Symbol.for("@effect-ts/system/Test/TestLoggerId");
exports.LoggerId = LoggerId;
const TestLogger = /*#__PURE__*/(0, _index2.tag)(LoggerId);
exports.TestLogger = TestLogger;
const FromConsole = /*#__PURE__*/L.fromEffect_( /*#__PURE__*/T.succeedWith(() => ({
  serviceId: LoggerId,
  logLine: msg => T.succeedWith(() => {
    console.log(msg);
  })
})), TestLogger);
exports.FromConsole = FromConsole;
const {
  logLine
} = /*#__PURE__*/T.deriveLifted(TestLogger)(["logLine"], [], []);
exports.logLine = logLine;
//# sourceMappingURL=index.js.map