import { managedUse_ as use_ } from "../Effect/excl-forEach.js";
import type * as T from "./deps.js";
import type { Managed } from "./managed.js";
/**
 * Run an effect while acquiring the resource before and releasing it after
 *
 * @ets_data_first use_
 */
export declare function use<A, R2, E2, B>(f: (a: A) => T.Effect<R2, E2, B>, __trace?: string): <R, E>(self: Managed<R, E, A>) => T.Effect<R & R2, E2 | E, B>;
export { use_ };
//# sourceMappingURL=use.d.ts.map