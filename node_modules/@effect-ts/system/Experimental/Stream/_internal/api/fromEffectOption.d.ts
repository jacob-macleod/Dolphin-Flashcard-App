import * as T from "../../../../Effect/index.js";
import * as O from "../../../../Option/index.js";
import * as C from "../core.js";
/**
 * Creates a stream from an effect producing a value of type `A` or an empty Stream
 */
export declare function fromEffectOption<R, E, A>(fa: T.Effect<R, O.Option<E>, A>): C.Stream<R, E, A>;
//# sourceMappingURL=fromEffectOption.d.ts.map