import * as H from "../../Hub/index.mjs";
import { ensuringFirst_ } from "./ensuringFirst.mjs";
import { fromChunkHub } from "./fromChunkHub.mjs";
/**
 * Creates a stream from a `Hub` of values. The hub will be shutdown once the stream is closed.
 */

export function fromChunkHubWithShutdown(hub) {
  return ensuringFirst_(fromChunkHub(hub), H.shutdown(hub));
}
//# sourceMappingURL=fromChunkHubWithShutdown.mjs.map