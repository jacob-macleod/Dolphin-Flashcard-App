"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InnerTypeId = exports.Inner = exports.FromKAndTypeId = exports.FromKAnd = exports.ChannelStateEmitTypeId = exports.ChannelStateEmit = exports.ChannelStateEffectTypeId = exports.ChannelStateEffect = exports.ChannelStateDoneTypeId = exports.ChannelStateDone = exports.ChannelExecutor = void 0;
exports.channelStateEffect = channelStateEffect;
exports.channelStateUnroll = channelStateUnroll;
exports.maybeCloseBoth = maybeCloseBoth;

require("../../../../Operator/index.js");

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/List/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var Either = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Either/index.js"));

var Exit = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Exit/index.js"));

var F = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Fiber/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./primitives.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const FromKAndTypeId = /*#__PURE__*/Symbol();
exports.FromKAndTypeId = FromKAndTypeId;

class FromKAnd {
  constructor(fromK, rest) {
    this.fromK = fromK;
    this.rest = rest;
    this._typeId = FromKAndTypeId;
  }

}

exports.FromKAnd = FromKAnd;
const InnerTypeId = /*#__PURE__*/Symbol();
exports.InnerTypeId = InnerTypeId;

class Inner {
  constructor(exec, subK, lastDone, combineSubK, combineSubKAndInner) {
    this.exec = exec;
    this.subK = subK;
    this.lastDone = lastDone;
    this.combineSubK = combineSubK;
    this.combineSubKAndInner = combineSubKAndInner;
    this._typeId = InnerTypeId;
  }

  close(ex) {
    const fin = this.exec.close(ex);

    if (fin) {
      return T.result(fin);
    }
  }

}

exports.Inner = Inner;
const ChannelStateDoneTypeId = /*#__PURE__*/Symbol();
exports.ChannelStateDoneTypeId = ChannelStateDoneTypeId;

class ChannelStateDone {
  constructor() {
    this._typeId = ChannelStateDoneTypeId;
  }

}

exports.ChannelStateDone = ChannelStateDone;
const ChannelStateEmitTypeId = /*#__PURE__*/Symbol();
exports.ChannelStateEmitTypeId = ChannelStateEmitTypeId;

class ChannelStateEmit {
  constructor() {
    this._typeId = ChannelStateEmitTypeId;
  }

}

exports.ChannelStateEmit = ChannelStateEmit;
const ChannelStateEffectTypeId = /*#__PURE__*/Symbol();
exports.ChannelStateEffectTypeId = ChannelStateEffectTypeId;

class ChannelStateEffect {
  constructor(effect) {
    this.effect = effect;
    this._typeId = ChannelStateEffectTypeId;
  }

}

exports.ChannelStateEffect = ChannelStateEffect;

const _ChannelStateDone = /*#__PURE__*/new ChannelStateDone();

const _ChannelStateEmit = /*#__PURE__*/new ChannelStateEmit();

function channelStateEffect(state) {
  if ((state === null || state === void 0 ? void 0 : state._typeId) === ChannelStateEffectTypeId) {
    return state.effect;
  }

  return T.unit;
}

function channelStateUnroll(runStep) {
  const step = runStep();

  switch (step._typeId) {
    case ChannelStateEffectTypeId:
      {
        return T.chain_(step.effect, () => channelStateUnroll(runStep));
      }

    case ChannelStateDoneTypeId:
      {
        return T.succeed(Either.right(_ChannelStateDone));
      }

    case ChannelStateEmitTypeId:
      {
        return T.succeed(Either.left(_ChannelStateEmit));
      }
  }
}

function maybeCloseBoth(l, r) {
  if (l && r) {
    return T.zipWith_(T.result(l), T.result(r), (a, b) => Exit.zipRight_(a, b));
  } else if (l) {
    return T.result(l);
  } else if (r) {
    return T.result(r);
  }
}

const endUnit = /*#__PURE__*/new P.Done(() => void 0);

class ChannelExecutor {
  constructor(initialChannel, providedEnv, executeCloseLastSubstream) {
    this.providedEnv = providedEnv;
    this.executeCloseLastSubstream = executeCloseLastSubstream;
    this.doneStack = L.empty();
    this.currentChannel = initialChannel();
  }

  restorePipe(exit, prev) {
    const currInput = this.input;
    this.input = prev;
    return currInput === null || currInput === void 0 ? void 0 : currInput.close(exit);
  }

