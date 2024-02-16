"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  IFail: true,
  IFlatMap: true,
  ISucceed: true,
  ITrace: true,
  ITracingStatus: true,
  ICheckTracingStatus: true,
  IEffectPartial: true,
  IEffectTotal: true,
  IEffectAsync: true,
  IFold: true,
  IFork: true,
  IInterruptStatus: true,
  ICheckInterrupt: true,
  IDescriptor: true,
  IYield: true,
  IRead: true,
  IPlatform: true,
  ITracer: true,
  IProvide: true,
  ISuspend: true,
  ISuspendPartial: true,
  IFiberRefNew: true,
  IFiberRefModify: true,
  IRaceWith: true,
  ISupervise: true,
  IGetForkScope: true,
  IOverrideForkScope: true
};
exports.IYield = exports.ITracingStatus = exports.ITracer = exports.ITrace = exports.ISuspendPartial = exports.ISuspend = exports.ISupervise = exports.ISucceed = exports.IRead = exports.IRaceWith = exports.IProvide = exports.IPlatform = exports.IOverrideForkScope = exports.IInterruptStatus = exports.IGetForkScope = exports.IFork = exports.IFold = exports.IFlatMap = exports.IFiberRefNew = exports.IFiberRefModify = exports.IFail = exports.IEffectTotal = exports.IEffectPartial = exports.IEffectAsync = exports.IDescriptor = exports.ICheckTracingStatus = exports.ICheckInterrupt = void 0;

var _effect = /*#__PURE__*/require("./effect.js");

Object.keys(_effect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _effect[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _effect[key];
    }
  });
});

class IFail extends _effect.Base {
  constructor(fill, trace) {
    super();
    this.fill = fill;
    this.trace = trace;
    this._tag = "Fail";
  }

}

exports.IFail = IFail;

class IFlatMap extends _effect.Base {
  constructor(val, f, trace) {
    super();
    this.val = val;
    this.f = f;
    this.trace = trace;
    this._tag = "FlatMap";
  }

}

exports.IFlatMap = IFlatMap;

class ISucceed extends _effect.Base {
  constructor(val, trace) {
    super();
    this.val = val;
    this.trace = trace;
    this._tag = "Succeed";
  }

}

exports.ISucceed = ISucceed;

class ITrace extends _effect.Base {
  constructor() {
    super();
    this._tag = "Trace";
  }

}

exports.ITrace = ITrace;

class ITracingStatus extends _effect.Base {
  constructor(effect, flag) {
    super();
    this.effect = effect;
    this.flag = flag;
    this._tag = "TracingStatus";
  }

}

exports.ITracingStatus = ITracingStatus;

class ICheckTracingStatus extends _effect.Base {
  constructor(f) {
    super();
    this.f = f;
    this._tag = "CheckTracingStatus";
  }

}

exports.ICheckTracingStatus = ICheckTracingStatus;

class IEffectPartial extends _effect.Base {
  constructor(effect, onThrow, trace) {
    super();
    this.effect = effect;
    this.onThrow = onThrow;
    this.trace = trace;
    this._tag = "EffectPartial";
  }

}

exports.IEffectPartial = IEffectPartial;

class IEffectTotal extends _effect.Base {
  constructor(effect, trace) {
    super();
    this.effect = effect;
    this.trace = trace;
    this._tag = "EffectTotal";
  }

}

exports.IEffectTotal = IEffectTotal;

class IEffectAsync extends _effect.Base {
  constructor(register, blockingOn, trace) {
    super();
    this.register = register;
    this.blockingOn = blockingOn;
    this.trace = trace;
    this._tag = "EffectAsync";
  }

}

exports.IEffectAsync = IEffectAsync;

class IFold extends _effect.Base {
  constructor(value, failure, apply, trace) {
    super();
    this.value = value;
    this.failure = failure;
    this.apply = apply;
    this.trace = trace;
    this._tag = "Fold";
  }

}

exports.IFold = IFold;

