import type { IO } from "../Effect/effect.js";
import type { XFiberRef } from "./fiberRef.js";
/**
 * Sets the value associated with the current fiber.
 *
 * @ets_data_first set_
 */
export declare function set<A>(a: A): <EA, EB>(fiberRef: XFiberRef<EA, EB, A, A>) => IO<EA, void>;
/**
 * Sets the value associated with the current fiber.
 */
export declare function set_<EA, EB, A>(fiberRef: XFiberRef<EA, EB, A, A>, a: A): IO<EA, void>;
//# sourceMappingURL=set.d.ts.map