  unwindAllFinalizers(acc, conts, exit) {
    while (!L.isEmpty(conts)) {
      const head = L.unsafeFirst(conts);
      ;

      if (head._typeId === P.ContinuationKTypeId) {
        conts = L.tail(conts);
      } else {
        return T.chain_(T.result(head.finalizer(exit)), finExit => this.unwindAllFinalizers(Exit.zipRight_(acc, finExit), L.tail(conts), exit));
      }
    }

    return T.done(acc);
  }

  popAllFinalizers(exit) {
    const effect = T.result(this.unwindAllFinalizers(Exit.unit, this.doneStack, exit));
    this.doneStack = L.empty();
    this.storeInProgressFinalizer(effect);
    return effect;
  }

  popNextFinalizersGo(stack, builder) {
    while (!L.isEmpty(stack)) {
      const head = L.unsafeFirst(stack);
      ;

      if (head._typeId === P.ContinuationKTypeId) {
        return stack;
      }

      L.push_(builder, head);
      stack = L.tail(stack);
    }

    return L.empty();
  }

  popNextFinalizers() {
    const builder = L.emptyPushable();
    this.doneStack = this.popNextFinalizersGo(this.doneStack, builder);
    return builder;
  }

  storeInProgressFinalizer(effect) {
    this.inProgressFinalizer = effect;
  }

  clearInProgressFinalizer() {
    this.inProgressFinalizer = undefined;
  }

  ifNotNull(effect) {
    return effect ? effect : T.succeed(Exit.unit);
  }

  close(ex) {
    const runInProgressFinalizer = this.inProgressFinalizer ? T.ensuring_(this.inProgressFinalizer, T.succeedWith(() => this.clearInProgressFinalizer())) : undefined;
    let closeSubexecutors;

    if (this.subexecutorStack) {
      if (this.subexecutorStack._typeId === InnerTypeId) {
        closeSubexecutors = this.subexecutorStack.close(ex);
      } else {
        const fin1 = this.subexecutorStack.fromK.close(ex);
        const fin2 = this.subexecutorStack.rest.close(ex);

        if (fin1 && fin2) {
          closeSubexecutors = T.zipWith_(T.result(fin1), T.result(fin2), (a, b) => Exit.zipRight_(a, b));
        } else if (fin1) {
          closeSubexecutors = T.result(fin1);
        } else if (fin2) {
          closeSubexecutors = T.result(fin2);
        }
      }
    }

    let closeSelf;
    const selfFinalizers = this.popAllFinalizers(ex);

    if (selfFinalizers) {
      closeSelf = T.ensuring_(selfFinalizers, T.succeedWith(() => this.clearInProgressFinalizer()));
    }

    if (closeSubexecutors || runInProgressFinalizer || closeSelf) {
      return T.uninterruptible(T.map_(T.tuple(this.ifNotNull(closeSubexecutors), this.ifNotNull(runInProgressFinalizer), this.ifNotNull(closeSelf)), ({
        tuple: [a, b, c]
      }) => Exit.zipRight_(a, Exit.zipRight_(b, c))));
    }
  }

  getDone() {
    return this.done;
  }

  getEmit() {
    return this.emitted;
  }

  cancelWith(exit) {
    this.cancelled = exit;
  }

