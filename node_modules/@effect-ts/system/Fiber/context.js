"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeCurrentFiber = exports.currentFiber = exports.TracingExit = exports.Stack = exports.InterruptExit = exports.HandlerFrame = exports.FiberContext = exports.ApplyFrame = void 0;

var Cause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Cause/core.js"));

var _errors = /*#__PURE__*/require("../Cause/errors.js");

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Array/index.js"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/List/index.js"));

var _exclForEach = /*#__PURE__*/require("../Effect/excl-forEach.js");

var _primitives = /*#__PURE__*/require("../Effect/primitives.js");

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var Exit = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Exit/api.js"));

var FR = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../FiberRef/fiberRef.js"));

var update = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../FiberRef/update.js"));

var _index4 = /*#__PURE__*/require("../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var Scope = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Scope/index.js"));

var St = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Structural/index.js"));

var Sup = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Supervisor/index.js"));

var _index9 = /*#__PURE__*/require("../Support/AtomicReference/index.js");

var _index10 = /*#__PURE__*/require("../Support/RingBuffer/index.js");

var _index11 = /*#__PURE__*/require("../Support/Scheduler/index.js");

var X = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../XPure/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./_internal/effect.js"));

var Fiber = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

var _state = /*#__PURE__*/require("./state.js");

var Status = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./status.js"));

