import "../../../Operator/index.js";
import * as O from "../../../Option/index.js";
import type * as Ord from "../../../Ord/index.js";
import * as St from "../../../Structural/index.js";
import * as A from "../Array/index.js";
import * as Tp from "../Tuple/index.js";
declare type Color = "Red" | "Black";
declare class Node<K, V> {
    color: Color;
    key: K;
    value: V;
    left: Node<K, V> | undefined;
    right: Node<K, V> | undefined;
    count: number;
    constructor(color: Color, key: K, value: V, left: Node<K, V> | undefined, right: Node<K, V> | undefined, count: number);
}
/**
 * A Red-Black Tree Iterable
 */
export interface RedBlackTreeIterable<K, V> extends Iterable<readonly [K, V]> {
    readonly ord: Ord.Ord<K>;
    [Symbol.iterator](): RedBlackTreeIterator<K, V>;
}
/**
 * A Red-Black Tree
 */
export declare class RedBlackTree<K, V> implements RedBlackTreeIterable<K, V> {
    readonly ord: Ord.Ord<K>;
    readonly root: Node<K, V> | undefined;
    readonly _K: () => K;
    readonly _V: () => V;
    constructor(ord: Ord.Ord<K>, root: Node<K, V> | undefined);
    [Symbol.iterator](): RedBlackTreeIterator<K, V>;
    get [St.hashSym](): number;
    [St.equalsSym](that: unknown): boolean;
}
/**
 * Creates a new Red-Black Tree
 */
export declare function make<K, V>(ord: Ord.Ord<K>): RedBlackTree<K, V>;
/**
 * Returns the length of the tree
 */
export declare function size<K, V>(self: RedBlackTree<K, V>): number;
/**
 * Insert a new item into the tree
 */
export declare function insert_<K, V>(self: RedBlackTree<K, V>, key: K, value: V): RedBlackTree<K, V>;
/**
 * Insert a new item into the tree
 */
export declare function insert<K, V>(key: K, value: V): (self: RedBlackTree<K, V>) => RedBlackTree<K, V>;
/**
 * Visit all nodes inorder until a Some is returned
 */
export declare function visitFull<K, V, A>(node: Node<K, V>, visit: (key: K, value: V) => O.Option<A>): O.Option<A>;
/**
 * Visit each node of the tree in order
 */
export declare function forEach_<K, V>(self: RedBlackTree<K, V>, visit: (key: K, value: V) => void): void;
/**
 * Visit each node of the tree in order
 */
export declare function forEach<K, V>(visit: (key: K, value: V) => void): (self: RedBlackTree<K, V>) => void;
/**
 * Visit nodes greater than or equal to key
 */
export declare function visitGe<K, V, A>(node: Node<K, V>, min: K, ord: Ord.Ord<K>, visit: (key: K, value: V) => O.Option<A>): O.Option<A>;
/**
 * Visit each node of the tree in order with key greater then or equal to max
 */
export declare function forEachGe_<K, V>(self: RedBlackTree<K, V>, min: K, visit: (key: K, value: V) => void): void;
/**
 * Visit each node of the tree in order with key greater then or equal to max
 */
export declare function forEachGe<K, V>(min: K, visit: (key: K, value: V) => void): (self: RedBlackTree<K, V>) => void;
/**
 * Visit nodes lower than key
 */
export declare function visitLt<K, V, A>(node: Node<K, V>, max: K, ord: Ord.Ord<K>, visit: (key: K, value: V) => O.Option<A>): O.Option<A>;
/**
 * Visit each node of the tree in order with key lower then max
 */
export declare function forEachLt_<K, V>(self: RedBlackTree<K, V>, max: K, visit: (key: K, value: V) => void): void;
/**
 * Visit each node of the tree in order with key lower then max
 */
export declare function forEachLt<K, V>(max: K, visit: (key: K, value: V) => void): (self: RedBlackTree<K, V>) => void;
/**
 * Visit nodes with key lower than max and greater then or equal to min
 */
export declare function visitBetween<K, V, A>(node: Node<K, V>, min: K, max: K, ord: Ord.Ord<K>, visit: (key: K, value: V) => O.Option<A>): O.Option<A>;
/**
 * Visit each node of the tree in order with key lower than max and greater then or equal to min
 */
