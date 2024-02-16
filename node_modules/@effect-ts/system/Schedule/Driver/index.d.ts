import type { NoSuchElementException } from "../../GlobalExceptions/index.js";
import type * as O from "../../Option/index.js";
import type * as T from "../effect.js";
export declare class Driver<Env, Inp, Out> {
    readonly next: (inp: Inp) => T.Effect<Env, O.Option<never>, Out>;
    readonly last: T.IO<NoSuchElementException, Out>;
    readonly reset: T.UIO<void>;
    constructor(next: (inp: Inp) => T.Effect<Env, O.Option<never>, Out>, last: T.IO<NoSuchElementException, Out>, reset: T.UIO<void>);
}
//# sourceMappingURL=index.d.ts.map