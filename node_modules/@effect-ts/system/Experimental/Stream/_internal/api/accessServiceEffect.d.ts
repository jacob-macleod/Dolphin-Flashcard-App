import type * as T from "../../../../Effect/index.js";
import type * as HS from "../../../../Has/index.js";
import type * as C from "../core.js";
export declare function accessServiceEffect<A>(s: HS.Tag<A>): <R, E, B>(f: (a: A) => T.Effect<R, E, B>) => C.Stream<HS.Has<A> & R, E, B>;
//# sourceMappingURL=accessServiceEffect.d.ts.map