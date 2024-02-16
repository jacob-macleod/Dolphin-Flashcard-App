import * as H from "../../../../Hub/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as FromChunkQueue from "./fromChunkQueue.mjs";
/**
 * Creates a stream from a subscription to a hub in the context of a managed
 * effect. The managed effect describes subscribing to receive messages from
 * the hub while the stream describes taking messages from the hub.
 */

export function fromChunkHubManaged(hub) {
  return M.map_(H.subscribe(hub), queue => FromChunkQueue.fromChunkQueue(queue));
}
//# sourceMappingURL=fromChunkHubManaged.mjs.map