// ets_tracing: off
import { AtomicNumber } from "../Support/AtomicNumber/index.mjs";
/**
 * Constructs a Fiber ID
 */

export function FiberID(startTimeMillis, seqNumber) {
  return {
    _tag: "FiberID",
    seqNumber,
    startTimeMillis
  };
}
/**
 * A sentinel value to indicate a fiber without identity.
 */

export const None = /*#__PURE__*/FiberID(0, 0);
/**
 * Checks equality of Fiber IDs
 */

export function equalsFiberID(x, y) {
  return x.seqNumber === y.seqNumber && x.startTimeMillis === y.startTimeMillis;
}

const _fiberCounter = /*#__PURE__*/new AtomicNumber(0);
/**
 * Constructs a new Fiber ID using current time and global increment
 */


export function newFiberId() {
  return FiberID(new Date().getTime(), _fiberCounter.getAndIncrement());
}
/**
 * Format a fiber id
 */

export function prettyFiberId(_) {
  return `#${_.seqNumber} (started at: ${new Date(_.startTimeMillis).toISOString()})`;
}
//# sourceMappingURL=id.mjs.map