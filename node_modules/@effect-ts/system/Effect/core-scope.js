"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForkScopeRestore = void 0;
exports.forkDaemon = forkDaemon;
exports.forkDaemonReport = forkDaemonReport;
exports.forkDaemonReport_ = forkDaemonReport_;
exports.forkIn = forkIn;
exports.forkInReport = forkInReport;
exports.forkInReport_ = forkInReport_;
exports.forkIn_ = forkIn_;
exports.forkScope = void 0;
exports.forkScopeMask = forkScopeMask;
exports.forkScopeMask_ = forkScopeMask_;
exports.forkScopeWith = forkScopeWith;
exports.overrideForkScope = overrideForkScope;
exports.overrideForkScope_ = overrideForkScope_;
exports.raceWith = raceWith;
exports.raceWithScope = raceWithScope;
exports.raceWithScope_ = raceWithScope_;
exports.raceWith_ = raceWith_;
exports.resetForkScope = resetForkScope;
exports.transplant = transplant;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var _index2 = /*#__PURE__*/require("../Scope/index.js");

var _core = /*#__PURE__*/require("./core.js");

var _primitives = /*#__PURE__*/require("./primitives.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Retrieves the scope that will be used to supervise forked effects.
 */
const forkScope = /*#__PURE__*/new _primitives.IGetForkScope(_core.succeed);
exports.forkScope = forkScope;

class ForkScopeRestore {
  constructor(scope) {
    this.scope = scope;

    this.restore = (fa, __trace) => new _primitives.IOverrideForkScope(fa, O.some(this.scope), __trace);
  }

}
/**
 * Captures the fork scope, before overriding it with the specified new
 * scope, passing a function that allows restoring the fork scope to
 * what it was originally.
 */


exports.ForkScopeRestore = ForkScopeRestore;

function forkScopeMask_(newScope, f, __trace) {
  return forkScopeWith(scope => new _primitives.IOverrideForkScope(f(new ForkScopeRestore(scope)), O.some(newScope)), __trace);
}
/**
 * Captures the fork scope, before overriding it with the specified new
 * scope, passing a function that allows restoring the fork scope to
 * what it was originally.
 *
 * @ets_data_first forkScopeMask_
 */


function forkScopeMask(f, __trace) {
  return newScope => forkScopeMask_(newScope, f, __trace);
}
/**
 * Returns an effect that races this effect with the specified effect, calling
 * the specified finisher as soon as one result or the other has been computed.
 */


function raceWithScope_(left, right, leftWins, rightWins, scope, __trace) {
  return new _primitives.IRaceWith(left, right, leftWins, rightWins, O.some(scope), __trace);
}
/**
 * Returns an effect that races this effect with the specified effect, calling
 * the specified finisher as soon as one result or the other has been computed.
 *
 * @ets_data_first raceWithScope_
 */


function raceWithScope(right, leftWins, rightWins, scope, __trace) {
  return left => raceWithScope_(left, right, leftWins, rightWins, scope, __trace);
}
/**
 * Returns an effect that races this effect with the specified effect, calling
 * the specified finisher as soon as one result or the other has been computed.
 */


function raceWith_(left, right, leftWins, rightWins, __trace) {
  return new _primitives.IRaceWith(left, right, leftWins, rightWins, O.none, __trace);
}
/**
 * Returns an effect that races this effect with the specified effect, calling
 * the specified finisher as soon as one result or the other has been computed.
 *
 * @ets_data_first raceWith_
 */


function raceWith(right, leftWins, rightWins, __trace) {
  return left => raceWith_(left, right, leftWins, rightWins, __trace);
}
/**
 * Transplants specified effects so that when those effects fork other
 * effects, the forked effects will be governed by the scope of the
 * fiber that executes this effect.
 *
 * This can be used to "graft" deep grandchildren onto a higher-level
 * scope, effectively extending their lifespans into the parent scope.
 */


function transplant(f, __trace) {
  return forkScopeWith(scope => f((e, __trace) => new _primitives.IOverrideForkScope(e, O.some(scope), __trace)), __trace);
}
/**
 * Forks the effect into a new fiber attached to the global scope. Because the
 * new fiber is attached to the global scope, when the fiber executing the
 * returned effect terminates, the forked fiber will continue running.
 */


function forkDaemon(value, __trace) {
  return new _primitives.IFork(value, O.some(_index2.globalScope), O.none, __trace);
}
/**
 * Forks the effect into a new fiber attached to the global scope. Because the
 * new fiber is attached to the global scope, when the fiber executing the
 * returned effect terminates, the forked fiber will continue running.
 *
 * @ets_data_first forkDaemonReport_
 */


function forkDaemonReport(reportFailure, __trace) {
  return value => forkDaemonReport_(value, reportFailure, __trace);
}
/**
 * Forks the effect into a new fiber attached to the global scope. Because the
 * new fiber is attached to the global scope, when the fiber executing the
 * returned effect terminates, the forked fiber will continue running.
 */


function forkDaemonReport_(value, reportFailure, __trace) {
  return new _primitives.IFork(value, O.some(_index2.globalScope), O.some(reportFailure), __trace);
}
/**
 * Returns an effect that forks this effect into its own separate fiber,
 * returning the fiber immediately, without waiting for it to begin
 * executing the effect.
 *
 * The returned fiber can be used to interrupt the forked fiber, await its
 * result, or join the fiber. See `Fiber` for more information.
 *
 * The fiber is forked with interrupt supervision mode, meaning that when the
 * fiber that forks the child exits, the child will be interrupted.
 *
 * @ets_data_first forkIn_
 */


function forkIn(scope, __trace) {
  return value => forkIn_(value, scope, __trace);
}
/**
 * Returns an effect that forks this effect into its own separate fiber,
 * returning the fiber immediately, without waiting for it to begin
 * executing the effect.
 *
 * The returned fiber can be used to interrupt the forked fiber, await its
 * result, or join the fiber. See `Fiber` for more information.
 *
 * The fiber is forked with interrupt supervision mode, meaning that when the
 * fiber that forks the child exits, the child will be interrupted.
 */


function forkIn_(value, scope, __trace) {
  return new _primitives.IFork(value, O.some(scope), O.none, __trace);
}
/**
 * Returns an effect that forks this effect into its own separate fiber,
 * returning the fiber immediately, without waiting for it to begin
 * executing the effect.
 *
 * The returned fiber can be used to interrupt the forked fiber, await its
 * result, or join the fiber. See `Fiber` for more information.
 *
 * The fiber is forked with interrupt supervision mode, meaning that when the
 * fiber that forks the child exits, the child will be interrupted.
 *
 * @ets_data_first forkInReport_
 */


function forkInReport(scope, reportFailure, __trace) {
  return value => new _primitives.IFork(value, O.some(scope), O.some(reportFailure), __trace);
}
/**
 * Returns an effect that forks this effect into its own separate fiber,
 * returning the fiber immediately, without waiting for it to begin
 * executing the effect.
 *
 * The returned fiber can be used to interrupt the forked fiber, await its
 * result, or join the fiber. See `Fiber` for more information.
 *
 * The fiber is forked with interrupt supervision mode, meaning that when the
 * fiber that forks the child exits, the child will be interrupted.
 */


function forkInReport_(value, scope, reportFailure, __trace) {
  return new _primitives.IFork(value, O.some(scope), O.some(reportFailure), __trace);
}
/**
 * Retrieves the scope that will be used to supervise forked effects.
 */


function forkScopeWith(f, __trace) {
  return new _primitives.IGetForkScope(f, __trace);
}
/**
 * Returns a new effect that will utilize the specified scope to supervise
 * any fibers forked within the original effect.
 *
 * @ets_data_first overrideForkScope_
 */


function overrideForkScope(scope, __trace) {
  return self => new _primitives.IOverrideForkScope(self, O.some(scope), __trace);
}
/**
 * Returns a new effect that will utilize the specified scope to supervise
 * any fibers forked within the original effect.
 */


function overrideForkScope_(self, scope, __trace) {
  return new _primitives.IOverrideForkScope(self, O.some(scope), __trace);
}
/**
 * Returns a new effect that will utilize the default scope (fiber scope) to
 * supervise any fibers forked within the original effect.
 */


function resetForkScope(self, __trace) {
  return new _primitives.IOverrideForkScope(self, O.none, __trace);
}
//# sourceMappingURL=core-scope.js.map