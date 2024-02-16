import "../../Operator/index.js";
import type * as Tp from "../../Collections/Immutable/Tuple/index.js";
import type * as Ex from "../../Exit/index.js";
import type * as O from "../../Option/index.js";
import * as Q from "../../Queue/index.js";
import type { Stream } from "../Stream/definitions.js";
/**
 * Representation of a grouped stream.
 * This allows to filter which groups will be processed.
 * Once merge is used all groups will be processed in parallel and the results will
 * be merged in arbitrary order.
 */
export declare class GroupBy<R, E, K, V> {
    readonly grouped: Stream<R, E, Tp.Tuple<[K, Q.Dequeue<Ex.Exit<O.Option<E>, V>>]>>;
    readonly buffer: number;
    constructor(grouped: Stream<R, E, Tp.Tuple<[K, Q.Dequeue<Ex.Exit<O.Option<E>, V>>]>>, buffer: number);
    merge<A, R1, E1>(f: (k: K, stream: Stream<unknown, E, V>) => Stream<R1, E1, A>): Stream<R & R1, E | E1, A>;
}
/**
 * Only consider the first n groups found in the stream.
 */
export declare function first_<R, E, K, V>(self: GroupBy<R, E, K, V>, n: number): GroupBy<R, E, K, V>;
/**
 * Only consider the first n groups found in the stream.
 */
export declare function first(n: number): <R, E, K, V>(self: GroupBy<R, E, K, V>) => GroupBy<R, E, K, V>;
/**
 * Filter the groups to be processed.
 */
export declare function filter_<R, E, K, V>(self: GroupBy<R, E, K, V>, f: (k: K) => boolean): GroupBy<R, E, K, V>;
/**
 * Filter the groups to be processed.
 */
export declare function filter<R, E, K, V>(f: (k: K) => boolean): (self: GroupBy<R, E, K, V>) => GroupBy<R, E, K, V>;
//# sourceMappingURL=index.d.ts.map