class IFork extends _effect.Base {
  constructor(value, scope, reportFailure, trace) {
    super();
    this.value = value;
    this.scope = scope;
    this.reportFailure = reportFailure;
    this.trace = trace;
    this._tag = "Fork";
  }

}

exports.IFork = IFork;

class IInterruptStatus extends _effect.Base {
  constructor(effect, flag, trace) {
    super();
    this.effect = effect;
    this.flag = flag;
    this.trace = trace;
    this._tag = "InterruptStatus";
  }

}

exports.IInterruptStatus = IInterruptStatus;

class ICheckInterrupt extends _effect.Base {
  constructor(f, trace) {
    super();
    this.f = f;
    this.trace = trace;
    this._tag = "CheckInterrupt";
  }

}

exports.ICheckInterrupt = ICheckInterrupt;

class IDescriptor extends _effect.Base {
  constructor(f, trace) {
    super();
    this.f = f;
    this.trace = trace;
    this._tag = "Descriptor";
  }

}

exports.IDescriptor = IDescriptor;

class IYield extends _effect.Base {
  constructor() {
    super();
    this._tag = "Yield";
  }

}

exports.IYield = IYield;

class IRead extends _effect.Base {
  constructor(f, trace) {
    super();
    this.f = f;
    this.trace = trace;
    this._tag = "Read";
  }

}

exports.IRead = IRead;

class IPlatform extends _effect.Base {
  constructor(f, trace) {
    super();
    this.f = f;
    this.trace = trace;
    this._tag = "Platform";
  }

}

exports.IPlatform = IPlatform;

class ITracer extends _effect.Base {
  constructor(f, trace) {
    super();
    this.f = f;
    this.trace = trace;
    this._tag = "Tracer";
  }

}

exports.ITracer = ITracer;

class IProvide extends _effect.Base {
  constructor(r, next, trace) {
    super();
    this.r = r;
    this.next = next;
    this.trace = trace;
    this._tag = "Provide";
  }

}

exports.IProvide = IProvide;

class ISuspend extends _effect.Base {
  constructor(factory, trace) {
    super();
    this.factory = factory;
    this.trace = trace;
    this._tag = "Suspend";
  }

}

exports.ISuspend = ISuspend;

class ISuspendPartial extends _effect.Base {
  constructor(factory, onThrow, trace) {
    super();
    this.factory = factory;
    this.onThrow = onThrow;
    this.trace = trace;
    this._tag = "SuspendPartial";
  }

}

exports.ISuspendPartial = ISuspendPartial;

class IFiberRefNew extends _effect.Base {
  constructor(initial, onFork, onJoin) {
    super();
    this.initial = initial;
    this.onFork = onFork;
    this.onJoin = onJoin;
    this._tag = "FiberRefNew";
  }

}

exports.IFiberRefNew = IFiberRefNew;

class IFiberRefModify extends _effect.Base {
  constructor(fiberRef, f, trace) {
    super();
    this.fiberRef = fiberRef;
    this.f = f;
    this.trace = trace;
    this._tag = "FiberRefModify";
  }

}

exports.IFiberRefModify = IFiberRefModify;

class IRaceWith extends _effect.Base {
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

exports.IRaceWith = IRaceWith;

class ISupervise extends _effect.Base {
  constructor(effect, supervisor, trace) {
    super();
    this.effect = effect;
    this.supervisor = supervisor;
    this.trace = trace;
    this._tag = "Supervise";
  }

}

exports.ISupervise = ISupervise;

class IGetForkScope extends _effect.Base {
  constructor(f, trace) {
    super();
    this.f = f;
    this.trace = trace;
    this._tag = "GetForkScope";
  }

}

exports.IGetForkScope = IGetForkScope;

class IOverrideForkScope extends _effect.Base {
  constructor(effect, forkScope, trace) {
    super();
    this.effect = effect;
    this.forkScope = forkScope;
    this.trace = trace;
    this._tag = "OverrideForkScope";
  }

}

exports.IOverrideForkScope = IOverrideForkScope;
//# sourceMappingURL=primitives.js.map