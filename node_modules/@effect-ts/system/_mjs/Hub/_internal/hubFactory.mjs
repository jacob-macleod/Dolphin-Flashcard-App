// ets_tracing: off
import "../../Operator/index.mjs";
import { BoundedHubArb } from "./BoundedHubArb.mjs";
import { BoundedHubPow2 } from "./BoundedHubPow2.mjs";
import { BoundedHubSingle } from "./BoundedHubSingle.mjs";
import { ensureCapacity } from "./errors.mjs";
import { UnboundedHub } from "./UnboundedHub.mjs";

function nextPow2(n) {
  const nextPow = Math.ceil(Math.log(n) / Math.log(2.0));
  return Math.max(Math.pow(2, nextPow), 2);
}

export function makeBounded(requestedCapacity) {
  ensureCapacity(requestedCapacity);

  if (requestedCapacity === 1) {
    return new BoundedHubSingle();
  } else if (nextPow2(requestedCapacity) === requestedCapacity) {
    return new BoundedHubPow2(requestedCapacity);
  } else {
    return new BoundedHubArb(requestedCapacity);
  }
}
export function makeUnbounded() {
  return new UnboundedHub();
}
export * from "./Hub.mjs";
//# sourceMappingURL=hubFactory.mjs.map