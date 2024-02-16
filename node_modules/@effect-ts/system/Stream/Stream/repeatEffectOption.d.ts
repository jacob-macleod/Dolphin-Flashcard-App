import type * as O from "../../Option/index.js";
import * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Creates a stream from an effect producing values of type `A` until it fails with None.
 */
export declare const repeatEffectOption: <R, E, A>(fa: T.Effect<R, O.Option<E>, A>) => Stream<R, E, A>;
//# sourceMappingURL=repeatEffectOption.d.ts.map