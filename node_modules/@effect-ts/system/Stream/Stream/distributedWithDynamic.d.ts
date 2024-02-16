import * as Tp from "../../Collections/Immutable/Tuple/index.js";
import * as Ex from "../../Exit/index.js";
import * as O from "../../Option/index.js";
import * as Q from "../../Queue/index.js";
import * as T from "../_internal/effect.js";
import * as M from "../_internal/managed.js";
import type { Stream } from "./definitions.js";
/**
 * More powerful version of `distributedWith`. This returns a function that will produce
 * new queues and corresponding indices.
 * You can also provide a function that will be executed after the final events are enqueued in all queues.
 * Shutdown of the queues is handled by the driver.
 * Downstream users can also shutdown queues manually. In this case the driver will
 * continue but no longer backpressure on them.
 */
export declare function distributedWithDynamic<E, O>(maximumLag: number, decide: (_: O) => T.UIO<(_: symbol) => boolean>, done?: (_: Ex.Exit<O.Option<E>, never>) => T.UIO<any>): <R>(stream: Stream<R, E, O>) => M.Managed<R, never, T.UIO<Tp.Tuple<[symbol, Q.Dequeue<Ex.Exit<O.Option<E>, O>>]>>>;
/**
 * More powerful version of `distributedWith`. This returns a function that will produce
 * new queues and corresponding indices.
 * You can also provide a function that will be executed after the final events are enqueued in all queues.
 * Shutdown of the queues is handled by the driver.
 * Downstream users can also shutdown queues manually. In this case the driver will
 * continue but no longer backpressure on them.
 */
export declare function distributedWithDynamic_<R, E, O>(self: Stream<R, E, O>, maximumLag: number, decide: (o: O) => T.UIO<(_: symbol) => boolean>, done?: (_: Ex.Exit<O.Option<E>, never>) => T.UIO<any>): M.Managed<R, never, T.UIO<Tp.Tuple<[symbol, Q.Dequeue<Ex.Exit<O.Option<E>, O>>]>>>;
//# sourceMappingURL=distributedWithDynamic.d.ts.map