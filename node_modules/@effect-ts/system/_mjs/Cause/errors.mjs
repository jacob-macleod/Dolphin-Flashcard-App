var _a, _b, _c, _d, _e, _f;

import { pretty } from "./Pretty/index.mjs"; //
// @category FiberFailure
//

export const FiberFailureSymbol = /*#__PURE__*/Symbol.for("@matechs/core/symbols/errors/FiberFailure");
export class FiberFailure extends Error {
  constructor(cause) {
    super();
    this.cause = cause;
    this[_a] = "FiberFailure";
    this.pretty = pretty(this.cause);
    this.name = this[FiberFailureSymbol];
    delete this.stack;
  }

}
_a = FiberFailureSymbol;
export const isFiberFailure = u => u instanceof Error && u[FiberFailureSymbol] === "FiberFailure"; //
// @category Untraced
//

export const UntracedSymbol = /*#__PURE__*/Symbol.for("@matechs/core/symbols/errors/Untraced");
export class Untraced extends Error {
  constructor(message) {
    super(message);
    this[_b] = "Untraced";
    delete this.stack;
    this.name = this[UntracedSymbol];
  }

}
_b = UntracedSymbol;
export const isUntraced = u => u instanceof Error && u[UntracedSymbol] === "Untraced"; //
// @category Runtime
//

export const RuntimeSymbol = /*#__PURE__*/Symbol.for("@matechs/core/symbols/errors/Runtime");
export class RuntimeError {
  constructor(message) {
    this.message = message;
    this[_c] = "RuntimeError";
  }

}
_c = RuntimeSymbol;
export const isRuntime = u => u instanceof RuntimeError && u[RuntimeSymbol] === "RuntimeError"; //
// @category Interrupted
//

export const InterruptedSymbol = /*#__PURE__*/Symbol.for("@matechs/core/symbols/errors/Interrupted");
export class InterruptedException extends Error {
  constructor(message) {
    super(message);
    this[_d] = "InterruptedException";
    this.name = this[InterruptedSymbol];
  }

}
_d = InterruptedSymbol;
export const isInterruptedException = u => u instanceof Error && u[InterruptedSymbol] === "InterruptedException"; //
// @category IllegalState
//

export const IllegalStateSymbol = /*#__PURE__*/Symbol.for("@matechs/core/symbols/errors/IllegalState");
export class IllegalStateException extends Error {
  constructor(message) {
    super(message);
    this[_e] = "IllegalStateException";
    this.name = this[IllegalStateSymbol];
  }

}
_e = IllegalStateSymbol;
export const isIllegalStateException = u => u instanceof Error && u[IllegalStateSymbol] === "IllegalStateException"; //
// @category IllegalState
//

export const IllegalArgumentSymbol = /*#__PURE__*/Symbol.for("@matechs/core/symbols/errors/IllegalArgument");
export class IllegalArgumentException extends Error {
  constructor(message) {
    super(message);
    this[_f] = "IllegalArgumentException";
    this.name = this[IllegalArgumentSymbol];
  }

}
_f = IllegalArgumentSymbol;
export const isIllegalArgumentException = u => u instanceof Error && u[IllegalArgumentSymbol] === "IllegalArgumentException";
//# sourceMappingURL=errors.mjs.map