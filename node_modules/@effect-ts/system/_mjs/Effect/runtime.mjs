// ets_tracing: off
// option
// cause
import * as Cause from "../Cause/core.mjs";
import { defaultRenderer, pretty } from "../Cause/Pretty/index.mjs"; // exit

import { HasClock, LiveClock } from "../Clock/index.mjs";
import { flatten as exitFlatten } from "../Exit/core.mjs"; // fiber

import { FiberContext } from "../Fiber/context.mjs";
import { interruptible } from "../Fiber/core.mjs";
import { newFiberId } from "../Fiber/id.mjs";
import { Platform } from "../Fiber/platform.mjs";
import { constVoid, identity } from "../Function/index.mjs";
import * as O from "../Option/index.mjs";
import { none } from "../Option/index.mjs";
import { defaultRandom, HasRandom } from "../Random/index.mjs";
import * as Scope from "../Scope/index.mjs"; // supervisor

import * as Supervisor from "../Supervisor/index.mjs";
import { isTracingEnabled } from "../Tracing/index.mjs";
import * as core from "./core.mjs";
import { instruction, IPlatform } from "./primitives.mjs"; // empty function

const empty = () => {//
};

export const defaultEnv = {
  [HasClock.key]: /*#__PURE__*/new LiveClock(),
  [HasRandom.key]: defaultRandom
};
export const prettyReporter = e => {
  console.error(pretty(e, defaultRenderer));
};
export const defaultPlatform = /*#__PURE__*/new Platform({
  executionTraceLength: 25,
  stackTraceLength: 25,
  traceExecution: /*#__PURE__*/isTracingEnabled(),
  traceStack: /*#__PURE__*/isTracingEnabled(),
  traceEffects: /*#__PURE__*/isTracingEnabled(),
  initialTracingStatus: /*#__PURE__*/isTracingEnabled(),
  ancestorExecutionTraceLength: 25,
  ancestorStackTraceLength: 25,
  ancestryLength: 25,
  renderer: defaultRenderer,
  reportFailure: constVoid,
  maxOp: 2048,
  supervisor: Supervisor.trackMainFibers
});
export class CustomRuntime {
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
    const initialIS = interruptible;
    const fiberId = newFiberId();
    const scope = Scope.unsafeMakeScope();
    const supervisor = Supervisor.none;
    const context = new FiberContext(fiberId, this.env, initialIS, new Map(), supervisor, scope, this.platform.value.maxOp, this.platform.value.reportFailure, this.platform, none, this.platform.value.initialTracingStatus);

    if (supervisor !== Supervisor.none) {
      supervisor.unsafeOnStart(this.env, effect, O.none, context);
      context.onDone(exit => supervisor.unsafeOnEnd(exitFlatten(exit), context));
    }

    context.evaluateLater(effect);
    return context;
  }

  supervised(supervisor) {
    return new CustomRuntime(this.env, new Platform({ ...this.platform.value,
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
              rej(Cause.squash(identity)(exit.cause));
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
    return new CustomRuntime(this.env, new Platform({ ...this.platform.value,
      renderer
    }));
  }

  traceExecution(b) {
    return new CustomRuntime(this.env, new Platform({ ...this.platform.value,
      traceExecution: b
    }));
  }

  executionTraceLength(n) {
    return new CustomRuntime(this.env, new Platform({ ...this.platform.value,
      executionTraceLength: n
    }));
  }

  traceStack(b) {
    return new CustomRuntime(this.env, new Platform({ ...this.platform.value,
      traceStack: b
    }));
  }

  stackTraceLength(n) {
    return new CustomRuntime(this.env, new Platform({ ...this.platform.value,
      stackTraceLength: n
    }));
  }

  traceEffect(b) {
    return new CustomRuntime(this.env, new Platform({ ...this.platform.value,
      traceEffects: b
    }));
  }

  initialTracingStatus(b) {
    return new CustomRuntime(this.env, new Platform({ ...this.platform.value,
      initialTracingStatus: b
    }));
  }

  ancestorExecutionTraceLength(n) {
    return new CustomRuntime(this.env, new Platform({ ...this.platform.value,
      ancestorExecutionTraceLength: n
    }));
  }

  ancestorStackTraceLength(n) {
    return new CustomRuntime(this.env, new Platform({ ...this.platform.value,
      ancestorStackTraceLength: n
    }));
  }

  ancestryLength(n) {
    return new CustomRuntime(this.env, new Platform({ ...this.platform.value,
      ancestryLength: n
    }));
  }

  reportFailure(reportFailure) {
    return new CustomRuntime(this.env, new Platform({ ...this.platform.value,
      reportFailure
    }));
  }

  maxOp(maxOp) {
    return new CustomRuntime(this.env, new Platform({ ...this.platform.value,
      maxOp
    }));
  }

}
/**
 * Construct custom runtime
 */

export function makeCustomRuntime(env, platform) {
  return new CustomRuntime(env, platform);
}
/**
 * Default runtime
 */

export const defaultRuntime = /*#__PURE__*/makeCustomRuntime(defaultEnv, defaultPlatform);
/**
 * Exports of default runtime
 */

export const {
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

export function runtime() {
  return core.accessM(r0 => new IPlatform(platform => core.succeedWith(() => {
    return makeCustomRuntime(r0, platform);
  })));
}
export function withRuntimeM(f) {
  return core.chain_(runtime(), f);
}
export function withRuntime(f) {
  return core.chain_(runtime(), r => core.succeed(f(r)));
}
//# sourceMappingURL=runtime.mjs.map