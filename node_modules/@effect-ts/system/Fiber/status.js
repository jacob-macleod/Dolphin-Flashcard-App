"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Suspended = exports.Running = exports.Finishing = exports.Done = void 0;
exports.isDone = isDone;
exports.toFinishing = toFinishing;
exports.toFinishingSafe = toFinishingSafe;
exports.withInterrupting = withInterrupting;
exports.withInterruptingSafe = withInterruptingSafe;

var St = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Structural/index.js"));

var S = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Sync/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class Done {
  constructor() {
    this._tag = "Done";
  }

  get [St.hashSym]() {
    return St.hashString(this._tag);
  }

  [St.equalsSym](that) {
    return that instanceof Done;
  }

}

exports.Done = Done;

class Finishing {
  constructor(interrupting) {
    this.interrupting = interrupting;
    this._tag = "Finishing";
  }

  get [St.hashSym]() {
    return St.combineHash(St.hashString(this._tag), St.hash(this.interrupting));
  }

  [St.equalsSym](that) {
    return that instanceof Finishing && this.interrupting === that.interrupting;
  }

}

exports.Finishing = Finishing;

class Running {
  constructor(interrupting) {
    this.interrupting = interrupting;
    this._tag = "Running";
  }

  get [St.hashSym]() {
    return St.combineHash(St.hashString(this._tag), St.hash(this.interrupting));
  }

  [St.equalsSym](that) {
    return that instanceof Running && this.interrupting === that.interrupting;
  }

}

exports.Running = Running;

class Suspended {
  constructor(previous, interruptible, epoch, blockingOn) {
    this.previous = previous;
    this.interruptible = interruptible;
    this.epoch = epoch;
    this.blockingOn = blockingOn;
    this._tag = "Suspended";
  }

  get [St.hashSym]() {
    return St.combineHash(St.combineHash(St.hashString(this._tag), St.hashPlainObject({
      previous: this.previous,
      interruptible: this.interruptible,
      epoch: this.epoch
    })), St.hashArray(this.blockingOn));
  }

  [St.equalsSym](that) {
    return that instanceof Suspended && St.equals(this.previous, that.previous) && this.interruptible === that.interruptible && this.epoch === that.epoch && this.eqArr(this.blockingOn, that.blockingOn);
  }

  eqArr(a, b) {
    if (a.length !== b.length) {
      return false;
    }

    return a.every((v, i) => St.equals(v, b[i]));
  }

}

exports.Suspended = Suspended;

function isDone(s) {
  return s._tag === "Done";
}

function withInterruptingSafe(b) {
  return s => {
    return S.gen(function* (_) {
      switch (s._tag) {
        case "Done":
          {
            return s;
          }

        case "Finishing":
          {
            return new Finishing(b);
          }

        case "Running":
          {
            return new Running(b);
          }

        case "Suspended":
          {
            return new Suspended(yield* _(withInterruptingSafe(b)(s.previous)), s.interruptible, s.epoch, s.blockingOn);
          }
      }
    });
  };
}

function withInterrupting(b) {
  return s => S.run(withInterruptingSafe(b)(s));
}

function toFinishing(s) {
  return S.run(toFinishingSafe(s));
}

function toFinishingSafe(s) {
  return S.gen(function* (_) {
    switch (s._tag) {
      case "Done":
        {
          return s;
        }

      case "Finishing":
        {
          return s;
        }

      case "Running":
        {
          return s;
        }

      case "Suspended":
        {
          return yield* _(toFinishingSafe(s.previous));
        }
    }
  });
}
//# sourceMappingURL=status.js.map