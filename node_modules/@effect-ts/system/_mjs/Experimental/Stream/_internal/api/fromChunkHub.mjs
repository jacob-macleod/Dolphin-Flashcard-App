import * as H from "../../../../Hub/index.mjs";
import * as Chain from "./chain.mjs";
import * as FromChunkQueue from "./fromChunkQueue.mjs";
import * as Managed from "./managed.mjs";
/**
 * Creates a stream from a subscription to a hub.
 */

export function fromChunkHub(hub) {
  return Chain.chain_(Managed.managed(H.subscribe(hub)), queue => FromChunkQueue.fromChunkQueue(queue));
}
//# sourceMappingURL=fromChunkHub.mjs.map