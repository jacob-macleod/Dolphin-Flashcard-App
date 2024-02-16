import { Chunk } from '@effect-ts/core';
import { These, Tp } from './index.js';
export * from '@effect-ts/core/Collections/Immutable/Chunk';
/**
 * Separates a Chunk of These into success values on one side and error/warning values on the other side
 * Values are preserved in case of a warning.
 */
export declare const partitionThese: <E, A>(chunk: Chunk.Chunk<These.These<E, A>>) => Tp.Tuple<[Chunk.Chunk<E>, Chunk.Chunk<A>]>;
//# sourceMappingURL=Chunk.d.ts.map