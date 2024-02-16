// ets_tracing: off
import * as H from "../../../../Hub/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as C from "../core.mjs";
import * as FromQueueWithShutdown from "./fromQueueWithShutdown.mjs";
/**
 * Creates a stream from a subscription to a hub in the context of a managed
 * effect. The managed effect describes subscribing to receive messages from
 * the hub while the stream describes taking messages from the hub.
 */

export function fromHubManaged_(hub, maxChunkSize = C.DEFAULT_CHUNK_SIZE) {
  return M.map_(H.subscribe(hub), FromQueueWithShutdown.fromQueueWithShutdown(maxChunkSize));
}
/**
 * Creates a stream from a subscription to a hub in the context of a managed
 * effect. The managed effect describes subscribing to receive messages from
 * the hub while the stream describes taking messages from the hub.
 *
 * @ets_data_first fromHubManaged_
 */

export function fromHubManaged(maxChunkSize = C.DEFAULT_CHUNK_SIZE) {
  return hub => fromHubManaged_(hub, maxChunkSize);
}
//# sourceMappingURL=fromHubManaged.mjs.map