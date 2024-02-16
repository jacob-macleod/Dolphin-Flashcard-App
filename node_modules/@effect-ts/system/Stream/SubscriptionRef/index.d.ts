import * as T from "../../Effect/index.js";
import * as RefM from "../../RefM/index.js";
import * as S from "../Stream/index.js";
/**
 * A `SubscriptionRef<A>` contains a `RefM` with a value of type
 * `A` and a `Stream` that can be subscribed to in order to receive the
 * current value as well as all changes to the value.
 */
export declare class SubscriptionRef<A> {
    ref: RefM.RefM<A>;
    changes: S.Stream<unknown, never, A>;
    constructor(ref: RefM.RefM<A>, changes: S.Stream<unknown, never, A>);
}
/**
 * Creates a new `SubscriptionRef` with the specified value.
 */
export declare function make<A>(a: A): T.UIO<SubscriptionRef<A>>;
//# sourceMappingURL=index.d.ts.map