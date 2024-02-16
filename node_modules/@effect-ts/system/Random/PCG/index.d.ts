export declare function isNothing<T>(value: T | null | undefined): boolean;
export declare type PCGRandomState = [number, number, number, number];
export declare type OptionalNumber = number | null | undefined;
/**
 * PCG is a family of simple fast space-efficient statistically good algorithms for random number generation. Unlike
 * many general-purpose RNGs, they are also hard to predict.
 */
export declare class PCGRandom {
    private _state;
    /**
     * Creates an instance of PCGRandom.
     *
     * @param {any} seed - The low 32 bits of the seed (0 is used for high 32 bits).
     *
     * @memberOf PCGRandom
     */
    constructor(seed?: OptionalNumber);
    /**
     * Creates an instance of PCGRandom.
     *
     * @param {any} seedHi - The high 32 bits of the seed.
     * @param {any} seedLo - The how 32 bits of the seed.
     * @param {any} inc - The low 32 bits of the incrementer (0 is used for high 32 bits).
     *
     * @memberOf PCGRandom
     */
    constructor(seedHi: OptionalNumber, seedLo: OptionalNumber, inc?: OptionalNumber);
    /**
     * Creates an instance of PCGRandom.
     *
     * @param {any} seedHi - The high 32 bits of the seed.
     * @param {any} seedLo - The how 32 bits of the seed.
     * @param {any} incHi - The high 32 bits of the incrementer.
     * @param {any} incLo - The how 32 bits of the incrementer.
     *
     * @memberOf PCGRandom
     */
    constructor(seedHi: OptionalNumber, seedLo: OptionalNumber, incHi: OptionalNumber, incLo: OptionalNumber);
    /**
     * @returns A copy of the internal state of this random number generator as a JavaScript Array
     */
    getState(): PCGRandomState;
    /**
     * Restore state previously retrieved using getState()
     */
    setState(state: PCGRandomState): void;
    private _next;
    integer(max: number): number;
    number(): number;
}
//# sourceMappingURL=index.d.ts.map