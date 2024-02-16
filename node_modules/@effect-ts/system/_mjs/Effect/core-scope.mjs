import * as O from "../Option/index.mjs";
import { globalScope } from "../Scope/index.mjs";
import { succeed } from "./core.mjs";
import { IFork, IGetForkScope, IOverrideForkScope, IRaceWith } from "./primitives.mjs";
/**
 * Retrieves the scope that will be used to supervise forked effects.
 */

export const forkScope = /*#__PURE__*/new IGetForkScope(succeed);
export class ForkScopeRestore {
  constructor(scope) {
    this.scope = scope;

    this.restore = (fa, __trace) => new IOverrideForkScope(fa, O.some(this.scope), __trace);
  }

}
/**
 * Captures the fork scope, before overriding it with the specified new
 * scope, passing a function that allows restoring the fork scope to
 * what it was originally.
 */

export function forkScopeMask_(newScope, f, __trace) {
  return forkScopeWith(scope => new IOverrideForkScope(f(new ForkScopeRestore(scope)), O.some(newScope)), __trace);
}
/**
 * Captures the fork scope, before overriding it with the specified new
 * scope, passing a function that allows restoring the fork scope to
 * what it was originally.
 *
 * @ets_data_first forkScopeMask_
 */

export function forkScopeMask(f, __trace) {
  return newScope => forkScopeMask_(newScope, f, __trace);
}
/**
 * Returns an effect that races this effect with the specified effect, calling
 * the specified finisher as soon as one result or the other has been computed.
 */

export function raceWithScope_(left, right, leftWins, rightWins, scope, __trace) {
  return new IRaceWith(left, right, leftWins, rightWins, O.some(scope), __trace);
}
/**
 * Returns an effect that races this effect with the specified effect, calling
 * the specified finisher as soon as one result or the other has been computed.
 *
 * @ets_data_first raceWithScope_
 */

export function raceWithScope(right, leftWins, rightWins, scope, __trace) {
  return left => raceWithScope_(left, right, leftWins, rightWins, scope, __trace);
}
/**
 * Returns an effect that races this effect with the specified effect, calling
 * the specified finisher as soon as one result or the other has been computed.
 */

export function raceWith_(left, right, leftWins, rightWins, __trace) {
  return new IRaceWith(left, right, leftWins, rightWins, O.none, __trace);
}
/**
 * Returns an effect that races this effect with the specified effect, calling
 * the specified finisher as soon as one result or the other has been computed.
 *
 * @ets_data_first raceWith_
 */

export function raceWith(right, leftWins, rightWins, __trace) {
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

export function transplant(f, __trace) {
  return forkScopeWith(scope => f((e, __trace) => new IOverrideForkScope(e, O.some(scope), __trace)), __trace);
}
/**
 * Forks the effect into a new fiber attached to the global scope. Because the
 * new fiber is attached to the global scope, when the fiber executing the
 * returned effect terminates, the forked fiber will continue running.
 */

export function forkDaemon(value, __trace) {
  return new IFork(value, O.some(globalScope), O.none, __trace);
}
/**
 * Forks the effect into a new fiber attached to the global scope. Because the
 * new fiber is attached to the global scope, when the fiber executing the
 * returned effect terminates, the forked fiber will continue running.
 *
 * @ets_data_first forkDaemonReport_
 */

export function forkDaemonReport(reportFailure, __trace) {
  return value => forkDaemonReport_(value, reportFailure, __trace);
}
/**
 * Forks the effect into a new fiber attached to the global scope. Because the
 * new fiber is attached to the global scope, when the fiber executing the
 * returned effect terminates, the forked fiber will continue running.
 */

export function forkDaemonReport_(value, reportFailure, __trace) {
  return new IFork(value, O.some(globalScope), O.some(reportFailure), __trace);
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

export function forkIn(scope, __trace) {
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

export function forkIn_(value, scope, __trace) {
  return new IFork(value, O.some(scope), O.none, __trace);
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

export function forkInReport(scope, reportFailure, __trace) {
  return value => new IFork(value, O.some(scope), O.some(reportFailure), __trace);
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

export function forkInReport_(value, scope, reportFailure, __trace) {
  return new IFork(value, O.some(scope), O.some(reportFailure), __trace);
}
/**
 * Retrieves the scope that will be used to supervise forked effects.
 */

export function forkScopeWith(f, __trace) {
  return new IGetForkScope(f, __trace);
}
/**
 * Returns a new effect that will utilize the specified scope to supervise
 * any fibers forked within the original effect.
 *
 * @ets_data_first overrideForkScope_
 */

export function overrideForkScope(scope, __trace) {
  return self => new IOverrideForkScope(self, O.some(scope), __trace);
}
/**
 * Returns a new effect that will utilize the specified scope to supervise
 * any fibers forked within the original effect.
 */

export function overrideForkScope_(self, scope, __trace) {
  return new IOverrideForkScope(self, O.some(scope), __trace);
}
/**
 * Returns a new effect that will utilize the default scope (fiber scope) to
 * supervise any fibers forked within the original effect.
 */

export function resetForkScope(self, __trace) {
  return new IOverrideForkScope(self, O.none, __trace);
}
//# sourceMappingURL=core-scope.mjs.map