import type { FiberID } from "../Fiber/id.js";
import type { Trace } from "../Fiber/tracing.js";
import * as IO from "../IO/index.js";
import * as St from "../Structural/index.js";
import type { HasUnify } from "../Utils/index.js";
/**
 * Cause is a Free Semiring structure that allows tracking of multiple error causes.
 */
export declare type Cause<E> = Empty | Fail<E> | Die | Interrupt | Then<E> | Both<E> | Traced<E>;
export declare const CauseSym: unique symbol;
export declare function isCause(self: unknown): self is Cause<unknown>;
export interface Empty extends HasUnify {
}
export declare class Empty implements St.HasEquals, St.HasHash {
    readonly _tag = "Empty";
    readonly [CauseSym]: typeof CauseSym;
    [St.equalsSym](that: unknown): boolean;
    get [St.hashSym](): number;
    equalsSafe(that: Cause<unknown>): IO.IO<boolean>;
}
export declare const empty: Cause<never>;
export interface Fail<E> extends HasUnify {
}
export declare class Fail<E> implements St.HasEquals, St.HasHash {
    readonly value: E;
    readonly _tag = "Fail";
    readonly [CauseSym]: typeof CauseSym;
    constructor(value: E);
    [St.equalsSym](that: unknown): boolean;
    get [St.hashSym](): number;
    equalsSafe(that: Cause<unknown>): IO.IO<boolean>;
}
export interface Die extends HasUnify {
}
export declare class Die implements St.HasEquals, St.HasHash, HasUnify {
    readonly value: unknown;
    readonly _tag = "Die";
    readonly [CauseSym]: typeof CauseSym;
    constructor(value: unknown);
    [St.equalsSym](that: unknown): boolean;
    get [St.hashSym](): number;
    equalsSafe(that: Cause<unknown>): IO.IO<boolean>;
}
export interface Interrupt extends HasUnify {
}
export declare class Interrupt implements St.HasEquals, St.HasHash, HasUnify {
    readonly fiberId: FiberID;
    readonly _tag = "Interrupt";
    readonly [CauseSym]: typeof CauseSym;
    constructor(fiberId: FiberID);
    [St.equalsSym](that: unknown): boolean;
    get [St.hashSym](): number;
    equalsSafe(that: Cause<unknown>): IO.IO<boolean>;
}
export interface Traced<E> extends HasUnify {
}
export declare class Traced<E> implements St.HasEquals, St.HasHash {
    readonly cause: Cause<E>;
    readonly trace: Trace;
    readonly _tag = "Traced";
    readonly [CauseSym]: typeof CauseSym;
    constructor(cause: Cause<E>, trace: Trace);
    [St.equalsSym](that: unknown): boolean;
    get [St.hashSym](): number;
    equalsSafe(that: Cause<unknown>): IO.IO<boolean>;
}
export interface Then<E> extends HasUnify {
}
export declare class Then<E> implements St.HasEquals, St.HasHash {
    readonly left: Cause<E>;
    readonly right: Cause<E>;
    readonly _tag = "Then";
    readonly [CauseSym]: typeof CauseSym;
    constructor(left: Cause<E>, right: Cause<E>);
    [St.equalsSym](that: unknown): boolean;
    get [St.hashSym](): number;
    equalsSafe(that: Cause<unknown>): IO.IO<boolean>;
    private eq;
}
export interface Both<E> extends HasUnify {
}
export declare class Both<E> implements St.HasEquals, St.HasHash {
    readonly left: Cause<E>;
    readonly right: Cause<E>;
    readonly _tag = "Both";
    readonly [CauseSym]: typeof CauseSym;
    constructor(left: Cause<E>, right: Cause<E>);
    [St.equalsSym](that: unknown): boolean;
    get [St.hashSym](): number;
    equalsSafe(that: Cause<unknown>): IO.IO<boolean>;
    private eq;
}
export declare function fail<E>(value: E): Cause<E>;
export declare function traced<E>(cause: Cause<E>, trace: Trace): Cause<E>;
export declare function die(value: unknown): Cause<never>;
export declare function interrupt(fiberId: FiberID): Cause<never>;
export declare function combineSeq<E1, E2>(left: Cause<E1>, right: Cause<E2>): Cause<E1 | E2>;
export declare function combinePar<E1, E2>(left: Cause<E1>, right: Cause<E2>): Cause<E1 | E2>;
/**
 * Determines if the `Cause` is empty.
 */
export declare function isEmpty<E>(cause: Cause<E>): boolean;
export declare function equals<A>(self: Cause<A>, that: Cause<A>): boolean;
//# sourceMappingURL=cause.d.ts.map