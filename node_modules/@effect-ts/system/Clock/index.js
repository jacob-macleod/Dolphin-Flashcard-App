"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Clock = void 0;
Object.defineProperty(exports, "ClockId", {
  enumerable: true,
  get: function () {
    return _id.ClockId;
  }
});
exports.provideTestClock = exports.currentTime = exports.TestClock = exports.ProxyClock = exports.LiveClock = exports.HasTestClock = exports.HasClock = void 0;
exports.sleep = sleep;
exports.withClockM = exports.withClock = void 0;

require("../Operator/index.js");

var _core = /*#__PURE__*/require("../Effect/core.js");

var _effectAsyncInterrupt = /*#__PURE__*/require("../Effect/effectAsyncInterrupt.js");

var _has = /*#__PURE__*/require("../Effect/has.js");

var _index2 = /*#__PURE__*/require("../Has/index.js");

var _id = /*#__PURE__*/require("./id.js");

// ets_tracing: off

/**
 * Ported from https://github.com/zio/zio/blob/master/core/shared/src/main/scala/zio/Clock.scala
 *
 * Copyright 2020 Michael Arnaldi and the Matechs Garage Contributors.
 */
//
// Clock Definition
//
class Clock {
  constructor() {
    this.serviceId = _id.ClockId;
  }

} //
// Has Clock
//


exports.Clock = Clock;
const HasClock = /*#__PURE__*/(0, _index2.tag)(_id.ClockId); //
// Live Clock Implementation
//

exports.HasClock = HasClock;

class LiveClock extends Clock {
  constructor() {
    super(...arguments);
    this.currentTime = (0, _core.succeedWith)(() => new Date().getTime());

    this.sleep = (ms, trace) => (0, _effectAsyncInterrupt.effectAsyncInterrupt)(cb => {
      const timeout = setTimeout(() => {
        cb(_core.unit);
      }, ms);
      return (0, _core.succeedWith)(() => {
        clearTimeout(timeout);
      });
    }, trace);
  }

} //
// Proxy Clock Implementation
//


exports.LiveClock = LiveClock;

class ProxyClock extends Clock {
  constructor(currentTime, sleep) {
    super();
    this.currentTime = currentTime;
    this.sleep = sleep;
  }

}
/**
 * Get the current time in ms since epoch
 */


exports.ProxyClock = ProxyClock;
const currentTime = /*#__PURE__*/(0, _has.accessServiceM)(HasClock)(_ => _.currentTime);
/**
 * Sleeps for the provided amount of ms
 */

exports.currentTime = currentTime;

function sleep(ms, __trace) {
  return (0, _has.accessServiceM)(HasClock)(_ => _.sleep(ms, __trace));
}
/**
 * Access clock from environment
 */


const withClockM = /*#__PURE__*/(0, _has.accessServiceM)(HasClock);
/**
 * Access clock from environment
 */

exports.withClockM = withClockM;
const withClock = /*#__PURE__*/(0, _has.accessService)(HasClock); //
// TestClock
//

exports.withClock = withClock;

class TestClock extends Clock {
  constructor() {
    super(...arguments);
    this.time = new Date().getTime();
    this.currentTime = (0, _core.succeedWith)(() => this.time);

    this.sleep = () => _core.unit;

    this.advance = ms => (0, _core.succeedWith)(() => {
      this.time = this.time + ms;
    });
  }

}

exports.TestClock = TestClock;

TestClock.advance = ms => (0, _has.accessServiceM)(HasTestClock)(_ => _.advance(ms));
/**
 * Accesses the TestClock
 */


const HasTestClock = /*#__PURE__*/(0, _index2.tag)(_id.ClockId); // @ts-expect-error

exports.HasTestClock = HasTestClock;
const provideTestClock = /*#__PURE__*/(0, _has.provideServiceM)(HasTestClock)( /*#__PURE__*/(0, _core.succeedWith)(() => new TestClock()));
exports.provideTestClock = provideTestClock;
//# sourceMappingURL=index.js.map