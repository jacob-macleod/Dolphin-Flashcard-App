import * as H from "../../Hub/index.mjs";
import { chain_ } from "./chain.mjs";
import { fromChunkQueue } from "./fromChunkQueue.mjs";
import { managed } from "./managed.mjs";
/**
 * Creates a stream from a `Hub`. The hub will be shutdown once the stream is closed.
 */

export function fromChunkHub(hub) {
  return chain_(managed(H.subscribe(hub)), queue => fromChunkQueue(queue));
}
//# sourceMappingURL=fromChunkHub.mjs.map