var _tracing = /*#__PURE__*/require("./tracing.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
// cause
// effect
// either
// exit
// fiberRef
// option
// supervisor / scope
// support
// fiber
class Stack {
  constructor(value, previous) {
    this.value = value;
    this.previous = previous;
  }

}

exports.Stack = Stack;

class InterruptExit {
  constructor(apply, trace) {
    this.apply = apply;
    this.trace = trace;
    this._tag = "InterruptExit";
  }

}

exports.InterruptExit = InterruptExit;

class TracingExit {
  constructor(apply, trace) {
    this.apply = apply;
    this.trace = trace;
    this._tag = "TracingExit";
  }

}

exports.TracingExit = TracingExit;

class HandlerFrame {
  constructor(apply, trace) {
    this.apply = apply;
    this.trace = trace;
    this._tag = "HandlerFrame";
  }

}

exports.HandlerFrame = HandlerFrame;

class ApplyFrame {
  constructor(apply, trace) {
    this.apply = apply;
    this.trace = trace;
    this._tag = "ApplyFrame";
  }

}

exports.ApplyFrame = ApplyFrame;
const currentFiber = /*#__PURE__*/new _index9.AtomicReference(null);
exports.currentFiber = currentFiber;

const unsafeCurrentFiber = () => O.fromNullable(currentFiber.get);

exports.unsafeCurrentFiber = unsafeCurrentFiber;
const noop = /*#__PURE__*/O.some(_index4.constVoid);

class FiberContext {
  constructor(fiberId, startEnv, startIStatus, fiberRefLocals, supervisor0, openScope, maxOp, reportFailure, platform, parentTrace, initialTracingStatus) {
    this.fiberId = fiberId;
    this.startEnv = startEnv;
    this.startIStatus = startIStatus;
    this.fiberRefLocals = fiberRefLocals;
    this.supervisor0 = supervisor0;
    this.openScope = openScope;
    this.maxOp = maxOp;
    this.reportFailure = reportFailure;
    this.platform = platform;
    this.parentTrace = parentTrace;
    this.initialTracingStatus = initialTracingStatus;
    this._tag = "RuntimeFiber";
    this.state = new _index9.AtomicReference((0, _state.initial)());
    this.asyncEpoch = 0 | 0;
    this.stack = undefined;
    this.environments = new Stack(this.startEnv);
    this.interruptStatus = new Stack(this.startIStatus.toBoolean);
    this.supervisors = new Stack(this.supervisor0);
    this.forkScopeOverride = undefined;
    this.scopeKey = undefined;
    this.traceStatusEnabled = this.platform.value.traceExecution || this.platform.value.traceStack;
    this.traceStatusStack = this.traceStatusEnabled ? new Stack(this.initialTracingStatus) : undefined;
    this.executionTraces = this.traceStatusEnabled ? new _index10.RingBuffer(this.platform.value.executionTraceLength) : undefined;
    this.stackTraces = this.traceStatusEnabled ? new _index10.RingBuffer(this.platform.value.stackTraceLength, x => x._tag === "NoLocation") : undefined;
    this.interruptExit = new InterruptExit(v => {
      if (this.isInterruptible) {
        this.popInterruptStatus();
        return T.succeed(v);
      } else {
        return T.succeedWith(() => {
          this.popInterruptStatus();
          return v;
        });
      }
    });
    this.tracingExit = new TracingExit(v => {
      this.popTracingStatus();
      return new _primitives.ISucceed(v);
    });
    this.evaluateNow = this.evaluateNow.bind(this);
  }

  get [St.hashSym]() {
    return St.hash(this.id);
  }

  [St.equalsSym](that) {
    return that instanceof FiberContext && St.equals(this.id, that.id);
  }

  get poll() {
    return T.succeedWith(() => this.poll0());
  }

  addTrace(trace) {
    if (this.inTracingRegion && trace) {
      this.executionTraces.push(new _tracing.SourceLocation(trace));
    }
  }

  addTraceValue(trace) {
    if (this.inTracingRegion && trace._tag === "SourceLocation") {
      this.executionTraces.push(trace);
    }
  }

  getRef(fiberRef) {
    return T.succeedWith(() => this.fiberRefLocals.get(fiberRef) || fiberRef.initial);
  }

  poll0() {
    const state = this.state.get;

    switch (state._tag) {
      case "Executing":
        {
          return O.none;
        }

      case "Done":
        {
          return O.some(state.value);
        }
    }
  }

  popTracingStatus() {
    var _a;

    this.traceStatusStack = (_a = this.traceStatusStack) === null || _a === void 0 ? void 0 : _a.previous;
  }

  pushTracingStatus(flag) {
    this.traceStatusStack = new Stack(flag, this.traceStatusStack);
  }

  get isInterruptible() {
    return this.interruptStatus ? this.interruptStatus.value : true;
  }

  get isInterrupted() {
    return !Cause.isEmpty(this.state.get.interrupted);
  }

  get isInterrupting() {
    return (0, _state.interrupting)(this.state.get);
  }

  get shouldInterrupt() {
    return this.isInterrupted && this.isInterruptible && !this.isInterrupting;
  }

  get isStackEmpty() {
    return !this.stack;
  }

  get id() {
    return this.fiberId;
  }

  pushContinuation(k) {
    if (this.platform.value.traceStack && this.inTracingRegion) {
      this.stackTraces.push((0, _tracing.traceLocation)(k.trace));
    }

    this.stack = new Stack(k, this.stack);
  }

  popStackTrace() {
    this.stackTraces.pop();
  }

  popContinuation() {
    var _a, _b;

    const current = (_a = this.stack) === null || _a === void 0 ? void 0 : _a.value;
    this.stack = (_b = this.stack) === null || _b === void 0 ? void 0 : _b.previous;
    return current;
  }

  pushEnv(k) {
    this.environments = new Stack(k, this.environments);
  }

  popEnv() {
    var _a, _b;

    const current = (_a = this.environments) === null || _a === void 0 ? void 0 : _a.value;
    this.environments = (_b = this.environments) === null || _b === void 0 ? void 0 : _b.previous;
    return current;
  }

  pushInterruptStatus(flag) {
    this.interruptStatus = new Stack(flag, this.interruptStatus);
  }

  popInterruptStatus() {
    var _a, _b;

    const current = (_a = this.interruptStatus) === null || _a === void 0 ? void 0 : _a.value;
    this.interruptStatus = (_b = this.interruptStatus) === null || _b === void 0 ? void 0 : _b.previous;
    return current;
  }

  runAsync(k) {
    const v = this.register0(xx => k(Exit.flatten(xx)));

    if (v) {
      k(v);
    }
  }
  /**
   * Unwinds the stack, looking for the first error handler, and exiting
   * interruptible / uninterruptible regions.
   */


  unwindStack() {
    let unwinding = true;
    let discardedFolds = false; // Unwind the stack, looking for an error handler:

    while (unwinding && !this.isStackEmpty) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const frame = this.popContinuation();

      switch (frame._tag) {
        case "InterruptExit":
          {
            this.popInterruptStatus();
            break;
          }

        case "TracingExit":
          {
            this.popTracingStatus();
            break;
          }

        case "Fold":
          {
            if (this.platform.value.traceStack && this.inTracingRegion) {
              this.popStackTrace();
            }

            if (!this.shouldInterrupt) {
              // Push error handler back onto the stack and halt iteration:
              this.pushContinuation(new HandlerFrame(frame.failure, frame.trace));
              unwinding = false;
            } else {
              discardedFolds = true;
            }

            break;
          }

        default:
          {
            if (this.platform.value.traceStack && this.inTracingRegion) {
              this.popStackTrace();
            }
          }
      }
    }

    return discardedFolds;
  }

  register0(k) {
    const oldState = this.state.get;

    switch (oldState._tag) {
      case "Done":
        {
          return oldState.value;
        }

      case "Executing":
        {
          const observers = [k, ...oldState.observers];
          this.state.set(new _state.FiberStateExecuting(oldState.status, observers, oldState.interrupted));
          return null;
        }
    }
  }

  nextInstr(value) {
    if (!this.isStackEmpty) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const k = this.popContinuation();

      if (this.inTracingRegion && this.platform.value.traceExecution) {
        this.addTrace(k.trace);
      }

      if (this.platform.value.traceStack && k._tag !== "InterruptExit" && k._tag !== "TracingExit") {
        this.popStackTrace();
      }

      return k.apply(value);
    } else {
      return this.done(Exit.succeed(value));
    }
  }

  notifyObservers(v, observers) {
    const result = Exit.succeed(v);
    observers.slice(0).reverse().forEach(k => k(result));
  }

  observe0(k) {
    const x = this.register0(k);

    if (x != null) {
      return O.some(T.succeed(x));
    }

    return O.none;
  }

  get await() {
    return T.effectMaybeAsyncInterruptBlockingOn(k => {
      const cb = x => k(T.done(x));

      return O.fold_(this.observe0(cb), () => E.left(T.succeedWith(() => this.interruptObserver(cb))), E.right);
    }, [this.fiberId]);
  }

  interruptObserver(k) {
    const oldState = this.state.get;

    if (oldState._tag === "Executing") {
      const observers = oldState.observers.filter(o => o !== k);
      this.state.set(new _state.FiberStateExecuting(oldState.status, observers, oldState.interrupted));
    }
  }

  interruptAs(fiberId) {
    const interruptedCause = Cause.interrupt(fiberId);
    return T.suspend(() => {
      const oldState = this.state.get;

      if (oldState._tag === "Executing" && oldState.status._tag === "Suspended" && oldState.status.interruptible && !(0, _state.interrupting)(oldState)) {
        const newCause = Cause.combineSeq(oldState.interrupted, interruptedCause);
        this.state.set(new _state.FiberStateExecuting(Status.withInterrupting(true)(oldState.status), oldState.observers, newCause));
        this.evaluateLater(T.interruptAs(fiberId));
      } else if (oldState._tag === "Executing") {
        const newCause = Cause.combineSeq(oldState.interrupted, interruptedCause);
        this.state.set(new _state.FiberStateExecuting(oldState.status, oldState.observers, newCause));
      }

      return this.await;
    });
  }

  done(v) {
    const oldState = this.state.get;

    switch (oldState._tag) {
      case "Done":
        {
          // Already done
          return undefined;
        }

      case "Executing":
        {
          if (this.openScope.scope.unsafeClosed) {
            /*
             * We are truly "done" because all the children of this fiber have terminated,
             * and there are no more pending effects that we have to execute on the fiber.
             */
            this.state.set(new _state.FiberStateDone(v));
            this.reportUnhandled(v);
            this.notifyObservers(v, oldState.observers);
            return undefined;
          } else {
            /*
             * We are not done yet, because we have to close the scope of the fiber.
             */
            this.state.set(new _state.FiberStateExecuting(Status.toFinishing(oldState.status), oldState.observers, oldState.interrupted));
            this.setInterrupting(true);
            return T.chain_(this.openScope.close(v), () => T.done(v));
          }
        }
    }
  }

  reportUnhandled(exit) {
    if (exit._tag === "Failure") {
      this.reportFailure(exit.cause);
    }
  }

  setInterrupting(value) {
    const oldState = this.state.get;

    switch (oldState._tag) {
      case "Executing":
        {
          this.state.set(new _state.FiberStateExecuting(Status.withInterrupting(value)(oldState.status), oldState.observers, oldState.interrupted));
          return;
        }

      case "Done":
        {
          return;
        }
    }
  }

  enterAsync(epoch, blockingOn) {
    const oldState = this.state.get;

    switch (oldState._tag) {
      case "Done":
        {
          throw new _errors.RuntimeError(`Unexpected fiber completion ${this.fiberId}`);
        }

      case "Executing":
        {
          const newState = new _state.FiberStateExecuting(new Status.Suspended(oldState.status, this.isInterruptible, epoch, blockingOn), oldState.observers, oldState.interrupted);
          this.state.set(newState);

          if (this.shouldInterrupt) {
            // Fiber interrupted, so go back into running state:
            this.exitAsync(epoch);
            return T.halt(this.state.get.interrupted);
          } else {
            return undefined;
          }
        }
    }
  }

  exitAsync(epoch) {
    const oldState = this.state.get;

    switch (oldState._tag) {
      case "Done":
        {
          return false;
        }

      case "Executing":
        {
          if (oldState.status._tag === "Suspended" && epoch === oldState.status.epoch) {
            this.state.set(new _state.FiberStateExecuting(oldState.status.previous, oldState.observers, oldState.interrupted));
            return true;
          } else {
            return false;
          }
        }
    }
  }

  resumeAsync(epoch) {
    return _ => {
      if (this.exitAsync(epoch)) {
        this.evaluateLater(_);
      }
    };
  }

  evaluateLater(i0) {
    (0, _index11.defaultScheduler)(() => this.evaluateNow(i0));
  }

  get scope() {
    return this.openScope.scope;
  }

  get status() {
    return T.succeed(this.state.get.status);
  }

  fork(i0, forkScope, reportFailure) {
    var _a, _b;

    const childFiberRefLocals = new Map();
    this.fiberRefLocals.forEach((v, k) => {
      childFiberRefLocals.set(k, k.fork(v));
    });
    const parentScope = O.getOrElse_(forkScope._tag === "Some" ? forkScope : ((_a = this.forkScopeOverride) === null || _a === void 0 ? void 0 : _a.value) || O.none, () => this.scope);
    const currentEnv = ((_b = this.environments) === null || _b === void 0 ? void 0 : _b.value) || {};
    const currentSup = this.supervisors.value;
    const childId = Fiber.newFiberId();
    const childScope = Scope.unsafeMakeScope();
    const ancestry = this.inTracingRegion && (this.platform.value.traceExecution || this.platform.value.traceStack) ? O.some(this.cutAncestryTrace(this.captureTrace())) : O.none;
    const childContext = new FiberContext(childId, currentEnv, Fiber.interruptStatus(this.isInterruptible), childFiberRefLocals, currentSup, childScope, this.maxOp, O.getOrElse_(reportFailure, () => this.reportFailure), this.platform, ancestry, this.inTracingRegion);

    if (currentSup !== Sup.none) {
      currentSup.unsafeOnStart(currentEnv, i0, O.some(this), childContext);
      childContext.onDone(exit => {
        currentSup.unsafeOnEnd(Exit.flatten(exit), childContext);
      });
    }

    const toExecute = this.parentScopeOp(parentScope, childContext, i0);
    childContext.evaluateLater(toExecute);
    return childContext;
  }

  parentScopeOp(parentScope, childContext, i0) {
    if (parentScope !== Scope.globalScope) {
      const exitOrKey = parentScope.unsafeEnsure(exit => T.suspend(() => {
        const _interruptors = exit._tag === "Failure" ? Cause.interruptors(exit.cause) : [];

        const head = _interruptors[0];

        if (head) {
          return childContext.interruptAs(head);
        } else {
          return childContext.interruptAs(this.fiberId);
        }
      }));
      return E.fold_(exitOrKey, exit => {
        switch (exit._tag) {
          case "Failure":
            {
              return T.interruptAs(O.getOrElse_(A.head(Array.from(Cause.interruptors(exit.cause))), () => this.fiberId));
            }

          case "Success":
            {
              return T.interruptAs(this.fiberId);
            }
        }
      }, key => {
        childContext.scopeKey = key; // Remove the finalizer key from the parent scope when the child fiber
        // terminates:

        childContext.onDone(() => {
          parentScope.unsafeDeny(key);
        });
        return i0;
      });
    } else {
      return i0;
    }
  }

  onDone(k) {
    const oldState = this.state.get;

    switch (oldState._tag) {
      case "Done":
        {
          k(Exit.succeed(oldState.value));
          return;
        }

      case "Executing":
        {
          this.state.set(new _state.FiberStateExecuting(oldState.status, [k, ...oldState.observers], oldState.interrupted));
        }
    }
  }

  getDescriptor() {
    return new Fiber.Descriptor(this.fiberId, this.state.get.status, Cause.interruptors(this.state.get.interrupted), Fiber.interruptStatus(this.isInterruptible), this.scope);
  }

  complete(winner, loser, cont, winnerExit, ab, cb) {
    if (ab.compareAndSet(true, false)) {
      switch (winnerExit._tag) {
        case "Failure":
          {
            cb(cont(winnerExit, loser));
            break;
          }

        case "Success":
          {
            cb(T.chain_(winner.inheritRefs, () => cont(winnerExit, loser)));
            break;
          }
      }
    }
  }

  get inheritRefs() {
    return T.suspend(() => {
      const locals = this.fiberRefLocals;

      if (locals.size === 0) {
        return T.unit;
      } else {
        return (0, _exclForEach.forEachUnit_)(locals, ([fiberRef, value]) => update.update_(fiberRef, old => fiberRef.join(old, value)));
      }
    });
  }

  get inTracingRegion() {
    return this.traceStatusStack ? this.traceStatusStack.value : this.initialTracingStatus;
  }

  raceWithImpl(race) {
    const raceIndicator = new _index9.AtomicReference(true);
    const left = this.fork(race.left, race.scope, noop);
    const right = this.fork(race.right, race.scope, noop);
    return T.effectAsyncBlockingOn(cb => {
      const leftRegister = left.register0(exit => {
        switch (exit._tag) {
          case "Failure":
            {
              this.complete(left, right, race.leftWins, exit, raceIndicator, cb);
              break;
            }

          case "Success":
            {
              this.complete(left, right, race.leftWins, exit.value, raceIndicator, cb);
              break;
            }
        }
      });

      if (leftRegister != null) {
        this.complete(left, right, race.leftWins, leftRegister, raceIndicator, cb);
      } else {
        const rightRegister = right.register0(exit => {
          switch (exit._tag) {
            case "Failure":
              {
                this.complete(right, left, race.rightWins, exit, raceIndicator, cb);
                break;
              }

            case "Success":
              {
                this.complete(right, left, race.rightWins, exit.value, raceIndicator, cb);
                break;
              }
          }
        });

        if (rightRegister != null) {
          this.complete(right, left, race.rightWins, rightRegister, raceIndicator, cb);
        }
      }
    }, [left.fiberId, right.fiberId], race.trace);
  }

  captureTrace() {
    const exec = this.executionTraces ? this.executionTraces.listReverse : L.empty();
    const stack = this.stackTraces ? this.stackTraces.listReverse : L.empty();
    return new _tracing.Trace(this.id, exec, stack, this.parentTrace);
  }

  cutAncestryTrace(trace) {
    const maxExecLength = this.platform.value.ancestorExecutionTraceLength;
    const maxStackLength = this.platform.value.ancestorStackTraceLength;
    const maxAncestors = this.platform.value.ancestryLength - 1;
    const truncated = (0, _tracing.truncatedParentTrace)(trace, maxAncestors);
    return new _tracing.Trace(trace.fiberId, L.take_(trace.executionTrace, maxExecLength), L.take_(trace.stackTrace, maxStackLength), truncated);
  }

  evaluateNow(i0) {
    var _a, _b;

    try {
      // eslint-disable-next-line prefer-const
      let current = i0;
      currentFiber.set(this);

      while (current != null) {
        try {
          let opCount = 0;

          while (current != null) {
            // Check to see if the fiber should continue executing or not:
            if (!this.shouldInterrupt) {
              // Fiber does not need to be interrupted, but might need to yield:
              if (opCount === this.maxOp) {
                this.evaluateLater(current);
                current = undefined;
              } else {
                // Fiber is neither being interrupted nor needs to yield. Execute
                // the next instruction in the program:
                switch (current._tag) {
                  case "FlatMap":
                    {
                      this.pushContinuation(new ApplyFrame(current.f, current.trace));
                      current = current.val;
                      break;
                    }

                  case "XPure":
                    {
                      const result = X.runEither(X.provideAll_(current, ((_a = this.environments) === null || _a === void 0 ? void 0 : _a.value) || {}));
                      current = result._tag === "Left" ? new _primitives.IFail(t => Cause.traced(Cause.fail(result.left), t())) : new _primitives.ISucceed(result.right);
                      break;
                    }

                  case "TracingStatus":
                    {
                      if (this.traceStatusStack) {
                        this.pushTracingStatus(current.flag);
                        this.stack = new Stack(this.tracingExit, this.stack);
                      }

                      current = current.effect;
                      break;
                    }

                  case "CheckTracingStatus":
                    {
                      current = current.f(this.inTracingRegion);
                      break;
                    }

                  case "Trace":
                    {
                      current = this.nextInstr(this.captureTrace());
                      break;
                    }

                  case "Tracer":
                    {
                      current = current.f(trace => {
                        if (trace && this.platform.value.traceExecution && this.inTracingRegion) {
                          this.addTrace(trace);
                        }
                      });
                      break;
                    }

                  case "Succeed":
                    {
                      if (current.trace && this.platform.value.traceEffects && this.inTracingRegion) {
                        this.addTrace(current.trace);
                      }

                      current = this.nextInstr(current.val);
                      break;
                    }

                  case "EffectTotal":
                    {
                      if (current.trace && this.platform.value.traceEffects && this.inTracingRegion) {
                        this.addTrace(current.trace);
                      }

                      current = this.nextInstr(current.effect());
                      break;
                    }

                  case "Fail":
                    {
                      if (current.trace && this.platform.value.traceEffects && this.inTracingRegion) {
                        this.addTrace(current.trace);
                      }

                      const fullCause = current.fill(() => this.captureTrace());
                      const discardedFolds = this.unwindStack();
                      const maybeRedactedCause = discardedFolds ? // We threw away some error handlers while unwinding the stack because
                      // we got interrupted during this instruction. So it's not safe to return
                      // typed failures from cause0, because they might not be typed correctly.
                      // Instead, we strip the typed failures, and return the remainders and
                      // the interruption.
                      Cause.stripFailures(fullCause) : fullCause;

                      if (this.isStackEmpty) {
                        // Error not caught, stack is empty:
                        const cause = () => {
                          const interrupted = this.state.get.interrupted;
                          const causeAndInterrupt = !Cause.contains(interrupted)(maybeRedactedCause) ? Cause.combineSeq(maybeRedactedCause, interrupted) : maybeRedactedCause;
                          return causeAndInterrupt;
                        };

                        this.setInterrupting(true);
                        current = this.done(Exit.halt(cause()));
                      } else {
                        this.setInterrupting(false); // Error caught, next continuation on the stack will deal
                        // with it, so we just have to compute it here:

                        current = this.nextInstr(maybeRedactedCause);
                      }

                      break;
                    }

                  case "Platform":
                    {
                      if (current.trace && this.inTracingRegion && this.platform.value.traceExecution) {
                        this.addTrace(current.trace);
                      }

                      current = current.f(this.platform);
                      break;
                    }

                  case "Fold":
                    {
                      this.pushContinuation(current);
                      current = current.value;
                      break;
                    }

                  case "InterruptStatus":
                    {
                      if (current.trace && this.inTracingRegion && this.platform.value.traceExecution) {
                        this.addTrace(current.trace);
                      }

                      this.pushInterruptStatus(current.flag.toBoolean);
                      this.stack = new Stack(this.interruptExit, this.stack);
                      current = current.effect;
                      break;
                    }

                  case "CheckInterrupt":
                    {
                      if (current.trace && this.inTracingRegion && this.platform.value.traceExecution) {
                        this.addTrace(current.trace);
                      }

                      current = current.f(Fiber.interruptStatus(this.isInterruptible));
                      break;
                    }

                  case "EffectPartial":
                    {
                      const c = current;

                      try {
                        if (c.trace && this.inTracingRegion && this.platform.value.traceEffects) {
                          this.addTrace(c.trace);
                        }

                        current = this.nextInstr(c.effect());
                      } catch (e) {
                        current = T.fail(c.onThrow(e));
                      }

                      break;
                    }

                  case "EffectAsync":
                    {
                      const epoch = this.asyncEpoch;
                      this.asyncEpoch = epoch + 1;
                      const c = current;
                      current = this.enterAsync(epoch, c.blockingOn);

                      if (!current) {
                        const k = c.register;

                        if (c.trace && this.platform.value.traceEffects && this.inTracingRegion) {
                          this.addTrace(c.trace);
                        }

                        const h = k(this.resumeAsync(epoch));

                        switch (h._tag) {
                          case "None":
                            {
                              current = undefined;
                              break;
                            }

                          case "Some":
                            {
                              if (this.exitAsync(epoch)) {
                                current = h.value;
                              } else {
                                current = undefined;
                              }
                            }
                        }
                      }

                      break;
                    }

                  case "Fork":
                    {
                      if (current.trace && this.platform.value.traceExecution && this.inTracingRegion) {
                        this.addTrace(current.trace);
                      }

                      current = this.nextInstr(this.fork(current.value, current.scope, current.reportFailure));
                      break;
                    }

                  case "Descriptor":
                    {
                      if (current.trace && this.platform.value.traceExecution && this.inTracingRegion) {
                        this.addTrace(current.trace);
                      }

                      current = current.f(this.getDescriptor());
                      break;
                    }

                  case "Yield":
                    {
                      current = undefined;
                      this.evaluateLater(T.unit);
                      break;
                    }

                  case "Read":
                    {
                      if (current.trace && this.platform.value.traceExecution && this.inTracingRegion) {
                        this.addTrace(current.trace);
                      }

                      current = current.f(this.environments ? this.environments.value : {});
                      break;
                    }

                  case "Provide":
                    {
                      if (current.trace && this.platform.value.traceExecution && this.inTracingRegion) {
                        this.addTrace(current.trace);
                      }

                      const c = current;
                      current = T.bracket_(T.succeedWith(() => {
                        this.pushEnv(c.r);
                      }), () => c.next, () => T.succeedWith(() => {
                        this.popEnv();
                      }));
                      break;
                    }

                  case "Suspend":
                    {
                      if (current.trace && this.platform.value.traceExecution && this.inTracingRegion) {
                        this.addTrace(current.trace);
                      }

                      current = current.factory(this.platform, this.fiberId);
                      break;
                    }

                  case "SuspendPartial":
                    {
                      const c = current;

                      try {
                        if (current.trace && this.platform.value.traceExecution && this.inTracingRegion) {
                          this.addTrace(current.trace);
                        }

                        current = c.factory(this.platform, this.fiberId);
                      } catch (e) {
                        current = T.fail(c.onThrow(e));
                      }

                      break;
                    }

                  case "FiberRefNew":
                    {
                      const fiberRef = new FR.Runtime(current.initial, current.onFork, current.onJoin);
                      this.fiberRefLocals.set(fiberRef, current.initial);
                      current = this.nextInstr(fiberRef);
                      break;
                    }

                  case "FiberRefModify":
                    {
                      const c = current;
                      const oldValue = O.fromNullable(this.fiberRefLocals.get(c.fiberRef));

                      if (current.trace && this.platform.value.traceExecution && this.inTracingRegion) {
                        this.addTrace(current.trace);
                      }

                      const {
                        tuple: [result, newValue]
                      } = current.f(O.getOrElse_(oldValue, () => c.fiberRef.initial));
                      this.fiberRefLocals.set(c.fiberRef, newValue);
                      current = this.nextInstr(result);
                      break;
                    }

                  case "RaceWith":
                    {
                      current = this.raceWithImpl(current);
                      break;
                    }

                  case "Supervise":
                    {
                      if (current.trace && this.platform.value.traceExecution && this.inTracingRegion) {
                        this.addTrace(current.trace);
                      }

                      const c = current;
                      const lastSupervisor = this.supervisors.value;
                      const newSupervisor = c.supervisor.and(lastSupervisor);
                      const push = T.succeedWith(() => {
                        this.supervisors = new Stack(newSupervisor, this.supervisors);
                      });
                      const pop = T.succeedWith(() => {
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        this.supervisors = this.supervisors.previous;
                      });
                      current = T.bracket_(push, () => c.effect, () => pop);
                      break;
                    }

                  case "GetForkScope":
                    {
                      const c = current;

                      if (current.trace && this.platform.value.traceExecution && this.inTracingRegion) {
                        this.addTrace(current.trace);
                      }

                      current = c.f(O.getOrElse_(((_b = this.forkScopeOverride) === null || _b === void 0 ? void 0 : _b.value) || O.none, () => this.scope));
                      break;
                    }

                  case "OverrideForkScope":
                    {
                      const c = current;

                      if (current.trace && this.platform.value.traceExecution && this.inTracingRegion) {
                        this.addTrace(current.trace);
                      }

                      const push = T.succeedWith(() => {
                        this.forkScopeOverride = new Stack(c.forkScope, this.forkScopeOverride);
                      });
                      const pop = T.succeedWith(() => {
                        var _a;

                        this.forkScopeOverride = (_a = this.forkScopeOverride) === null || _a === void 0 ? void 0 : _a.previous;
                      });
                      current = T.bracket_(push, () => c.effect, () => pop);
                      break;
                    }

                  default:
                    {
                      throw new _errors.RuntimeError(`operation not supported: ${JSON.stringify(current)}`);
                    }
                }
              }
            } else {
              current = T.halt(this.state.get.interrupted);
              this.setInterrupting(true);
            }

            opCount += 1;
          }
        } catch (e) {
          this.setInterrupting(true);
          current = T.die(e);
        }
      }
    } finally {
      currentFiber.set(null);
    }
  }

}

exports.FiberContext = FiberContext;
//# sourceMappingURL=context.js.map