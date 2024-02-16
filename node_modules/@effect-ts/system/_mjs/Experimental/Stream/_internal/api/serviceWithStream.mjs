import * as Chain from "./chain.mjs";
import * as Service from "./service.mjs";
/**
 * Accesses the specified service in the environment of the stream in the
 * context of a stream.
 */

export function serviceWithStream(s) {
  return f => Chain.chain_(Service.service(s), f);
}
//# sourceMappingURL=serviceWithStream.mjs.map