import * as H from "../../../../Hub/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as Ensuring from "./ensuring.mjs";
import * as FromChunkHubManaged from "./fromChunkHubManaged.mjs";
/**
 * Creates a stream from a subscription to a hub in the context of a managed
 * effect. The managed effect describes subscribing to receive messages from
 * the hub while the stream describes taking messages from the hub.
 *
 * The hub will be shut down once the stream is closed.
 */

export function fromChunkHubManagedWithShutdown(hub) {
  return M.map_(FromChunkHubManaged.fromChunkHubManaged(hub), Ensuring.ensuring(H.shutdown(hub)));
}
//# sourceMappingURL=fromChunkHubManagedWithShutdown.mjs.map