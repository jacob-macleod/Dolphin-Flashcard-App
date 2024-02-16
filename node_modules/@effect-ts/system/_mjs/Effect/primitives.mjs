import { Base } from "./effect.mjs";
export class IFail extends Base {
  constructor(fill, trace) {
    super();
    this.fill = fill;
    this.trace = trace;
    this._tag = "Fail";
  }

}
export class IFlatMap extends Base {
  constructor(val, f, trace) {
    super();
    this.val = val;
    this.f = f;
    this.trace = trace;
    this._tag = "FlatMap";
  }

}
export class ISucceed extends Base {
  constructor(val, trace) {
    super();
    this.val = val;
    this.trace = trace;
    this._tag = "Succeed";
  }

}
export class ITrace extends Base {
  constructor() {
    super();
    this._tag = "Trace";
  }

}
export class ITracingStatus extends Base {
  constructor(effect, flag) {
    super();
    this.effect = effect;
    this.flag = flag;
    this._tag = "TracingStatus";
  }

}
export class ICheckTracingStatus extends Base {
  constructor(f) {
    super();
    this.f = f;
    this._tag = "CheckTracingStatus";
  }

}
export class IEffectPartial extends Base {
  constructor(effect, onThrow, trace) {
    super();
    this.effect = effect;
    this.onThrow = onThrow;
    this.trace = trace;
    this._tag = "EffectPartial";
  }

}
export class IEffectTotal extends Base {
  constructor(effect, trace) {
    super();
    this.effect = effect;
    this.trace = trace;
    this._tag = "EffectTotal";
  }

}
export class IEffectAsync extends Base {
  constructor(register, blockingOn, trace) {
    super();
    this.register = register;
    this.blockingOn = blockingOn;
    this.trace = trace;
    this._tag = "EffectAsync";
  }

}
export class IFold extends Base {
  constructor(value, failure, apply, trace) {
    super();
    this.value = value;
    this.failure = failure;
    this.apply = apply;
    this.trace = trace;
    this._tag = "Fold";
  }

}
export class IFork extends Base {
  constructor(value, scope, reportFailure, trace) {
    super();
    this.value = value;
    this.scope = scope;
    this.reportFailure = reportFailure;
    this.trace = trace;
    this._tag = "Fork";
  }

}
export class IInterruptStatus extends Base {
  constructor(effect, flag, trace) {
    super();
    this.effect = effect;
    this.flag = flag;
    this.trace = trace;
    this._tag = "InterruptStatus";
  }

}
export class ICheckInterrupt extends Base {
  constructor(f, trace) {
    super();
    this.f = f;
    this.trace = trace;
    this._tag = "CheckInterrupt";
  }

}
export class IDescriptor extends Base {
  constructor(f, trace) {
    super();
    this.f = f;
    this.trace = trace;
    this._tag = "Descriptor";
  }

}
export class IYield extends Base {
  constructor() {
    super();
    this._tag = "Yield";
  }

}
export class IRead extends Base {
  constructor(f, trace) {
    super();
    this.f = f;
    this.trace = trace;
    this._tag = "Read";
  }

}
export class IPlatform extends Base {
  constructor(f, trace) {
    super();
    this.f = f;
    this.trace = trace;
    this._tag = "Platform";
  }

}
export class ITracer extends Base {
  constructor(f, trace) {
    super();
    this.f = f;
    this.trace = trace;
    this._tag = "Tracer";
  }

}
export class IProvide extends Base {
  constructor(r, next, trace) {
    super();
    this.r = r;
    this.next = next;
    this.trace = trace;
    this._tag = "Provide";
  }

}
export class ISuspend extends Base {
  constructor(factory, trace) {
    super();
    this.factory = factory;
    this.trace = trace;
    this._tag = "Suspend";
  }

}
export class ISuspendPartial extends Base {
  constructor(factory, onThrow, trace) {
    super();
    this.factory = factory;
    this.onThrow = onThrow;
    this.trace = trace;
    this._tag = "SuspendPartial";
  }

}
export class IFiberRefNew extends Base {
  constructor(initial, onFork, onJoin) {
    super();
    this.initial = initial;
    this.onFork = onFork;
    this.onJoin = onJoin;
    this._tag = "FiberRefNew";
  }

}
export class IFiberRefModify extends Base {
  constructor(fiberRef, f, trace) {
    super();
    this.fiberRef = fiberRef;
    this.f = f;
    this.trace = trace;
    this._tag = "FiberRefModify";
  }

}
export class IRaceWith extends Base {
  constructor(left, right, leftWins, rightWins, scope, trace) {
    super();
    this.left = left;
    this.right = right;
    this.leftWins = leftWins;
    this.rightWins = rightWins;
    this.scope = scope;
    this.trace = trace;
    this._tag = "RaceWith";
  }

}
export class ISupervise extends Base {
  constructor(effect, supervisor, trace) {
    super();
    this.effect = effect;
    this.supervisor = supervisor;
    this.trace = trace;
    this._tag = "Supervise";
  }

}
export class IGetForkScope extends Base {
  constructor(f, trace) {
    super();
    this.f = f;
    this.trace = trace;
    this._tag = "GetForkScope";
  }

}
export class IOverrideForkScope extends Base {
  constructor(effect, forkScope, trace) {
    super();
    this.effect = effect;
    this.forkScope = forkScope;
    this.trace = trace;
    this._tag = "OverrideForkScope";
  }

}
export * from "./effect.mjs";
//# sourceMappingURL=primitives.mjs.map