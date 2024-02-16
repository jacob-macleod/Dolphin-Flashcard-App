import "../../Operator/index.js";
import type { Option } from "../../Option/index.js";
import * as P from "../../Promise/index.js";
import * as T from "../_internal/effect.js";
import * as R from "../_internal/ref.js";
declare type State<A> = Empty | Full<A>;
declare class Empty {
    readonly notifyConsumer: P.Promise<never, void>;
    readonly _tag = "Empty";
    constructor(notifyConsumer: P.Promise<never, void>);
}
declare class Full<A> {
    readonly a: A;
    readonly notifyProducer: P.Promise<never, void>;
    readonly _tag = "Full";
    constructor(a: A, notifyProducer: P.Promise<never, void>);
}
/**
 * A synchronous queue-like abstraction that allows a producer to offer
 * an element and wait for it to be taken, and allows a consumer to wait
 * for an element to be available.
 */
declare class Handoff<A> {
    readonly ref: R.Ref<State<A>>;
    readonly _tag = "Handoff";
    constructor(ref: R.Ref<State<A>>);
}
export declare function make<A>(): T.UIO<Handoff<A>>;
export declare function offer_<A>(h: Handoff<A>, a: A): T.UIO<void>;
export declare function offer<A>(a: A): (h: Handoff<A>) => T.UIO<void>;
export declare function take<A>(h: Handoff<A>): T.UIO<A>;
export declare function poll<A>(h: Handoff<A>): T.UIO<Option<A>>;
export {};
//# sourceMappingURL=index.d.ts.map