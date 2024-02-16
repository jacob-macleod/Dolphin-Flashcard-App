"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTestRunner = exports.TestRunner = void 0;

var Clock = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Clock/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Effect/index.js"));

var _index3 = /*#__PURE__*/require("../../Function/index.js");

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Layer/index.js"));

var Annotations = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Annotations/index.js"));

var TestAnnotationRenderer = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../TestAnnotationRenderer/index.js"));

var _index7 = /*#__PURE__*/require("../TestClock/index.js");

var _index8 = /*#__PURE__*/require("../TestExecutor/index.js");

var _index9 = /*#__PURE__*/require("../TestLogger/index.js");

var _index10 = /*#__PURE__*/require("../TestReporter/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const defaultClock = /*#__PURE__*/L.fromFunction(Clock.HasClock)(() => new Clock.LiveClock());
const defaultLayer = /*#__PURE__*/defaultClock["+++"](_index9.FromConsole);

class TestRunner {
  constructor(executor, platform = T.defaultPlatform, reporter = (0, _index10.DefaultTestReporter)(TestAnnotationRenderer.standard), bootstrap = defaultLayer) {
    this.executor = executor;
    this.platform = platform;
    this.reporter = reporter;
    this.bootstrap = bootstrap;
    this.runtime = new T.CustomRuntime(undefined, this.platform);

    this.run = spec => T.chain_(T.timed(this.executor.run(spec, T.parallelN(4))), ({
      tuple: [d, e]
    }) => T.as_(this.reporter((0, _index7.Duration)(d), e), e));
  }

}

exports.TestRunner = TestRunner;
const defaultTestRunner = /*#__PURE__*/new TestRunner( /*#__PURE__*/(0, _index8.defaultExecutor)( /*#__PURE__*/Annotations.live["+++"]( /*#__PURE__*/L.succeed(T.defaultEnv))));
exports.defaultTestRunner = defaultTestRunner;
//# sourceMappingURL=index.js.map