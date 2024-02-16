import type { GroupBy } from "../GroupBy/index.js";
import type { Stream } from "./definitions.js";
/**
 * Merges groups in parallel and the results in arbitrary order.
 */
export declare function mergeGroupBy<K, E, V, A, R1, E1>(f: (k: K, stream: Stream<unknown, E, V>) => Stream<R1, E1, A>): <R>(self: GroupBy<R, E, K, V>) => Stream<R & R1, E | E1, A>;
//# sourceMappingURL=mergeGroupBy.d.ts.map