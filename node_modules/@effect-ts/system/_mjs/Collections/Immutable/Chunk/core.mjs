// ets_tracing: off
import { identity } from "../../../Function/index.mjs";
import { ArrayIndexOutOfBoundsException } from "../../../GlobalExceptions/index.mjs";
import * as O from "../../../Option/index.mjs";
import * as St from "../../../Structural/index.mjs";
import { _Empty, concrete, concreteId, corresponds_, EmptyTypeId, Singleton, SingletonTypeId, Slice, SliceTypeId } from "./definition.mjs";
export * from "./definition.mjs";
/**
 * Builds a chunk of a single value
 */

export function single(a) {
  return new Singleton(a);
}
/**
 * Builds an empty chunk
 */

export function empty() {
  return _Empty;
}
/**
 * Appends a value to a chunk
 *
 * @ets_data_first append_
 */

export function append(a) {
  return self => self.append(a);
}
/**
 * Appends a value to a chunk
 */

export function append_(self, a) {
  return self.append(a);
}
/**
 * Prepends a value to a chunk
 *
 * @ets_data_first prepend_
 */

export function prepend(a) {
  return self => self.prepend(a);
}
/**
 * Prepends a value to a chunk
 */

export function prepend_(self, a) {
  return self.prepend(a);
}
/**
 * Concats chunks
 *
 * @ets_data_first concat_
 */

export function concat(that) {
  return self => self.concat(that);
}
/**
 * Concats chunks
 */

export function concat_(self, that) {
  return self.concat(that);
}
/**
 * Converts a chunk to an ArrayLike (either Array or Buffer)
 */

export function toArrayLike(self) {
  return self.arrayLike();
}
/**
 * Converts a chunk to an Array
 */

export function toArray(self) {
  return self.array();
}
/**
 * Safely get a value
 */

export function get_(self, n) {
  return !Number.isInteger(n) || n < 0 || n >= self.length ? O.none : O.some(self.get(n));
}
/**
 * Safely get a value
 *
 * @ets_data_first get_
 */

export function get(n) {
  return self => get_(self, n);
}
/**
 * Unsafely get a value
 */

export function unsafeGet_(self, n) {
  return self.get(n);
}
/**
 * Safely get a value
 *
 * @ets_data_first unsafeGet_
 */

export function unsafeGet(n) {
  return self => unsafeGet_(self, n);
}
/**
 * Referential equality check
 */

export function equals_(self, that) {
  return corresponds_(self, that, St.equals);
}
/**
 * Referential equality check
 *
 * @ets_data_first equals_
 */

export function equals(that) {
  return self => equals_(self, that);
}
/**
 * Takes the first n elements
 */

export function take_(self, n) {
  return self.take(n);
}
/**
 * Takes the first n elements
 *
 * @ets_data_first take_
 */

export function take(n) {
  return self => self.take(n);
}
/**
 * Takes the last n elements
 */

export function takeRight_(self, n) {
  return drop_(self, size(self) - n);
}
/**
 * Takes the last n elements
 *
 * @ets_data_first takeRight_
 */

export function takeRight(n) {
  return self => takeRight_(self, n);
}
/**
 * Drops the first n elements
 */

export function drop_(self, n) {
  ;

  if (n <= 0) {
    return self;
  } else if (n >= self.length) {
    return _Empty;
  } else {
    const len = self.length;

    switch (self._typeId) {
      case EmptyTypeId:
        {
          return _Empty;
        }

      case SliceTypeId:
        {
          return new Slice(self.chunk, self.offset + n, self.length - n);
        }

      case SingletonTypeId:
        {
          if (n > 0) {
            return _Empty;
          }

          return self;
        }

      default:
        {
          return new Slice(self, n, len - n);
        }
    }
  }
}
/**
 * Drops the first n elements
 *
 * @ets_data_first drop_
 */

export function drop(n) {
  return self => drop_(self, n);
}
/**
 * Drops the first n elements
 */

export function dropRight_(self, n) {
  ;
  return take_(self, Math.max(0, self.length - n));
}
/**
 * Drops the first n elements
 *
 * @ets_data_first dropRight_
 */

export function dropRight(n) {
  return self => dropRight_(self, n);
}
/**
 * Returns the number of elements in the chunk
 */

export function size(self) {
  return self.length;
}
/**
 * Returns a chunk with the elements mapped by the specified function.
 */

export function map_(self, f) {
  ;

  if (self._typeId === SingletonTypeId) {
    return new Singleton(f(self.a));
  }

  let r = empty();

  for (const k of self) {
    r = append_(r, f(k));
  }

  return r;
}
/**
 * Returns a chunk with the elements mapped by the specified function.
 *
 * @ets_data_first map_
 */

