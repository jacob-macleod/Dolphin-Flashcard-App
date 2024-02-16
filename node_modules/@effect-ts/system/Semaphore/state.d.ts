import type * as Tp from "../Collections/Immutable/Tuple/index.js";
import type * as E from "../Either/index.js";
import type { ImmutableQueue } from "../Support/ImmutableQueue/index.js";
import * as T from "./effect.js";
import type * as P from "./promise.js";
export declare type Entry = Tp.Tuple<[P.Promise<never, void>, number]>;
export declare type State = E.Either<ImmutableQueue<Entry>, number>;
export declare const assertNonNegative: (n: number) => T.UIO<void>;
export declare class Acquisition {
    readonly waitAcquire: T.UIO<void>;
    readonly release: T.UIO<void>;
    constructor(waitAcquire: T.UIO<void>, release: T.UIO<void>);
}
//# sourceMappingURL=state.d.ts.map