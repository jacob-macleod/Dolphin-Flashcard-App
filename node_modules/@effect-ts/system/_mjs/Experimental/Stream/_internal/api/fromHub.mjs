// ets_tracing: off
import * as H from "../../../../Hub/index.mjs";
import * as C from "../core.mjs";
import * as Chain from "./chain.mjs";
import * as FromQueue from "./fromQueue.mjs";
import * as Managed from "./managed.mjs";
/**
 * Creates a stream from a subscription to a hub.
 */

export function fromHub_(hub, maxChunkSize = C.DEFAULT_CHUNK_SIZE) {
  return Chain.chain_(Managed.managed(H.subscribe(hub)), queue => FromQueue.fromQueue_(queue, maxChunkSize));
}
/**
 * Creates a stream from a subscription to a hub.
 *
 * @ets_data_first fromHub_
 */

export function fromHub(maxChunkSize = C.DEFAULT_CHUNK_SIZE) {
  return hub => fromHub_(hub, maxChunkSize);
}
//# sourceMappingURL=fromHub.mjs.map