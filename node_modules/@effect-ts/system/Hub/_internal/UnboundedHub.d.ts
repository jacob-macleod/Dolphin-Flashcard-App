import "../../Operator/index.js";
import * as Chunk from "../../Collections/Immutable/Chunk/index.js";
import { Hub, Subscription } from "./Hub.js";
declare class Node<A> {
    value: A | null;
    subscribers: number;
    next: Node<A> | null;
    constructor(value: A | null, subscribers: number, next: Node<A> | null);
}
export declare class UnboundedHub<A> extends Hub<A> {
    publisherHead: Node<A>;
    publisherIndex: number;
    publisherTail: Node<A>;
    subscribersIndex: number;
    readonly capacity: number;
    constructor();
    isEmpty(): boolean;
    isFull(): boolean;
    publish(a: A): boolean;
    publishAll(as: Iterable<A>): Chunk.Chunk<A>;
    size(): number;
    slide(): void;
    subscribe(): Subscription<A>;
}
export {};
//# sourceMappingURL=UnboundedHub.d.ts.map