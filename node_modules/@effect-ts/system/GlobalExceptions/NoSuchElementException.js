"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrematureGeneratorExitTag = exports.PrematureGeneratorExit = exports.NoSuchElementExceptionTag = exports.NoSuchElementException = void 0;
// ets_tracing: off
const NoSuchElementExceptionTag = "NoSuchElementException";
exports.NoSuchElementExceptionTag = NoSuchElementExceptionTag;

class NoSuchElementException {
  constructor() {
    this._tag = NoSuchElementExceptionTag;
  }

}

exports.NoSuchElementException = NoSuchElementException;
const PrematureGeneratorExitTag = "PrematureGeneratorExit";
exports.PrematureGeneratorExitTag = PrematureGeneratorExitTag;

class PrematureGeneratorExit extends Error {
  constructor() {
    super("Something very wrong has happened. Replaying values resulted in a premature end of the generator execution. Provided generator should be pure and perform effects only by yielding them, so that the generator can safely be re-run without side effects.");
    this._tag = PrematureGeneratorExitTag;
  }

}

exports.PrematureGeneratorExit = PrematureGeneratorExit;
//# sourceMappingURL=NoSuchElementException.js.map