import * as Chain from "./chain.mjs";
import * as Environment from "./environment.mjs";
/**
 * Accesses the environment of the stream in the context of a stream.
 */

export function accessStream(f) {
  return Chain.chain_(Environment.environment(), f);
}
//# sourceMappingURL=accessStream.mjs.map