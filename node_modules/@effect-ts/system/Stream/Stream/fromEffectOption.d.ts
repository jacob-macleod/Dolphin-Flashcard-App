import type * as O from "../../Option/index.js";
import * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Creates a stream from an effect producing a value of type `A` or an empty Stream
 */
export declare function fromEffectOption<R, E, A>(fa: T.Effect<R, O.Option<E>, A>): Stream<R, E, A>;
//# sourceMappingURL=fromEffectOption.d.ts.map