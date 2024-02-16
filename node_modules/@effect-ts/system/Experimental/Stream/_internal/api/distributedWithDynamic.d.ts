import * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import * as T from "../../../../Effect/index.js";
import * as Ex from "../../../../Exit/index.js";
import type { Predicate } from "../../../../Function/index.js";
import * as M from "../../../../Managed/index.js";
import * as O from "../../../../Option/index.js";
import * as Q from "../../../../Queue/index.js";
import type * as C from "../core.js";
/**
 * More powerful version of `Stream#distributedWith`. This returns a function that will produce
 * new queues and corresponding indices.
 * You can also provide a function that will be executed after the final events are enqueued in all queues.
 * Shutdown of the queues is handled by the driver.
 * Downstream users can also shutdown queues manually. In this case the driver will
 * continue but no longer backpressure on them.
 */
export declare function distributedWithDynamic_<R, E, A, A1>(self: C.Stream<R, E, A>, maximumLag: number, decide: (a: A) => T.UIO<Predicate<number>>, done: (ex: Ex.Exit<O.Option<E>, never>) => T.UIO<A1>): M.RIO<R, T.UIO<Tp.Tuple<[number, Q.Dequeue<Ex.Exit<O.Option<E>, A>>]>>>;
/**
 * More powerful version of `Stream#distributedWith`. This returns a function that will produce
 * new queues and corresponding indices.
 * You can also provide a function that will be executed after the final events are enqueued in all queues.
 * Shutdown of the queues is handled by the driver.
 * Downstream users can also shutdown queues manually. In this case the driver will
 * continue but no longer backpressure on them.
 *
 * @ets_data_first distributedWithDynamic_
 */
export declare function distributedWithDynamic<E, A, A1>(maximumLag: number, decide: (a: A) => T.UIO<Predicate<number>>, done: (ex: Ex.Exit<O.Option<E>, never>) => T.UIO<A1>): <R>(self: C.Stream<R, E, A>) => M.RIO<R, T.UIO<Tp.Tuple<[number, Q.Dequeue<Ex.Exit<O.Option<E>, A>>]>>>;
//# sourceMappingURL=distributedWithDynamic.d.ts.map