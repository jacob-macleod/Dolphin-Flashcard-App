import * as T from "../../../../Effect/index.js";
import type * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Creates a stream from an effect producing values of type `A` until it fails with None.
 */
export declare function repeatEffectOption<R, E, A>(fa: T.Effect<R, O.Option<E>, A>): C.Stream<R, E, A>;
//# sourceMappingURL=repeatEffectOption.d.ts.map