export declare function forEachBetween_<K, V>(self: RedBlackTree<K, V>, min: K, max: K, visit: (key: K, value: V) => void): void;
/**
 * Visit each node of the tree in order with key lower than max and greater then or equal to min
 */
export declare function forEachBetween<K, V>(min: K, max: K, visit: (key: K, value: V) => void): (self: RedBlackTree<K, V>) => void;
export declare type Direction = "Forward" | "Backward";
/**
 * Stateful iterator
 */
export declare class RedBlackTreeIterator<K, V> implements Iterator<readonly [K, V]> {
    readonly self: RedBlackTree<K, V>;
    readonly stack: Node<K, V>[];
    readonly direction: Direction;
    private count;
    constructor(self: RedBlackTree<K, V>, stack: Node<K, V>[], direction: Direction);
    /**
     * Clones the iterator
     */
    clone(): RedBlackTreeIterator<K, V>;
    /**
     * Reverse the traversal direction
     */
    reversed(): RedBlackTreeIterator<K, V>;
    /**
     * Iterator next
     */
    next(): IteratorResult<readonly [K, V]>;
    /**
     * Returns the key
     */
    get key(): O.Option<K>;
    /**
     * Returns the value
     */
    get value(): O.Option<V>;
    /**
     * Returns the key
     */
    get entry(): O.Option<readonly [K, V]>;
    /**
     * Returns the position of this iterator in the sorted list
     */
    get index(): number;
    /**
     * Advances iterator to next element in list
     */
    moveNext(): void;
    /**
     * Checks if there is a next element
     */
    get hasNext(): boolean;
    /**
     * Advances iterator to previous element in list
     */
    movePrev(): void;
    /**
     * Checks if there is a previous element
     */
    get hasPrev(): boolean;
}
/**
 * Returns the first entry in the tree
 */
export declare function getFirst<K, V>(tree: RedBlackTree<K, V>): O.Option<Tp.Tuple<[K, V]>>;
/**
 * Returns the last entry in the tree
 */
export declare function getLast<K, V>(tree: RedBlackTree<K, V>): O.Option<Tp.Tuple<[K, V]>>;
/**
 * Returns an iterator that points to the element i of the tree
 */
export declare function at_<K, V>(tree: RedBlackTree<K, V>, idx: number, direction?: Direction): RedBlackTreeIterable<K, V>;
/**
 * Returns an iterator that points to the element i of the tree
 */
export declare function at(idx: number): <K, V>(tree: RedBlackTree<K, V>) => RedBlackTreeIterable<K, V>;
/**
 * Returns the element i of the tree
 */
export declare function getAt_<K, V>(tree: RedBlackTree<K, V>, idx: number): O.Option<Tp.Tuple<[K, V]>>;
/**
 * Returns the element i of the tree
 */
export declare function getAt(idx: number): <K, V>(tree: RedBlackTree<K, V>) => O.Option<Tp.Tuple<[K, V]>>;
/**
 * Returns an iterator that traverse entries with keys less then or equal to key
 */
export declare function le_<K, V>(tree: RedBlackTree<K, V>, key: K, direction?: Direction): RedBlackTreeIterable<K, V>;
/**
 * Returns an iterator that traverse entries with keys less then or equal to key
 */
export declare function le<K>(key: K, direction?: Direction): <V>(tree: RedBlackTree<K, V>) => RedBlackTreeIterable<K, V>;
/**
 * Returns an iterator that traverse entries with keys less then key
 */
export declare function lt_<K, V>(tree: RedBlackTree<K, V>, key: K, direction?: Direction): RedBlackTreeIterable<K, V>;
/**
 * Returns an iterator that traverse entries with keys less then key
 */
export declare function lt<K>(key: K, direction?: Direction): <V>(tree: RedBlackTree<K, V>) => RedBlackTreeIterable<K, V>;
/**
 * Returns an iterator that traverse entries with keys greater then or equal to key
 */
