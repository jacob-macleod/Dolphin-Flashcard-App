// ets_tracing: off
import * as H from "../../../../Hub/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as C from "../core.mjs";
import * as Ensuring from "./ensuring.mjs";
import * as FromHubManaged from "./fromHubManaged.mjs";
/**
 * Creates a stream from a subscription to a hub in the context of a managed
 * effect. The managed effect describes subscribing to receive messages from
 * the hub while the stream describes taking messages from the hub.
 *
 * The hub will be shut down once the stream is closed.
 */

export function fromHubManagedWithShutdown_(hub, maxChunkSize = C.DEFAULT_CHUNK_SIZE) {
  return M.map_(FromHubManaged.fromHubManaged_(hub, maxChunkSize), Ensuring.ensuring(H.shutdown(hub)));
}
/**
 * Creates a stream from a subscription to a hub in the context of a managed
 * effect. The managed effect describes subscribing to receive messages from
 * the hub while the stream describes taking messages from the hub.
 *
 * The hub will be shut down once the stream is closed.
 *
 * @ets_data_first fromHubManagedWithShutdown_
 */

export function fromHubManagedWithShutdown(maxChunkSize = C.DEFAULT_CHUNK_SIZE) {
  return hub => fromHubManagedWithShutdown_(hub, maxChunkSize);
}
//# sourceMappingURL=fromHubManagedWithShutdown.mjs.map