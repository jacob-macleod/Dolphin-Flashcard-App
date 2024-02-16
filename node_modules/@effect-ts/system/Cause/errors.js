"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUntraced = exports.isRuntime = exports.isInterruptedException = exports.isIllegalStateException = exports.isIllegalArgumentException = exports.isFiberFailure = exports.UntracedSymbol = exports.Untraced = exports.RuntimeSymbol = exports.RuntimeError = exports.InterruptedSymbol = exports.InterruptedException = exports.IllegalStateSymbol = exports.IllegalStateException = exports.IllegalArgumentSymbol = exports.IllegalArgumentException = exports.FiberFailureSymbol = exports.FiberFailure = void 0;

var _index = /*#__PURE__*/require("./Pretty/index.js");

var _a, _b, _c, _d, _e, _f;

//
// @category FiberFailure
//
const FiberFailureSymbol = /*#__PURE__*/Symbol.for("@matechs/core/symbols/errors/FiberFailure");
exports.FiberFailureSymbol = FiberFailureSymbol;

class FiberFailure extends Error {
  constructor(cause) {
    super();
    this.cause = cause;
    this[_a] = "FiberFailure";
    this.pretty = (0, _index.pretty)(this.cause);
    this.name = this[FiberFailureSymbol];
    delete this.stack;
  }

}

exports.FiberFailure = FiberFailure;
_a = FiberFailureSymbol;

const isFiberFailure = u => u instanceof Error && u[FiberFailureSymbol] === "FiberFailure"; //
// @category Untraced
//


exports.isFiberFailure = isFiberFailure;
const UntracedSymbol = /*#__PURE__*/Symbol.for("@matechs/core/symbols/errors/Untraced");
exports.UntracedSymbol = UntracedSymbol;

class Untraced extends Error {
  constructor(message) {
    super(message);
    this[_b] = "Untraced";
    delete this.stack;
    this.name = this[UntracedSymbol];
  }

}

exports.Untraced = Untraced;
_b = UntracedSymbol;

const isUntraced = u => u instanceof Error && u[UntracedSymbol] === "Untraced"; //
// @category Runtime
//


exports.isUntraced = isUntraced;
const RuntimeSymbol = /*#__PURE__*/Symbol.for("@matechs/core/symbols/errors/Runtime");
exports.RuntimeSymbol = RuntimeSymbol;

class RuntimeError {
  constructor(message) {
    this.message = message;
    this[_c] = "RuntimeError";
  }

}

exports.RuntimeError = RuntimeError;
_c = RuntimeSymbol;

const isRuntime = u => u instanceof RuntimeError && u[RuntimeSymbol] === "RuntimeError"; //
// @category Interrupted
//


exports.isRuntime = isRuntime;
const InterruptedSymbol = /*#__PURE__*/Symbol.for("@matechs/core/symbols/errors/Interrupted");
exports.InterruptedSymbol = InterruptedSymbol;

class InterruptedException extends Error {
  constructor(message) {
    super(message);
    this[_d] = "InterruptedException";
    this.name = this[InterruptedSymbol];
  }

}

exports.InterruptedException = InterruptedException;
_d = InterruptedSymbol;

const isInterruptedException = u => u instanceof Error && u[InterruptedSymbol] === "InterruptedException"; //
// @category IllegalState
//


exports.isInterruptedException = isInterruptedException;
const IllegalStateSymbol = /*#__PURE__*/Symbol.for("@matechs/core/symbols/errors/IllegalState");
exports.IllegalStateSymbol = IllegalStateSymbol;

class IllegalStateException extends Error {
  constructor(message) {
    super(message);
    this[_e] = "IllegalStateException";
    this.name = this[IllegalStateSymbol];
  }

}

exports.IllegalStateException = IllegalStateException;
_e = IllegalStateSymbol;

const isIllegalStateException = u => u instanceof Error && u[IllegalStateSymbol] === "IllegalStateException"; //
// @category IllegalState
//


exports.isIllegalStateException = isIllegalStateException;
const IllegalArgumentSymbol = /*#__PURE__*/Symbol.for("@matechs/core/symbols/errors/IllegalArgument");
exports.IllegalArgumentSymbol = IllegalArgumentSymbol;

class IllegalArgumentException extends Error {
  constructor(message) {
    super(message);
    this[_f] = "IllegalArgumentException";
    this.name = this[IllegalArgumentSymbol];
  }

}

exports.IllegalArgumentException = IllegalArgumentException;
_f = IllegalArgumentSymbol;

const isIllegalArgumentException = u => u instanceof Error && u[IllegalArgumentSymbol] === "IllegalArgumentException";

exports.isIllegalArgumentException = isIllegalArgumentException;
//# sourceMappingURL=errors.js.map