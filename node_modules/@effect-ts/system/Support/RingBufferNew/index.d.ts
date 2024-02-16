import * as Chunk from "../../Collections/Immutable/Chunk/index.js";
import * as O from "../../Option/index.js";
export declare class RingBufferNew<A> {
    readonly capacity: number;
    private array;
    private size;
    private current;
    constructor(capacity: number);
    head(): O.Option<A>;
    lastorNull(): A | null;
    put(value: A): void;
    dropLast(): void;
    toChunk(): Chunk.Chunk<A>;
    private increment;
    private decrement;
}
//# sourceMappingURL=index.d.ts.map