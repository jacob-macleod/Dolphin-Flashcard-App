/**
 * The identity of a Fiber, described by the time it began life, and a
 * monotonically increasing sequence number generated from an atomic counter.
 */
export interface FiberID {
    readonly _tag: "FiberID";
    readonly startTimeMillis: number;
    readonly seqNumber: number;
}
/**
 * Constructs a Fiber ID
 */
export declare function FiberID(startTimeMillis: number, seqNumber: number): FiberID;
/**
 * A sentinel value to indicate a fiber without identity.
 */
export declare const None: FiberID;
/**
 * Checks equality of Fiber IDs
 */
export declare function equalsFiberID(x: FiberID, y: FiberID): boolean;
/**
 * Constructs a new Fiber ID using current time and global increment
 */
export declare function newFiberId(): FiberID;
/**
 * Format a fiber id
 */
export declare function prettyFiberId(_: FiberID): string;
//# sourceMappingURL=id.d.ts.map