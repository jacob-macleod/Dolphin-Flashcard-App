// ets_tracing: off

/**
 * Ported from https://github.com/zio/zio/blob/master/core/shared/src/main/scala/zio/Supervisor.scala
 *
 * Copyright 2020 Michael Arnaldi and the Matechs Garage Contributors.
 */
import "../Operator/index.mjs";
import * as SS from "../Collections/Immutable/SortedSet/index.mjs";
import { succeedWith, suspend, unit } from "../Effect/core.mjs";
import { zip_ } from "../Effect/zip.mjs";
import { runtimeOrd } from "../Fiber/runtimeOrd.mjs";
import { AtomicReference } from "../Support/AtomicReference/index.mjs";
/**
 * A `Supervisor<A>` is allowed to supervise the launching and termination of
 * fibers, producing some visible value of type `A` from the supervision.
 */

export class Supervisor {
  constructor(value, unsafeOnStart, unsafeOnEnd) {
    this.value = value;
    this.unsafeOnStart = unsafeOnStart;
    this.unsafeOnEnd = unsafeOnEnd;
  }
  /**
   * Returns a new supervisor that performs the function of this supervisor,
   * and the function of the specified supervisor, producing a tuple of the
   * outputs produced by both supervisors.
   *
   * The composite supervisor indicates that it has fully handled the
   * supervision event if only both component supervisors indicate they have
   * handled the supervision event.
   */


  and(that) {
    return new Supervisor(zip_(this.value, that.value), (environment, effect, parent, fiber) => propagationAnd(this.unsafeOnStart(environment, effect, parent, fiber), that.unsafeOnStart(environment, effect, parent, fiber)), (value, fiber) => propagationAnd(this.unsafeOnEnd(value, fiber), that.unsafeOnEnd(value, fiber)));
  }
  /**
   * Returns a new supervisor that performs the function of this supervisor,
   * and the function of the specified supervisor, producing a tuple of the
   * outputs produced by both supervisors.
   *
   * The composite supervisor indicates that it has fully handled the
   * supervision event if either component supervisors indicate they have
   * handled the supervision event.
   */


  or(that) {
    return new Supervisor(zip_(this.value, that.value), (environment, effect, parent, fiber) => propagationOr(this.unsafeOnStart(environment, effect, parent, fiber), that.unsafeOnStart(environment, effect, parent, fiber)), (value, fiber) => propagationOr(this.unsafeOnEnd(value, fiber), that.unsafeOnEnd(value, fiber)));
  }

}
/**
 * A hint indicating supervision events no longer require propagation.
 */

export class Stop {
  constructor() {
    this._tag = "Stop";
  }

}
/**
 * A hint indicating supervision events require further propagation.
 */

export class Continue {
  constructor() {
    this._tag = "Continue";
  }

}
export const propagationAnd = (self, that) => self._tag === "Continue" && that._tag === "Continue" ? _continue : _stop;
export const propagationOr = (self, that) => self._tag === "Continue" || that._tag === "Continue" ? _continue : _stop;
export const _stop = /*#__PURE__*/new Stop();
export const _continue = /*#__PURE__*/new Continue();
export const mainFibers = /*#__PURE__*/new Set();

function unsafeTrackMain() {
  const interval = new AtomicReference(undefined);
  return new Supervisor(succeedWith(() => mainFibers), (_, __, ___, fiber) => {
    if (mainFibers.has(fiber)) {
      if (typeof interval.get === "undefined") {
        interval.set(setInterval(() => {// keep process alive
        }, 60000));
      }
    }

    return _continue;
  }, (_, fiber) => {
    mainFibers.delete(fiber);

    if (mainFibers.size === 0) {
      const ci = interval.get;

      if (ci) {
        clearInterval(ci);
      }
    }

    return _continue;
  });
}

export const trackMainFibers = /*#__PURE__*/unsafeTrackMain();
/**
 * Creates a new supervisor that tracks children in a set.
 */

export const track = /*#__PURE__*/suspend(() => fibersIn(new AtomicReference(SS.make(runtimeOrd()))));
/**
 * Creates a new supervisor that tracks children in a set.
 */

export function fibersIn(ref) {
  return succeedWith(() => new Supervisor(succeedWith(() => ref.get), (_, __, ___, fiber) => {
    ref.set(SS.add_(ref.get, fiber));
    return _continue;
  }, (_, fiber) => {
    ref.set(SS.remove_(ref.get, fiber));
    return _continue;
  }));
}
/**
 * A supervisor that doesn't do anything in response to supervision events.
 */

export const none = /*#__PURE__*/new Supervisor(unit, () => _continue, () => _continue);
//# sourceMappingURL=index.mjs.map