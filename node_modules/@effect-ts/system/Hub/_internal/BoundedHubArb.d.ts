import "../../Operator/index.js";
import * as Chunk from "../../Collections/Immutable/Chunk/index.js";
import type { MutableArray } from "../../Support/Mutable/index.js";
import { Hub, Subscription } from "./Hub.js";
export declare class BoundedHubArb<A> extends Hub<A> {
    array: MutableArray<A>;
    publisherIndex: number;
    subscribers: MutableArray<number>;
    subscriberCount: number;
    subscribersIndex: number;
    readonly capacity: number;
    constructor(requestedCapacity: number);
    isEmpty(): boolean;
    isFull(): boolean;
    publish(a: A): boolean;
    publishAll(as: Iterable<A>): Chunk.Chunk<A>;
    size(): number;
    slide(): void;
    subscribe(): Subscription<A>;
}
//# sourceMappingURL=BoundedHubArb.d.ts.map