  run() {
    let result = undefined;

    while (!result) {
      if (this.cancelled) {
        result = this.processCancellation();
      } else if (this.subexecutorStack) {
        result = this.drainSubexecutor();
      } else {
        if (!this.currentChannel) {
          result = _ChannelStateDone;
        } else {
          ;
          const currentChannel = this.currentChannel;

          switch (currentChannel._typeId) {
            case P.BridgeTypeId:
              {
                this.currentChannel = currentChannel.channel;

                if (this.input) {
                  const inputExecutor = this.input;
                  this.input = undefined;
                  const drainer = T.zipRight_(currentChannel.input.awaitRead, T.suspend(() => {
                    const state = inputExecutor.run();

                    switch (state._typeId) {
                      case ChannelStateEmitTypeId:
                        {
                          return T.chain_(currentChannel.input.emit(inputExecutor.getEmit()), () => drainer);
                        }

                      case ChannelStateEffectTypeId:
                        {
                          return T.foldCauseM_(state.effect, cause => currentChannel.input.error(cause), () => drainer);
                        }

                      case ChannelStateDoneTypeId:
                        {
                          const done = inputExecutor.getDone();
                          return done._tag === "Success" ? currentChannel.input.done(done.value) : currentChannel.input.error(done.cause);
                        }
                    }
                  }));
                  result = new ChannelStateEffect(T.chain_(T.fork(drainer), fiber => T.succeedWith(() => {
                    this.addFinalizer(new P.ContinuationFinalizer(exit => T.chain_(F.interrupt(fiber), () => T.suspend(() => this.restorePipe(exit, inputExecutor) || T.unit))));
                  })));
                }

                break;
              }

            case P.PipeToTypeId:
              {
                const previousInput = this.input;
                const leftExec = new ChannelExecutor(currentChannel.left, this.providedEnv, this.executeCloseLastSubstream);
                leftExec.input = previousInput;
                this.input = leftExec;
                this.addFinalizer(new P.ContinuationFinalizer(exit => this.restorePipe(exit, previousInput) || T.unit));
                this.currentChannel = currentChannel.right();
                break;
              }

            case P.ReadTypeId:
              {
                result = this.runRead(currentChannel);
                break;
              }

            case P.DoneTypeId:
              {
                result = this.doneSucceed(currentChannel.terminal());
                break;
              }

            case P.HaltTypeId:
              {
                result = this.doneHalt(currentChannel.error());
                break;
              }

            case P.EffectTypeId:
              {
                const peffect = typeof this.providedEnv !== "undefined" ? T.provideAll_(currentChannel.effect, this.providedEnv) : currentChannel.effect;
                result = new ChannelStateEffect(T.foldCauseM_(peffect, cause => {
                  const res = this.doneHalt(cause);

                  if ((res === null || res === void 0 ? void 0 : res._typeId) === ChannelStateEffectTypeId) {
                    return res.effect;
                  } else {
                    return T.unit;
                  }
                }, z => {
                  const res = this.doneSucceed(z);

                  if ((res === null || res === void 0 ? void 0 : res._typeId) === ChannelStateEffectTypeId) {
                    return res.effect;
                  } else {
                    return T.unit;
                  }
                }));
                break;
              }

            case P.EmitTypeId:
              {
                this.emitted = currentChannel.out();
                this.currentChannel = endUnit;
                result = _ChannelStateEmit;
                break;
              }

            case P.EnsuringTypeId:
              {
                this.addFinalizer(new P.ContinuationFinalizer(e => currentChannel.finalizer(e)));
                this.currentChannel = currentChannel.channel;
                break;
              }

            case P.ConcatAllTypeId:
              {
                const innerExecuteLastClose = f => T.succeedWith(() => {
                  const prevLastClose = this.closeLastSubstream ? this.closeLastSubstream : T.unit;
                  this.closeLastSubstream = T.zipRight_(prevLastClose, f);
                });

                const exec = new ChannelExecutor(() => currentChannel.value, this.providedEnv, innerExecuteLastClose);
                exec.input = this.input;
                this.subexecutorStack = new Inner(exec, currentChannel.k, undefined, currentChannel.combineInners, currentChannel.combineAll);
                this.closeLastSubstream = undefined;
                this.currentChannel = undefined;
                break;
              }

            case P.FoldTypeId:
              {
                this.doneStack = L.prepend_(this.doneStack, currentChannel.k);
                this.currentChannel = currentChannel.value;
                break;
              }

            case P.BracketOutTypeId:
              {
                result = this.runBracketOut(currentChannel);
                break;
              }

            case P.ProvideTypeId:
              {
                const previousEnv = this.providedEnv;
                this.providedEnv = currentChannel.env;
                this.currentChannel = currentChannel.channel;
                this.addFinalizer(new P.ContinuationFinalizer(() => T.succeedWith(() => {
                  this.providedEnv = previousEnv;
                })));
                break;
              }

            case P.EffectTotalTypeId:
              {
                result = this.doneSucceed(currentChannel.effect());
                break;
              }

            case P.EffectSuspendTotalTypeId:
              {
                this.currentChannel = currentChannel.effect();
                break;
              }
          }
        }
      }
    }

    return result;
  }

  runReadGo(state, read, input) {
    switch (state._typeId) {
      case ChannelStateEmitTypeId:
        {
          return T.succeedWith(() => {
            this.currentChannel = read.more(input.getEmit());
          });
        }

      case ChannelStateDoneTypeId:
        {
          return T.succeedWith(() => {
            this.currentChannel = read.done.onExit(input.getDone());
          });
        }

      case ChannelStateEffectTypeId:
        {
          return T.foldCauseM_(state.effect, cause => T.succeedWith(() => {
            this.currentChannel = read.done.onHalt(cause);
          }), () => this.runReadGo(input.run(), read, input));
        }
    }
  }

