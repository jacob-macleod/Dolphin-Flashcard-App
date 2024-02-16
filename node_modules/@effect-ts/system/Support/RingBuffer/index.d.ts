import "../../Operator/index.js";
import * as L from "../../Collections/Immutable/List/index.js";
import type { Predicate } from "../../Function/index.js";
import { DoublyLinkedList } from "../DoublyLinkedList/index.js";
export declare class RingBuffer<T> {
    readonly size: number;
    readonly ignoreFn?: Predicate<T> | undefined;
    private values;
    private ignored;
    constructor(size: number, ignoreFn?: Predicate<T> | undefined);
    push(value: T): DoublyLinkedList<T>;
    pop(): DoublyLinkedList<T>;
    get list(): L.List<T>;
    get listReverse(): L.List<T>;
}
//# sourceMappingURL=index.d.ts.map