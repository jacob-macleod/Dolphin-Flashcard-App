import * as H from "../../../../Hub/index.mjs";
import * as Ensuring from "./ensuring.mjs";
import * as FromChunkHub from "./fromChunkHub.mjs";
/**
 * Creates a stream from a subscription to a hub.
 *
 * The hub will be shut down once the stream is closed.
 */

export function fromChunkHubWithShutdown(hub) {
  return Ensuring.ensuring_(FromChunkHub.fromChunkHub(hub), H.shutdown(hub));
}
//# sourceMappingURL=fromChunkHubWithShutdown.mjs.map