export declare function ge_<K, V>(tree: RedBlackTree<K, V>, key: K, direction?: Direction): RedBlackTreeIterable<K, V>;
/**
 * Returns an iterator that traverse entries with keys greater then or equal to key
 */
export declare function ge<K>(key: K, direction?: Direction): <V>(tree: RedBlackTree<K, V>) => RedBlackTreeIterable<K, V>;
/**
 * Returns an iterator that traverse entries with keys greater then or equal to key
 */
export declare function gt_<K, V>(tree: RedBlackTree<K, V>, key: K, direction?: Direction): RedBlackTreeIterable<K, V>;
/**
 * Returns an iterator that traverse entries with keys greater then or equal to key
 */
export declare function gt<K>(key: K, direction?: Direction): <V>(tree: RedBlackTree<K, V>) => RedBlackTreeIterable<K, V>;
/**
 * Traverse the tree backwards
 */
export declare function backwards<K, V>(self: RedBlackTree<K, V>): RedBlackTreeIterable<K, V>;
/**
 * Get the values of the tree
 */
export declare function values_<K, V>(self: RedBlackTree<K, V>, direction?: Direction): IterableIterator<V>;
/**
 * Get the values of the tree
 */
export declare function values(direction?: Direction): <K, V>(self: RedBlackTree<K, V>) => Iterable<V>;
/**
 * Get the keys of the tree
 */
export declare function keys_<K, V>(self: RedBlackTree<K, V>, direction?: Direction): IterableIterator<K>;
/**
 * Get the keys of the tree
 */
export declare function keys(direction?: Direction): <K, V>(self: RedBlackTree<K, V>) => IterableIterator<K>;
/**
 * Constructs a new tree from an iterable of key-value pairs
 */
export declare function from<K, V>(iterable: RedBlackTreeIterable<K, V>): RedBlackTree<K, V>;
export declare function from<K, V>(iterable: Iterable<readonly [K, V]>, ord: Ord.Ord<K>): RedBlackTree<K, V>;
/**
 * Finds the item with key if it exists
 */
export declare function find_<K, V>(tree: RedBlackTree<K, V>, key: K): A.Array<V>;
/**
 * Finds the item with key if it exists
 */
export declare function find<K>(key: K): <V>(tree: RedBlackTree<K, V>) => A.Array<V>;
/**
 * Finds the item with key if it exists
 */
export declare function findFirst_<K, V>(tree: RedBlackTree<K, V>, key: K): O.Option<V>;
/**
 * Finds the item with key if it exists
 */
export declare function findFirst<K>(key: K): <V>(tree: RedBlackTree<K, V>) => O.Option<V>;
/**
 * Finds the item with key if it exists
 */
export declare function has_<K, V>(tree: RedBlackTree<K, V>, key: K): boolean;
/**
 * Finds the item with key if it exists
 */
export declare function has<K>(key: K): <V>(tree: RedBlackTree<K, V>) => boolean;
/**
 * Removes entry with key
 */
export declare function removeFirst_<K, V>(self: RedBlackTree<K, V>, key: K): RedBlackTree<K, V>;
/**
 * Removes entry with key
 */
export declare function removeFirst<K>(key: K): <V>(tree: RedBlackTree<K, V>) => RedBlackTree<K, V>;
/**
 * Reduce a state over the map entries
 */
export declare function reduceWithIndex_<K, V, Z>(map: RedBlackTree<K, V>, z: Z, f: (z: Z, k: K, v: V) => Z): Z;
/**
 * Reduce a state over the map entries
 *
 * @ets_data_first reduceWithIndex_
 */
export declare function reduceWithIndex<K, V, Z>(z: Z, f: (z: Z, k: K, v: V) => Z): (map: RedBlackTree<K, V>) => Z;
/**
 * Reduce a state over the map entries
 */
export declare function reduce_<K, V, Z>(map: RedBlackTree<K, V>, z: Z, f: (z: Z, v: V) => Z): Z;
/**
 * Reduce a state over the map entries
 *
 * @ets_data_first reduceWithIndex_
 */
export declare function reduce<V, Z>(z: Z, f: (z: Z, v: V) => Z): <K>(map: RedBlackTree<K, V>) => Z;
export {};
//# sourceMappingURL=index.d.ts.map