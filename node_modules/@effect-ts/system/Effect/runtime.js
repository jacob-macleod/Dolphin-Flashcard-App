"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultRuntime = exports.defaultPlatform = exports.defaultEnv = exports.CustomRuntime = void 0;
exports.makeCustomRuntime = makeCustomRuntime;
exports.runPromiseExit = exports.runPromise = exports.runFiber = exports.runCancel = exports.run = exports.prettyReporter = void 0;
exports.runtime = runtime;
exports.withRuntime = withRuntime;
exports.withRuntimeM = withRuntimeM;

var Cause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Cause/core.js"));

var _index = /*#__PURE__*/require("../Cause/Pretty/index.js");

var _index2 = /*#__PURE__*/require("../Clock/index.js");

var _core2 = /*#__PURE__*/require("../Exit/core.js");

var _context = /*#__PURE__*/require("../Fiber/context.js");

var _core3 = /*#__PURE__*/require("../Fiber/core.js");

var _id = /*#__PURE__*/require("../Fiber/id.js");

var _platform = /*#__PURE__*/require("../Fiber/platform.js");

var _index3 = /*#__PURE__*/require("../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var _index5 = /*#__PURE__*/require("../Random/index.js");

var Scope = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Scope/index.js"));

var Supervisor = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Supervisor/index.js"));

var _index8 = /*#__PURE__*/require("../Tracing/index.js");

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

var _primitives = /*#__PURE__*/require("./primitives.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
// option
// cause
// exit
// fiber
// supervisor
// empty function
const empty = () => {//
};

const defaultEnv = {
  [_index2.HasClock.key]: /*#__PURE__*/new _index2.LiveClock(),
  [_index5.HasRandom.key]: _index5.defaultRandom
};
exports.defaultEnv = defaultEnv;

const prettyReporter = e => {
  console.error((0, _index.pretty)(e, _index.defaultRenderer));
};

exports.prettyReporter = prettyReporter;
const defaultPlatform = /*#__PURE__*/new _platform.Platform({
  executionTraceLength: 25,
  stackTraceLength: 25,
  traceExecution: /*#__PURE__*/(0, _index8.isTracingEnabled)(),
  traceStack: /*#__PURE__*/(0, _index8.isTracingEnabled)(),
  traceEffects: /*#__PURE__*/(0, _index8.isTracingEnabled)(),
  initialTracingStatus: /*#__PURE__*/(0, _index8.isTracingEnabled)(),
  ancestorExecutionTraceLength: 25,
  ancestorStackTraceLength: 25,
  ancestryLength: 25,
  renderer: _index.defaultRenderer,
  reportFailure: _index3.constVoid,
  maxOp: 2048,
  supervisor: Supervisor.trackMainFibers
});
exports.defaultPlatform = defaultPlatform;

class CustomRuntime {
  constructor(env, platform) {
    this.env = env;
    this.platform = platform;
    this.traceExecution = this.traceExecution.bind(this);
    this.executionTraceLength = this.executionTraceLength.bind(this);
    this.traceStack = this.traceStack.bind(this);
    this.stackTraceLength = this.stackTraceLength.bind(this);
    this.traceEffect = this.traceEffect.bind(this);
    this.initialTracingStatus = this.initialTracingStatus.bind(this);
    this.ancestorExecutionTraceLength = this.ancestorExecutionTraceLength.bind(this);
    this.ancestorStackTraceLength = this.ancestorStackTraceLength.bind(this);
    this.ancestryLength = this.ancestryLength.bind(this);
    this.fiberContext = this.fiberContext.bind(this);
    this.run = this.run.bind(this);
    this.runCancel = this.runCancel.bind(this);
    this.runPromise = this.runPromise.bind(this);
    this.runPromiseExit = this.runPromiseExit.bind(this);
    this.traceRenderer = this.traceRenderer.bind(this);
    this.runFiber = this.runFiber.bind(this);
  }

  fiberContext(effect) {
    const initialIS = _core3.interruptible;
    const fiberId = (0, _id.newFiberId)();
    const scope = Scope.unsafeMakeScope();
    const supervisor = Supervisor.none;
    const context = new _context.FiberContext(fiberId, this.env, initialIS, new Map(), supervisor, scope, this.platform.value.maxOp, this.platform.value.reportFailure, this.platform, O.none, this.platform.value.initialTracingStatus);

    if (supervisor !== Supervisor.none) {
      supervisor.unsafeOnStart(this.env, effect, O.none, context);
      context.onDone(exit => supervisor.unsafeOnEnd((0, _core2.flatten)(exit), context));
    }

    context.evaluateLater(effect);
    return context;
  }

  supervised(supervisor) {
    return new CustomRuntime(this.env, new _platform.Platform({ ...this.platform.value,
      supervisor
    }));
  }

  runFiber(self) {
    const context = this.fiberContext(self);
    return context;
  }
  /**
   * Runs effect until completion, calling cb with the eventual exit state
   */


  run(self, cb) {
    const context = this.fiberContext(self);
    context.runAsync(cb || empty);
  }
  /**
   * Runs effect until completion returing a cancel effecr that when executed
   * triggers cancellation of the process
   */


  runCancel(self, cb) {
    const context = this.fiberContext(self);
    context.runAsync(cb || empty);
    return context.interruptAs(context.id);
  }
  /**
   * Run effect as a Promise, throwing a the first error or exception
   */


  runPromise(self) {
    const context = this.fiberContext(self);
    return new Promise((res, rej) => {
      context.runAsync(exit => {
        switch (exit._tag) {
          case "Success":
            {
              res(exit.value);
              break;
            }

          case "Failure":
            {
              rej(Cause.squash(_index3.identity)(exit.cause));
              break;
            }
        }
      });
    });
  }
  /**
   * Run effect as a Promise of the Exit state
   * in case of error.
   */


  runPromiseExit(self) {
    const context = this.fiberContext(self);
    return new Promise(res => {
      context.runAsync(exit => {
        res(exit);
      });
    });
  }

  withEnvironment(f) {
    return new CustomRuntime(f(this.env), this.platform);
  }

  traceRenderer(renderer) {
    return new CustomRuntime(this.env, new _platform.Platform({ ...this.platform.value,
      renderer
    }));
  }

  traceExecution(b) {
    return new CustomRuntime(this.env, new _platform.Platform({ ...this.platform.value,
      traceExecution: b
    }));
  }

  executionTraceLength(n) {
    return new CustomRuntime(this.env, new _platform.Platform({ ...this.platform.value,
      executionTraceLength: n
    }));
  }

  traceStack(b) {
    return new CustomRuntime(this.env, new _platform.Platform({ ...this.platform.value,
      traceStack: b
    }));
  }

  stackTraceLength(n) {
    return new CustomRuntime(this.env, new _platform.Platform({ ...this.platform.value,
      stackTraceLength: n
    }));
  }

  traceEffect(b) {
    return new CustomRuntime(this.env, new _platform.Platform({ ...this.platform.value,
      traceEffects: b
    }));
  }

  initialTracingStatus(b) {
    return new CustomRuntime(this.env, new _platform.Platform({ ...this.platform.value,
      initialTracingStatus: b
    }));
  }

  ancestorExecutionTraceLength(n) {
    return new CustomRuntime(this.env, new _platform.Platform({ ...this.platform.value,
      ancestorExecutionTraceLength: n
    }));
  }

  ancestorStackTraceLength(n) {
    return new CustomRuntime(this.env, new _platform.Platform({ ...this.platform.value,
      ancestorStackTraceLength: n
    }));
  }

  ancestryLength(n) {
    return new CustomRuntime(this.env, new _platform.Platform({ ...this.platform.value,
      ancestryLength: n
    }));
  }

  reportFailure(reportFailure) {
    return new CustomRuntime(this.env, new _platform.Platform({ ...this.platform.value,
      reportFailure
    }));
  }

  maxOp(maxOp) {
    return new CustomRuntime(this.env, new _platform.Platform({ ...this.platform.value,
      maxOp
    }));
  }

}
/**
 * Construct custom runtime
 */


exports.CustomRuntime = CustomRuntime;

function makeCustomRuntime(env, platform) {
  return new CustomRuntime(env, platform);
}
/**
 * Default runtime
 */


const defaultRuntime = /*#__PURE__*/makeCustomRuntime(defaultEnv, defaultPlatform);
/**
 * Exports of default runtime
 */

exports.defaultRuntime = defaultRuntime;
const {
  run,
  runCancel,
  runFiber,
  runPromise,
  runPromiseExit
} = defaultRuntime;
/**
 * Use current environment to build a runtime that is capable of
 * providing its content to other effects.
 *
 * NOTE: in should be used in a region where current environment
 * is valid (i.e. keep attention to closed resources)
 */

exports.runPromiseExit = runPromiseExit;
exports.runPromise = runPromise;
exports.runFiber = runFiber;
exports.runCancel = runCancel;
exports.run = run;

function runtime() {
  return core.accessM(r0 => new _primitives.IPlatform(platform => core.succeedWith(() => {
    return makeCustomRuntime(r0, platform);
  })));
}

function withRuntimeM(f) {
  return core.chain_(runtime(), f);
}

function withRuntime(f) {
  return core.chain_(runtime(), r => core.succeed(f(r)));
}
//# sourceMappingURL=runtime.js.map