export function map(f) {
  return self => map_(self, f);
}
/**
 * Returns a chunk with the elements mapped by the specified function.
 */

export function mapWithIndex_(self, f) {
  ;

  if (self._typeId === SingletonTypeId) {
    return new Singleton(f(0, self.a));
  }

  let r = empty();
  let i = 0;

  for (const k of self) {
    r = append_(r, f(i, k));
    i += 1;
  }

  return r;
}
/**
 * Returns a chunk with the elements mapped by the specified function.
 *
 * @ets_data_first mapWithIndex_
 */

export function mapWithIndex(f) {
  return self => mapWithIndex_(self, f);
}
/**
 * Returns a chunk with the elements mapped by the specified function.
 */

export function chain_(self, f) {
  ;

  if (self._typeId === SingletonTypeId) {
    return f(self.a);
  }

  let r = empty();

  for (const k of self) {
    r = concat_(r, f(k));
  }

  return r;
}
/**
 * Returns a chunk with the elements mapped by the specified function.
 *
 * @ets_data_first chain_
 */

export function chain(f) {
  return self => chain_(self, f);
}
/**
 * Flattens a chunk of chunks into a single chunk by concatenating all chunks.
 */

export function flatten(self) {
  return chain_(self, identity);
}
/**
 * Returns the first element of this chunk if it exists.
 */

export function head(self) {
  return get_(self, 0);
}
/**
 * Returns every elements after the first
 */

export function tail(self) {
  return self.length > 0 ? O.some(drop_(self, 1)) : O.none;
}
/**
 * Returns the last element of this chunk if it exists.
 */

export function last(self) {
  return get_(self, self.length - 1);
}
/**
 * Returns the first element of this chunk. Note that this method is partial
 * in that it will throw an exception if the chunk is empty. Consider using
 * `head` to explicitly handle the possibility that the chunk is empty
 * or iterating over the elements of the chunk in lower level, performance
 * sensitive code unless you really only need the first element of the chunk.
 */

export function unsafeHead(self) {
  return self.get(0);
}
/**
 * Returns every elements after the first. Note that this method is partial
 * in that it will throw an exception if the chunk is empty. Consider using
 * `head` to explicitly handle the possibility that the chunk is empty
 * or iterating over the elements of the chunk in lower level, performance
 * sensitive code unless you really only need the first element of the chunk.
 */

export function unsafeTail(self) {
  if (self.length === 0) {
    throw new ArrayIndexOutOfBoundsException(1);
  }

  return drop_(self, 1);
}
/**
 * Returns the last element of this chunk. Note that this method is partial
 * in that it will throw an exception if the chunk is empty. Consider using
 * `last` to explicitly handle the possibility that the chunk is empty
 * or iterating over the elements of the chunk in lower level, performance
 * sensitive code unless you really only need the last element of the chunk.
 */

export function unsafeLast(self) {
  return self.get(self.length - 1);
}
/**
 * Determines if the chunk is empty.
 */

export function isEmpty(self) {
  return self.length === 0;
}
/**
 * Determines if the chunk is empty.
 */

export function isNonEmpty(self) {
  return self.length !== 0;
}
/**
 * Buckets iterator
 */

export function buckets(self) {
  return self.buckets();
}
/**
 * Reverse buckets iterator
 */

export function reverseBuckets(self) {
  return self.reverseBuckets();
}
/**
 * Reverse buckets iterator
 */

export function reverse(self) {
  return self.reverse();
}
/**
 * Materializes a chunk into a chunk backed by an array. This method can
 * improve the performance of bulk operations.
 */

export function materialize(self) {
  return self.materialize();
}
/**
 * The unit chunk
 */

export const unit = /*#__PURE__*/single(void 0);
/**
 * Build a chunk from a sequence of values
 *
 * NOTE: different from Chunk#from this copies the elements 1 by 1
 * allowing for binary to be correctly stored in typed arrays
 */

export function make(...iter) {
  let builder = empty();

  for (const x of iter) {
    builder = append_(builder, x);
  }

  return builder;
}
/**
 * Return a chunk of length `n` with element `i` initialized with `f(i)`
 */

export function makeBy_(n, f) {
  const b = builder();

  for (let i = 0; i < n; i++) {
    b.append(f(i));
  }

  return b.build();
}
/**
 * Builder
 */

export function builder() {
  return new ChunkBuilder(empty());
}
export class ChunkBuilder {
  constructor(chunk) {
    this.chunk = chunk;
  }

  append(a) {
    this.chunk = append_(this.chunk, a);
    return this;
  }

  build() {
    return this.chunk;
  }

}
//# sourceMappingURL=core.mjs.map