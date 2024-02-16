import type * as Tp from "../../Collections/Immutable/Tuple/index.js";
import type * as M from "../_internal/managed.js";
import type { Stream } from "./definitions.js";
/**
 * Partition a stream using a predicate. The first stream will contain all element evaluated to true
 * and the second one will contain all element evaluated to false.
 * The faster stream may advance by up to buffer elements further than the slower one.
 */
export declare function partition_<R, E, O>(self: Stream<R, E, O>, p: (o: O) => boolean, buffer?: number): M.Managed<R, never, Tp.Tuple<[Stream<unknown, E, O>, Stream<unknown, E, O>]>>;
/**
 * Partition a stream using a predicate. The first stream will contain all element evaluated to true
 * and the second one will contain all element evaluated to false.
 * The faster stream may advance by up to buffer elements further than the slower one.
 */
export declare function partition<O>(p: (o: O) => boolean, buffer?: number): <R, E>(self: Stream<R, E, O>) => M.Managed<R, never, Tp.Tuple<[Stream<unknown, E, O>, Stream<unknown, E, O>]>>;
//# sourceMappingURL=partition.d.ts.map