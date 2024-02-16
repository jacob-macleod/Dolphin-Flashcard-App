import type { Equal } from "../../../../Equal/index.js";
import * as O from "../../../../Option/index.js";
export declare type Node<K, V> = LeafNode<K, V> | CollisionNode<K, V> | IndexedNode<K, V> | Empty<K, V> | ArrayNode<K, V>;
export interface SizeRef {
    value: number;
}
export declare class Empty<K, V> {
    readonly _tag = "Empty";
    modify(edit: number, _shift: number, f: UpdateFn<V>, hash: number, key: K, size: SizeRef): Node<K, V>;
}
export declare function isEmptyNode(a: unknown): a is Empty<unknown, unknown>;
export declare function isLeaf<K, V>(node: Node<K, V>): node is Empty<K, V> | LeafNode<K, V> | CollisionNode<K, V>;
export declare function canEditNode<K, V>(edit: number, node: Node<K, V>): boolean;
export declare type KeyEq<K> = Equal<K>["equals"];
export declare type UpdateFn<V> = (v: O.Option<V>) => O.Option<V>;
export declare class LeafNode<K, V> {
    readonly edit: number;
    readonly hash: number;
    readonly key: K;
    value: O.Option<V>;
    readonly _tag = "LeafNode";
    constructor(edit: number, hash: number, key: K, value: O.Option<V>);
    modify(edit: number, shift: number, f: UpdateFn<V>, hash: number, key: K, size: SizeRef): Node<K, V>;
}
export declare class CollisionNode<K, V> {
    readonly edit: number;
    readonly hash: number;
    readonly children: Array<Node<K, V>>;
    readonly _tag = "CollisionNode";
    constructor(edit: number, hash: number, children: Array<Node<K, V>>);
    modify(edit: number, shift: number, f: UpdateFn<V>, hash: number, key: K, size: SizeRef): Node<K, V>;
    updateCollisionList(mutate: boolean, edit: number, hash: number, list: Node<K, V>[], f: UpdateFn<V>, key: K, size: SizeRef): Node<K, V>[];
}
export declare class IndexedNode<K, V> {
    readonly edit: number;
    mask: number;
    children: Node<K, V>[];
    readonly _tag = "IndexedNode";
    constructor(edit: number, mask: number, children: Node<K, V>[]);
    modify(edit: number, shift: number, f: UpdateFn<V>, hash: number, key: K, size: SizeRef): Node<K, V>;
}
export declare class ArrayNode<K, V> {
    readonly edit: number;
    size: number;
    children: Node<K, V>[];
    readonly _tag = "ArrayNode";
    constructor(edit: number, size: number, children: Node<K, V>[]);
    modify(edit: number, shift: number, f: UpdateFn<V>, hash: number, key: K, size: SizeRef): Node<K, V>;
}
//# sourceMappingURL=index.d.ts.map