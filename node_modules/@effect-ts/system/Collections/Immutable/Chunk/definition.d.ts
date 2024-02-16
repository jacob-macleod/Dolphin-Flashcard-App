/// <reference types="node" />
import { _A } from "../../../Effect/commons.js";
import * as St from "../../../Structural/index.js";
import { AtomicNumber } from "../../../Support/AtomicNumber/index.js";
export declare const BufferSize = 64;
export declare const ChunkTypeId: unique symbol;
export declare type ChunkTypeId = typeof ChunkTypeId;
export declare const alloc: ((size: number, fill?: string | number | Buffer | undefined, encoding?: BufferEncoding | undefined) => Buffer) | ((n: number) => Uint8Array);
export declare function isByte(u: unknown): boolean;
export declare type IterableArrayLike<A> = ArrayLike<A> & Iterable<A>;
/**
 * A `Chunk<A>` represents a chunk of values of type `A`. Chunks are usually
 * backed by arrays, but expose a purely functional, safe interface
 * to the underlying elements, and they become lazy on operations that would be
 * costly with arrays, such as repeated concatenation.
 *
 * The implementation of balanced concatenation is based on the one for
 * Conc-Trees in "Conc-Trees for Functional and Parallel Programming" by
 * Aleksandar Prokopec and Martin Odersky.
 *
 * http://aleksandar-prokopec.com/resources/docs/lcpc-conc-trees.pdf
 */
export interface Chunk<A> {
    readonly [ChunkTypeId]: ChunkTypeId;
    readonly [_A]: () => A;
    readonly length: number;
    [Symbol.iterator](): Iterator<A>;
}
/**
 * Internal base class
 */
export declare abstract class ChunkInternal<A> implements Iterable<A>, Chunk<A>, St.HasEquals, St.HasHash {
    readonly [ChunkTypeId]: ChunkTypeId;
    readonly [_A]: () => A;
    abstract readonly binary: boolean;
    abstract readonly length: number;
    abstract readonly depth: number;
    abstract readonly left: ChunkInternal<A>;
    abstract readonly right: ChunkInternal<A>;
    abstract copyToArray(n: number, array: Array<A> | Uint8Array): void;
    abstract get(n: number): A;
    protected arrayLikeCache: IterableArrayLike<unknown> | undefined;
    arrayLike(): IterableArrayLike<A>;
    private arrayCache;
    array(): readonly A[];
    [St.equalsSym](that: unknown): boolean;
    get [St.hashSym](): number;
    toString(): string;
    toJSON(): readonly A[];
    abstract [Symbol.iterator](): Iterator<A>;
    abstract arrayLikeIterator(): Iterator<IterableArrayLike<A>>;
    abstract reverseArrayLikeIterator(): Iterator<IterableArrayLike<A>>;
    buckets(): Iterable<IterableArrayLike<A>>;
    reverseBuckets(): Iterable<IterableArrayLike<A>>;
    reverse(): Iterable<A>;
    materialize(): ChunkInternal<A>;
    append<A1>(a1: A1): ChunkInternal<A | A1>;
    prepend<A1>(a1: A1): ChunkInternal<A | A1>;
    take(n: number): ChunkInternal<A>;
    concat<A1>(that: ChunkInternal<A1>): ChunkInternal<A | A1>;
}
export declare const EmptyTypeId: unique symbol;
export declare type EmptyTypeId = typeof EmptyTypeId;
/**
 * Internal Empty Chunk
 */
export declare class Empty<A> extends ChunkInternal<A> {
    readonly depth = 0;
    readonly _typeId: EmptyTypeId;
    readonly left: this;
    readonly right: this;
    readonly binary = true;
    readonly length = 0;
    get(n: number): A;
    constructor();
    materialize(): ChunkInternal<never>;
    copyToArray(_n: number, _array: Array<A> | Uint8Array): void;
    [Symbol.iterator](): Iterator<A>;
    arrayLikeIterator(): Iterator<IterableArrayLike<A>>;
    reverseArrayLikeIterator(): Iterator<IterableArrayLike<A>>;
}
export declare const _Empty: ChunkInternal<never>;
/**
 * @ets_optimize remove
 */