  runRead(read) {
    if (this.input) {
      const input = this.input;
      const state = input.run();

      switch (state._typeId) {
        case ChannelStateEmitTypeId:
          {
            this.currentChannel = read.more(input.getEmit());
            return;
          }

        case ChannelStateDoneTypeId:
          {
            this.currentChannel = read.done.onExit(input.getDone());
            return;
          }

        case ChannelStateEffectTypeId:
          {
            return new ChannelStateEffect(T.foldCauseM_(state.effect, cause => T.succeedWith(() => {
              this.currentChannel = read.done.onHalt(cause);
            }), () => this.runReadGo(input.run(), read, input)));
          }
      }
    } else {
      this.currentChannel = read.more(void 0);
    }
  }

  runBracketOut(bracketOut) {
    return new ChannelStateEffect(T.uninterruptibleMask(mask => T.foldCauseM_(mask.restore(bracketOut.acquire), cause => T.succeedWith(() => {
      this.currentChannel = new P.Halt(() => cause);
    }), out => T.succeedWith(() => {
      this.addFinalizer(new P.ContinuationFinalizer(e => bracketOut.finalizer(out, e)));
      this.currentChannel = new P.Emit(() => out);
    }))));
  }

  addFinalizer(f) {
    this.doneStack = L.prepend_(this.doneStack, f);
  }

  drainSubexecutor() {
    const subexecutorStack = this.subexecutorStack;

    if (subexecutorStack._typeId === InnerTypeId) {
      return this.drainInnerSubExecutor(subexecutorStack);
    } else {
      return this.drainFromKAndSubexecutor(subexecutorStack.fromK, subexecutorStack.rest);
    }
  }

  handleSubexecFailure(exec, rest, self, cause) {
    return self.finishSubexecutorWithCloseEffect(Exit.halt(cause), _ => rest.exec.close(_), _ => exec.close(_));
  }

  drainFromKAndSubexecutor(exec, rest) {
    const run = exec.run();

    switch (run._typeId) {
      case ChannelStateEffectTypeId:
        {
          return new ChannelStateEffect(T.catchAllCause_(run.effect, cause => channelStateEffect(this.handleSubexecFailure(exec, rest, this, cause))));
        }

      case ChannelStateEmitTypeId:
        {
          this.emitted = exec.getEmit();
          return _ChannelStateEmit;
        }

      case ChannelStateDoneTypeId:
        {
          const done = exec.getDone();

          switch (done._tag) {
            case "Failure":
              {
                return this.handleSubexecFailure(exec, rest, this, done.cause);
              }

            case "Success":
              {
                const modifiedRest = new Inner(rest.exec, rest.subK, rest.lastDone ? rest.combineSubK(rest.lastDone, done.value) : done.value, rest.combineSubK, rest.combineSubKAndInner);
                this.closeLastSubstream = exec.close(done);
                this.replaceSubexecutor(modifiedRest);
                return undefined;
              }
          }
        }
    }
  }

  replaceSubexecutor(nextSubExec) {
    this.currentChannel = undefined;
    this.subexecutorStack = nextSubExec;
  }

  finishSubexecutorWithCloseEffect(subexecDone, ...closeFns) {
    this.addFinalizer(new P.ContinuationFinalizer(_ => T.forEachUnit_(closeFns, closeFn => T.chain_(T.succeedWith(() => closeFn(subexecDone)), closeEffect => {
      if (closeEffect) {
        return closeEffect;
      } else {
        return T.unit;
      }
    }))));
    const state = Exit.fold_(subexecDone, e => this.doneHalt(e), a => this.doneSucceed(a));
    this.subexecutorStack = undefined;
    return state;
  }

