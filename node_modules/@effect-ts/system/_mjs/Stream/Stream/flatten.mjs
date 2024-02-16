// ets_tracing: off
import { identity } from "../../Function/index.mjs";
import { chain } from "./chain.mjs";
/**
 * Flattens this stream-of-streams into a stream made of the concatenation in
 * strict order of all the streams.
 */

export const flatten = /*#__PURE__*/chain(identity);
//# sourceMappingURL=flatten.mjs.map