export declare function concrete<A>(_: Chunk<A>): asserts _ is Empty<A> | AppendN<A> | Arr<A> | Slice<A> | Singleton<A> | PrependN<A> | Concat<A>;
/**
 * @ets_optimize identity
 */
export declare function concreteId<A>(_: Chunk<A>): Empty<A> | AppendN<A> | Arr<A> | Slice<A> | Singleton<A> | PrependN<A> | Concat<A>;
export declare const AppendNTypeId: unique symbol;
export declare type AppendNTypeId = typeof AppendNTypeId;
/**
 * Internal Append Chunk
 */
export declare class AppendN<A> extends ChunkInternal<A> {
    readonly start: ChunkInternal<A>;
    readonly buffer: Array<unknown> | Uint8Array;
    readonly bufferUsed: number;
    readonly chain: AtomicNumber;
    readonly binary: boolean;
    readonly _typeId: AppendNTypeId;
    readonly depth = 0;
    readonly left: ChunkInternal<never>;
    readonly right: ChunkInternal<never>;
    readonly length: number;
    constructor(start: ChunkInternal<A>, buffer: Array<unknown> | Uint8Array, bufferUsed: number, chain: AtomicNumber, binary: boolean);
    get(n: number): A;
    append<A1>(a1: A1): ChunkInternal<A | A1>;
    copyToArray(n: number, array: Array<A> | Uint8Array): void;
    [Symbol.iterator](): Iterator<A>;
    arrayLikeIterator(): Iterator<IterableArrayLike<A>>;
    reverseArrayLikeIterator(): Iterator<IterableArrayLike<A>>;
}
export declare const ArrTypeId: unique symbol;
export declare type ArrTypeId = typeof ArrTypeId;
/**
 * Internal Array Chunk
 */
export declare abstract class Arr<A> extends ChunkInternal<A> {
    readonly _typeId: ArrTypeId;
}
/**
 * Internal Plain Array Chunk
 */
export declare class PlainArr<A> extends Arr<A> {
    readonly _array: readonly A[];
    readonly depth = 0;
    readonly left: ChunkInternal<never>;
    readonly right: ChunkInternal<never>;
    readonly length: number;
    private isBytes?;
    constructor(_array: readonly A[]);
    get binary(): boolean;
    get(n: number): A;
    arrayLike(): IterableArrayLike<A>;
    array(): readonly A[];
    materialize(): this;
    copyToArray(n: number, array: Array<A> | Uint8Array): void;
    [Symbol.iterator](): Iterator<A>;
    arrayLikeIterator(): Iterator<IterableArrayLike<A>>;
    reverseArrayLikeIterator(): Iterator<IterableArrayLike<A>>;
}
/**
 * Internal Binary Array Chunk
 */
export declare class Uint8Arr extends Arr<number> {
    readonly _array: Uint8Array;
    readonly depth = 0;
    readonly left: ChunkInternal<never>;
    readonly right: ChunkInternal<never>;
    readonly length: number;
    readonly binary = true;
    constructor(_array: Uint8Array);
    arrayLike(): Uint8Array;
    get(n: number): number;
    materialize(): this;
    copyToArray(n: number, array: Array<number> | Uint8Array): void;
    [Symbol.iterator](): Iterator<number>;
    arrayLikeIterator(): Iterator<IterableArrayLike<number>>;
    reverseArrayLikeIterator(): Iterator<IterableArrayLike<number>>;
}
export declare const SliceTypeId: unique symbol;
export declare type SliceTypeId = typeof SliceTypeId;
/**
 * Internal Slice Chunk
 */
export declare class Slice<A> extends ChunkInternal<A> {
    readonly chunk: ChunkInternal<A>;
    readonly offset: number;
    readonly length: number;
    readonly depth = 0;
    readonly left: ChunkInternal<never>;
    readonly right: ChunkInternal<never>;
    readonly binary: boolean;
    readonly _typeId: SliceTypeId;
    get(n: number): A;
    constructor(chunk: ChunkInternal<A>, offset: number, length: number);
    copyToArray(n: number, array: Array<A> | Uint8Array): void;
    [Symbol.iterator](): Iterator<A>;
    arrayLikeIterator(): Iterator<IterableArrayLike<A>>;
    reverseArrayLikeIterator(): Iterator<IterableArrayLike<A>>;
}
export declare const SingletonTypeId: unique symbol;
export declare type SingletonTypeId = typeof SingletonTypeId;
/**
 * Internal Singleton Chunk
 */
