import "../../Operator/index.js";
import * as Chunk from "../../Collections/Immutable/Chunk/index.js";
import { Hub, Subscription } from "./Hub.js";
export declare class BoundedHubSingle<A> extends Hub<A> {
    publisherIndex: number;
    subscriberCount: number;
    subscribers: number;
    value: A;
    readonly capacity = 1;
    constructor();
    isEmpty(): boolean;
    isFull(): boolean;
    publish(a: A): boolean;
    publishAll(as: Iterable<A>): Chunk.Chunk<A>;
    size(): number;
    slide(): void;
    subscribe(): Subscription<A>;
}
//# sourceMappingURL=BoundedHubSingle.d.ts.map