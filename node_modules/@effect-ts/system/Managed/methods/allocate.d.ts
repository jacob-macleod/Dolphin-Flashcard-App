import * as T from "../deps.js";
import type { Managed } from "../managed.js";
export declare class Allocation<A> {
    readonly value: A;
    readonly release: T.UIO<void>;
    constructor(value: A, release: T.UIO<void>);
}
/**
 * Allocates the managed for future usage & release.
 *
 * Note: in case of failures during acquisition resources that
 * have been acquired will be immediately released. In case the
 * managed succeeds in acquiring all the resources an Allocation
 * will be returned and it is up to the caller to ensure invokation
 * of `release`, if that is not done resources will not be released.
 */
export declare function allocate<R, E, A>(self: Managed<R, E, A>): T.Effect<R, E, Allocation<A>>;
//# sourceMappingURL=allocate.d.ts.map