  doneSucceed(z) {
    if (L.isEmpty(this.doneStack)) {
      this.done = Exit.succeed(z);
      this.currentChannel = undefined;
      return _ChannelStateDone;
    }

    const head = L.unsafeFirst(this.doneStack);
    ;

    if (head._typeId === P.ContinuationKTypeId) {
      this.doneStack = L.tail(this.doneStack);
      this.currentChannel = head.onSuccess(z);
      return;
    } else {
      const finalizers = this.popNextFinalizers();

      if (L.isEmpty(this.doneStack)) {
        this.doneStack = finalizers;
        this.done = Exit.succeed(z);
        this.currentChannel = undefined;
        return _ChannelStateDone;
      } else {
        const finalizerEffect = this.runFinalizers(L.map_(finalizers, _ => _.finalizer), Exit.succeed(z));
        this.storeInProgressFinalizer(finalizerEffect);
        return new ChannelStateEffect(T.chain_(T.uninterruptible(T.ensuring_(finalizerEffect, T.succeedWith(() => {
          this.clearInProgressFinalizer();
        }))), () => T.succeedWith(() => this.doneSucceed(z))));
      }
    }
  }

  runFinalizers(finalizers, ex) {
    if (L.isEmpty(finalizers)) {
      return T.succeed(Exit.unit);
    }

    return T.map_(T.forEach_(finalizers, cont => T.result(cont(ex))), results => O.getOrElse_(Exit.collectAll(...results), () => Exit.unit));
  }

  doneHalt(cause) {
    if (L.isEmpty(this.doneStack)) {
      this.done = Exit.halt(cause);
      this.currentChannel = undefined;
      return _ChannelStateDone;
    }

    const head = L.unsafeFirst(this.doneStack);
    ;

    if (head._typeId === P.ContinuationKTypeId) {
      this.doneStack = L.tail(this.doneStack);
      this.currentChannel = head.onHalt(cause);
      return;
    } else {
      const finalizers = this.popNextFinalizers();

      if (L.isEmpty(this.doneStack)) {
        this.doneStack = finalizers;
        this.done = Exit.halt(cause);
        this.currentChannel = undefined;
        return _ChannelStateDone;
      } else {
        const finalizerEffect = this.runFinalizers(L.map_(finalizers, _ => _.finalizer), Exit.halt(cause));
        this.storeInProgressFinalizer(finalizerEffect);
        return new ChannelStateEffect(T.chain_(T.uninterruptible(T.ensuring_(finalizerEffect, T.succeedWith(() => {
          this.clearInProgressFinalizer();
        }))), () => T.succeedWith(() => this.doneHalt(cause))));
      }
    }
  }

  drainInnerSubExecutor(inner) {
    const run = inner.exec.run();

    switch (run._typeId) {
      case ChannelStateEmitTypeId:
        {
          if (this.closeLastSubstream) {
            const closeLast = this.closeLastSubstream;
            this.closeLastSubstream = undefined;
            return new ChannelStateEffect(T.map_(this.executeCloseLastSubstream(closeLast), _ => {
              const fromK = new ChannelExecutor(() => inner.subK(inner.exec.getEmit()), this.providedEnv, this.executeCloseLastSubstream);
              fromK.input = this.input;
              this.subexecutorStack = new FromKAnd(fromK, inner);
            }));
          } else {
            const fromK = new ChannelExecutor(() => inner.subK(inner.exec.getEmit()), this.providedEnv, this.executeCloseLastSubstream);
            fromK.input = this.input;
            this.subexecutorStack = new FromKAnd(fromK, inner);
            return undefined;
          }
        }

      case ChannelStateDoneTypeId:
        {
          const lastClose = this.closeLastSubstream;
          const done = inner.exec.getDone();

          switch (done._tag) {
            case "Failure":
              {
                return this.finishSubexecutorWithCloseEffect(done, () => lastClose, _ => inner.exec.close(_));
              }

            case "Success":
              {
                const doneValue = Exit.succeed(inner.combineSubKAndInner(inner.lastDone, done.value));
                return this.finishSubexecutorWithCloseEffect(doneValue, () => lastClose, _ => inner.exec.close(_));
              }
          }
        }

      case ChannelStateEffectTypeId:
        {
          const closeLast = this.closeLastSubstream ? this.closeLastSubstream : T.unit;
          this.closeLastSubstream = undefined;
          return new ChannelStateEffect(T.zipRight_(this.executeCloseLastSubstream(closeLast), T.catchAllCause_(run.effect, cause => channelStateEffect(this.finishSubexecutorWithCloseEffect(Exit.halt(cause), _ => inner.exec.close(_), _ => inner.exec.close(_))))));
        }
    }
  }

  processCancellation() {
    this.currentChannel = undefined;
    this.done = this.cancelled;
    this.cancelled = undefined;
    return _ChannelStateDone;
  }

}

exports.ChannelExecutor = ChannelExecutor;
//# sourceMappingURL=executor.js.map