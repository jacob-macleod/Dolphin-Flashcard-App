import "../../Operator/index.js";
export declare class LinkedListNode<T> {
    readonly value: T;
    removed: boolean;
    left: LinkedListNode<T> | undefined;
    right: LinkedListNode<T> | undefined;
    constructor(value: T);
}
export declare class DoublyLinkedList<T> {
    get head(): T | undefined;
    get isEmpty(): boolean;
    get tail(): T | undefined;
    length: number;
    private headN;
    private tailN;
    forEach(f: (_: T) => void): void;
    add(val: T): LinkedListNode<T>;
    empty(): void;
    pop(): T | undefined;
    remove(n: LinkedListNode<T>): void;
    shift(): T | undefined;
}
//# sourceMappingURL=index.d.ts.map