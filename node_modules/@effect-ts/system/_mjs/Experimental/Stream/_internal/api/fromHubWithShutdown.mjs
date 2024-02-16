// ets_tracing: off
import * as H from "../../../../Hub/index.mjs";
import * as C from "../core.mjs";
import * as Ensuring from "./ensuring.mjs";
import * as FromHub from "./fromHub.mjs";
/**
 * Creates a stream from a subscription to a hub.
 *
 * The hub will be shut down once the stream is closed.
 */

export function fromHubWithShutdown_(hub, maxChunkSize = C.DEFAULT_CHUNK_SIZE) {
  return Ensuring.ensuring_(FromHub.fromHub_(hub, maxChunkSize), H.shutdown(hub));
}
/**
 * Creates a stream from a subscription to a hub.
 *
 * The hub will be shut down once the stream is closed.
 *
 * @ets_data_first fromHubWithShutdown_
 */

export function fromHubWithShutdown(maxChunkSize = C.DEFAULT_CHUNK_SIZE) {
  return hub => fromHubWithShutdown_(hub, maxChunkSize);
}
//# sourceMappingURL=fromHubWithShutdown.mjs.map