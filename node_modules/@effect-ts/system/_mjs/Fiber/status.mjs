// ets_tracing: off
import * as St from "../Structural/index.mjs";
import * as S from "../Sync/index.mjs";
export class Done {
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
export class Finishing {
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
export class Running {
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
export class Suspended {
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
export function isDone(s) {
  return s._tag === "Done";
}
export function withInterruptingSafe(b) {
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
export function withInterrupting(b) {
  return s => S.run(withInterruptingSafe(b)(s));
}
export function toFinishing(s) {
  return S.run(toFinishingSafe(s));
}
export function toFinishingSafe(s) {
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
//# sourceMappingURL=status.mjs.map