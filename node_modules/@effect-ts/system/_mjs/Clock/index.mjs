// ets_tracing: off

/**
 * Ported from https://github.com/zio/zio/blob/master/core/shared/src/main/scala/zio/Clock.scala
 *
 * Copyright 2020 Michael Arnaldi and the Matechs Garage Contributors.
 */
import "../Operator/index.mjs";
import { succeedWith, unit } from "../Effect/core.mjs";
import { effectAsyncInterrupt } from "../Effect/effectAsyncInterrupt.mjs";
import { accessService, accessServiceM, provideServiceM } from "../Effect/has.mjs";
import { tag } from "../Has/index.mjs";
import { ClockId } from "./id.mjs";
export { ClockId }; //
// Clock Definition
//

export class Clock {
  constructor() {
    this.serviceId = ClockId;
  }

} //
// Has Clock
//

export const HasClock = /*#__PURE__*/tag(ClockId); //
// Live Clock Implementation
//

export class LiveClock extends Clock {
  constructor() {
    super(...arguments);
    this.currentTime = succeedWith(() => new Date().getTime());

    this.sleep = (ms, trace) => effectAsyncInterrupt(cb => {
      const timeout = setTimeout(() => {
        cb(unit);
      }, ms);
      return succeedWith(() => {
        clearTimeout(timeout);
      });
    }, trace);
  }

} //
// Proxy Clock Implementation
//

export class ProxyClock extends Clock {
  constructor(currentTime, sleep) {
    super();
    this.currentTime = currentTime;
    this.sleep = sleep;
  }

}
/**
 * Get the current time in ms since epoch
 */

export const currentTime = /*#__PURE__*/accessServiceM(HasClock)(_ => _.currentTime);
/**
 * Sleeps for the provided amount of ms
 */

export function sleep(ms, __trace) {
  return accessServiceM(HasClock)(_ => _.sleep(ms, __trace));
}
/**
 * Access clock from environment
 */

export const withClockM = /*#__PURE__*/accessServiceM(HasClock);
/**
 * Access clock from environment
 */

export const withClock = /*#__PURE__*/accessService(HasClock); //
// TestClock
//

export class TestClock extends Clock {
  constructor() {
    super(...arguments);
    this.time = new Date().getTime();
    this.currentTime = succeedWith(() => this.time);

    this.sleep = () => unit;

    this.advance = ms => succeedWith(() => {
      this.time = this.time + ms;
    });
  }

}

TestClock.advance = ms => accessServiceM(HasTestClock)(_ => _.advance(ms));
/**
 * Accesses the TestClock
 */


export const HasTestClock = /*#__PURE__*/tag(ClockId); // @ts-expect-error

export const provideTestClock = /*#__PURE__*/provideServiceM(HasTestClock)( /*#__PURE__*/succeedWith(() => new TestClock()));
//# sourceMappingURL=index.mjs.map