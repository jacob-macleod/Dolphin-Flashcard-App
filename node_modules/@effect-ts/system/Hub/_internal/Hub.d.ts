import "../../Operator/index.js";
import type * as Chunk from "../../Collections/Immutable/Chunk/index.js";
export declare abstract class Subscription<A> {
    abstract isEmpty(): boolean;
    abstract poll<D>(default_: D): A | D;
    abstract pollUpTo(n: number): Chunk.Chunk<A>;
    abstract size(): number;
    abstract unsubscribe(): void;
}
export declare abstract class Hub<A> {
    abstract readonly capacity: number;
    abstract isEmpty(): boolean;
    abstract isFull(): boolean;
    abstract publish(a: A): boolean;
    abstract publishAll(as: Iterable<A>): Chunk.Chunk<A>;
    abstract size(): number;
    abstract slide(): void;
    abstract subscribe(): Subscription<A>;
}
//# sourceMappingURL=Hub.d.ts.map