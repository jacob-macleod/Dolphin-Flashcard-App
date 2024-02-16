import "../../Operator/index.js";
export declare class LinkedListNode<T> {
    value: T | null;
    next: LinkedListNode<T> | null;
    constructor(value: T | null, next?: LinkedListNode<T> | null);
}
export declare class LinkedList<T> {
    head: LinkedListNode<T> | null;
    tail: LinkedListNode<T> | null;
    constructor(head?: LinkedListNode<T> | null, tail?: LinkedListNode<T> | null);
    empty(): boolean;
    prepend(value: T): this;
    append(value: T): this;
    deleteHead(): LinkedListNode<T> | null;
}
//# sourceMappingURL=index.d.ts.map