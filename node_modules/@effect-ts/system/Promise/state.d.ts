import type { IO } from "../Effect/effect.js";
export declare type State<E, A> = Done<E, A> | Pending<E, A>;
export declare class Done<E, A> {
    readonly value: IO<E, A>;
    readonly _tag = "Done";
    constructor(value: IO<E, A>);
}
export declare class Pending<E, A> {
    readonly joiners: readonly ((_: IO<E, A>) => void)[];
    readonly _tag = "Pending";
    constructor(joiners: readonly ((_: IO<E, A>) => void)[]);
}
//# sourceMappingURL=state.d.ts.map