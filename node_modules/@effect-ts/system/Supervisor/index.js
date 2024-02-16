"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._stop = exports._continue = exports.Supervisor = exports.Stop = exports.Continue = void 0;
exports.fibersIn = fibersIn;
exports.trackMainFibers = exports.track = exports.propagationOr = exports.propagationAnd = exports.none = exports.mainFibers = void 0;

require("../Operator/index.js");

var SS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/SortedSet/index.js"));

var _core = /*#__PURE__*/require("../Effect/core.js");

var _zip = /*#__PURE__*/require("../Effect/zip.js");

var _runtimeOrd = /*#__PURE__*/require("../Fiber/runtimeOrd.js");

var _index3 = /*#__PURE__*/require("../Support/AtomicReference/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Ported from https://github.com/zio/zio/blob/master/core/shared/src/main/scala/zio/Supervisor.scala
 *
 * Copyright 2020 Michael Arnaldi and the Matechs Garage Contributors.
 */

/**
 * A `Supervisor<A>` is allowed to supervise the launching and termination of
 * fibers, producing some visible value of type `A` from the supervision.
 */
class Supervisor {
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
    return new Supervisor((0, _zip.zip_)(this.value, that.value), (environment, effect, parent, fiber) => propagationAnd(this.unsafeOnStart(environment, effect, parent, fiber), that.unsafeOnStart(environment, effect, parent, fiber)), (value, fiber) => propagationAnd(this.unsafeOnEnd(value, fiber), that.unsafeOnEnd(value, fiber)));
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
    return new Supervisor((0, _zip.zip_)(this.value, that.value), (environment, effect, parent, fiber) => propagationOr(this.unsafeOnStart(environment, effect, parent, fiber), that.unsafeOnStart(environment, effect, parent, fiber)), (value, fiber) => propagationOr(this.unsafeOnEnd(value, fiber), that.unsafeOnEnd(value, fiber)));
  }

}
/**
 * A hint indicating supervision events no longer require propagation.
 */


exports.Supervisor = Supervisor;

class Stop {
  constructor() {
    this._tag = "Stop";
  }

}
/**
 * A hint indicating supervision events require further propagation.
 */


exports.Stop = Stop;

class Continue {
  constructor() {
    this._tag = "Continue";
  }

}

exports.Continue = Continue;

const propagationAnd = (self, that) => self._tag === "Continue" && that._tag === "Continue" ? _continue : _stop;

exports.propagationAnd = propagationAnd;

const propagationOr = (self, that) => self._tag === "Continue" || that._tag === "Continue" ? _continue : _stop;

exports.propagationOr = propagationOr;

const _stop = /*#__PURE__*/new Stop();

exports._stop = _stop;

const _continue = /*#__PURE__*/new Continue();

exports._continue = _continue;
const mainFibers = /*#__PURE__*/new Set();
exports.mainFibers = mainFibers;

function unsafeTrackMain() {
  const interval = new _index3.AtomicReference(undefined);
  return new Supervisor((0, _core.succeedWith)(() => mainFibers), (_, __, ___, fiber) => {
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

const trackMainFibers = /*#__PURE__*/unsafeTrackMain();
/**
 * Creates a new supervisor that tracks children in a set.
 */

exports.trackMainFibers = trackMainFibers;
const track = /*#__PURE__*/(0, _core.suspend)(() => fibersIn(new _index3.AtomicReference(SS.make((0, _runtimeOrd.runtimeOrd)()))));
/**
 * Creates a new supervisor that tracks children in a set.
 */

exports.track = track;

function fibersIn(ref) {
  return (0, _core.succeedWith)(() => new Supervisor((0, _core.succeedWith)(() => ref.get), (_, __, ___, fiber) => {
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


const none = /*#__PURE__*/new Supervisor(_core.unit, () => _continue, () => _continue);
exports.none = none;
//# sourceMappingURL=index.js.map