export declare class Singleton<A> extends ChunkInternal<A> {
    readonly a: A;
    readonly depth = 0;
    readonly left: ChunkInternal<never>;
    readonly right: ChunkInternal<never>;
    readonly length = 1;
    readonly _typeId: SingletonTypeId;
    get(n: number): A;
    readonly binary: boolean;
    constructor(a: A);
    copyToArray(n: number, array: Array<A> | Uint8Array): void;
    [Symbol.iterator](): Iterator<A>;
    arrayLikeIterator(): Iterator<IterableArrayLike<A>>;
    reverseArrayLikeIterator(): Iterator<IterableArrayLike<A>>;
}
export declare const PrependNTypeId: unique symbol;
export declare type PrependNTypeId = typeof PrependNTypeId;
/**
 * Internal Prepend Chunk
 */
export declare class PrependN<A> extends ChunkInternal<A> {
    readonly end: ChunkInternal<A>;
    readonly buffer: Array<unknown> | Uint8Array;
    readonly bufferUsed: number;
    readonly chain: AtomicNumber;
    readonly binary: boolean;
    readonly depth = 0;
    readonly left: ChunkInternal<never>;
    readonly right: ChunkInternal<never>;
    readonly length: number;
    readonly _typeId: PrependNTypeId;
    get(n: number): A;
    constructor(end: ChunkInternal<A>, buffer: Array<unknown> | Uint8Array, bufferUsed: number, chain: AtomicNumber, binary: boolean);
    copyToArray(n: number, array: Array<A> | Uint8Array): void;
    prepend<A1>(a1: A1): ChunkInternal<A | A1>;
    [Symbol.iterator](): Iterator<A>;
    arrayLikeIterator(): Iterator<IterableArrayLike<A>>;
    reverseArrayLikeIterator(): Iterator<IterableArrayLike<A>>;
}
/**
 * Internal copy arrays
 */
export declare function _copy<A>(src: IterableArrayLike<A>, srcPos: number, dest: A[] | Uint8Array, destPos: number, len: number): Uint8Array | A[];
export declare const ConcatTypeId: unique symbol;
export declare type ConcatTypeId = typeof ConcatTypeId;
/**
 * Internal Concat Chunk
 */
export declare class Concat<A> extends ChunkInternal<A> {
    readonly left: ChunkInternal<A>;
    readonly right: ChunkInternal<A>;
    readonly depth: number;
    readonly _typeId: ConcatTypeId;
    readonly length: number;
    readonly binary: boolean;
    get(n: number): A;
    constructor(left: ChunkInternal<A>, right: ChunkInternal<A>);
    copyToArray(n: number, array: Array<A> | Uint8Array): void;
    [Symbol.iterator](): Iterator<A>;
    arrayLikeIterator(): Iterator<IterableArrayLike<A>>;
    reverseArrayLikeIterator(): Iterator<IterableArrayLike<A>>;
}
/**
 * Type guard
 */
export declare function isChunk<A>(u: Iterable<A>): u is Chunk<A>;
export declare function isChunk(u: unknown): u is Chunk<unknown>;
/**
 * Builds a chunk from an array.
 */
export declare const from: <A>(array: Iterable<A>) => Chunk<A>;
/**
 * Determines whether this chunk and the specified chunk have the same length
 * and every pair of corresponding elements of this chunk and the specified
 * chunk satisfy the specified predicate.
 */
export declare function corresponds_<A, B>(self: Chunk<A>, that: Chunk<B>, f: (a: A, b: B) => boolean): boolean;
/**
 * Determines whether this chunk and the specified chunk have the same length
 * and every pair of corresponding elements of this chunk and the specified
 * chunk satisfy the specified predicate.
 *
 * @ets_data_first corresponds_
 */
export declare function corresponds<A, B>(that: Chunk<B>, f: (a: A, b: B) => boolean): (self: Chunk<A>) => boolean;
export declare function toString<A>(self: Chunk<A>): string;
//# sourceMappingURL=definition.d.ts.map