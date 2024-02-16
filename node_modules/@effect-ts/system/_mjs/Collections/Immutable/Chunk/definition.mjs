var _a; // ets_tracing: off


import { _A } from "../../../Effect/commons.mjs";
import { ArrayIndexOutOfBoundsException } from "../../../GlobalExceptions/index.mjs";
import * as St from "../../../Structural/index.mjs";
import { AtomicNumber } from "../../../Support/AtomicNumber/index.mjs";
import * as A from "../Array/index.mjs";
export const BufferSize = 64;
export const ChunkTypeId = /*#__PURE__*/Symbol();
export const alloc = typeof Buffer !== "undefined" ? Buffer.alloc : n => new Uint8Array(n);
export function isByte(u) {
  return typeof u === "number" && Number.isInteger(u) && u >= 0 && u <= 255;
}
/**
 * Internal base class
 */

export class ChunkInternal {
  constructor() {
    this[_a] = ChunkTypeId;
  }

  arrayLike() {
    if (this.arrayLikeCache) {
      return this.arrayLikeCache;
    }

    const arr = this.binary ? alloc(this.length) : new Array(this.length);
    this.copyToArray(0, arr);
    this.arrayLikeCache = arr;
    return arr;
  }

  array() {
    if (this.arrayCache) {
      return this.arrayCache;
    }

    const arr = new Array(this.length);
    this.copyToArray(0, arr);
    this.arrayCache = arr;
    return arr;
  }

  [(_a = ChunkTypeId, St.equalsSym)](that) {
    return isChunk(that) && corresponds_(this, that, St.equals);
  }

  get [St.hashSym]() {
    return St.hashIterator(this[Symbol.iterator]());
  }

  toString() {
    return `Chunk(${this.array().join(", ")})`;
  }

  toJSON() {
    return this.array();
  }

  buckets() {
    return {
      [Symbol.iterator]: () => this.arrayLikeIterator()
    };
  }

  reverseBuckets() {
    return {
      [Symbol.iterator]: () => this.reverseArrayLikeIterator()
    };
  }

  reverse() {
    const arr = this.arrayLike();
    return {
      [Symbol.iterator]: () => {
        let i = arr.length - 1;
        return {
          next: () => {
            if (i >= 0 && i < arr.length) {
              const k = arr[i];
              i--;
              return {
                value: k,
                done: false
              };
            }

            return {
              value: arr.length,
              done: true
            };
          }
        };
      }
    };
  }

  materialize() {
    ;

    switch (this._typeId) {
      case EmptyTypeId:
        {
          return this;
        }

      case ArrTypeId:
        {
          return this;
        }

      default:
        {
          return array_(this.arrayLike());
        }
    }
  }

  append(a1) {
    const binary = this.binary && isByte(a1);
    const buffer = this.binary && binary ? alloc(BufferSize) : new Array(BufferSize);
    buffer[0] = a1;
    return new AppendN(this, buffer, 1, new AtomicNumber(1), this.binary && binary);
  }

  prepend(a1) {
    const binary = this.binary && isByte(a1);
    const buffer = this.binary && binary ? alloc(BufferSize) : new Array(BufferSize);
    buffer[BufferSize - 1] = a1;
    return new PrependN(this, buffer, 1, new AtomicNumber(1), this.binary && binary);
  }

  take(n) {
    ;

    if (n <= 0) {
      return _Empty;
    } else if (n >= this.length) {
      return this;
    } else {
      switch (this._typeId) {
        case EmptyTypeId:
          {
            return _Empty;
          }

        case SliceTypeId:
          {
            if (n >= this.length) {
              return this;
            } else {
              return new Slice(this.chunk, this.offset, n);
            }
          }

        case SingletonTypeId:
          {
            return this;
          }

        default:
          {
            return new Slice(this, 0, n);
          }
      }
    }
  }

  concat(that) {
    ;
    ;

    if (this._typeId === EmptyTypeId) {
      return that;
    }

    if (that._typeId === EmptyTypeId) {
      return this;
    }

    if (this._typeId === AppendNTypeId) {
      const chunk = array_(this.buffer).take(this.bufferUsed);
      return this.start.concat(chunk).concat(that);
    }

    if (that._typeId === PrependNTypeId) {
      const chunk = array_(A.takeRight_(that.buffer, that.bufferUsed));
      return this.concat(chunk).concat(that.end);
    }

    const diff = that.depth - this.depth;

    if (Math.abs(diff) <= 1) {
      return new Concat(this, that);
    } else if (diff < -1) {
      if (this.left.depth >= this.right.depth) {
        const nr = this.right.concat(that);
        return new Concat(this.left, nr);
      } else {
        const nrr = this.right.right.concat(that);

        if (nrr.depth === this.depth - 3) {
          const nr = new Concat(this.right.left, nrr);
          return new Concat(this.left, nr);
        } else {
          const nl = new Concat(this.left, this.right.left);
          return new Concat(nl, nrr);
        }
      }
    } else {
      if (this.right.depth >= that.left.depth) {
        const nl = this.concat(that.left);
        return new Concat(nl, that.right);
      } else {
        const nll = this.concat(that.left.left);

        if (nll.depth === that.depth - 3) {
          const nl = new Concat(nll, that.left.right);
          return new Concat(nl, that.right);
        } else {
          const nr = new Concat(that.left.right, that.right);
          return new Concat(nll, nr);
        }
      }
    }
  }

}
export const EmptyTypeId = /*#__PURE__*/Symbol();
/**
 * Internal Empty Chunk
 */

export class Empty extends ChunkInternal {
  constructor() {
    super();
    this.depth = 0;
    this._typeId = EmptyTypeId;
    this.left = this;
    this.right = this;
    this.binary = true;
    this.length = 0;
  }

  get(n) {
    throw new ArrayIndexOutOfBoundsException(n);
  }

  materialize() {
    return array_([]);
  }

  copyToArray(_n, _array) {// no-op
  }

  [Symbol.iterator]() {
    return {
      next: () => ({
        value: 0,
        done: true
      })
    };
  }

  arrayLikeIterator() {
    return {
      next: () => ({
        value: 0,
        done: true
      })
    };
  }

  reverseArrayLikeIterator() {
    return {
      next: () => ({
        value: 0,
        done: true
      })
    };
  }

}
export const _Empty = /*#__PURE__*/new Empty();
/**
 * @ets_optimize remove
 */

export function concrete(_) {//
}
/**
 * @ets_optimize identity
 */

export function concreteId(_) {
  ;
  return _;
}
export const AppendNTypeId = /*#__PURE__*/Symbol();
/**
 * Internal Append Chunk
 */

export class AppendN extends ChunkInternal {
  constructor(start, buffer, bufferUsed, chain, binary) {
    super();
    this.start = start;
    this.buffer = buffer;
    this.bufferUsed = bufferUsed;
    this.chain = chain;
    this.binary = binary;
    this._typeId = AppendNTypeId;
    this.depth = 0;
    this.left = _Empty;
    this.right = _Empty;
    this.length = this.start.length + this.bufferUsed;
  }

  get(n) {
    if (n < this.start.length) {
      return this.start.get(n);
    }

    const k = n - this.start.length;

    if (k >= this.buffer.length || k < 0) {
      throw new ArrayIndexOutOfBoundsException(n);
    }

    return this.buffer[k];
  }

  append(a1) {
    const binary = this.binary && isByte(a1);

    if (this.bufferUsed < this.buffer.length && this.chain.compareAndSet(this.bufferUsed, this.bufferUsed + 1)) {
      if (this.binary && !binary) {
        const buffer = new Array(BufferSize);

        for (let i = 0; i < BufferSize; i++) {
          buffer[i] = this.buffer[i];
        }

        buffer[this.bufferUsed] = a1;
        return new AppendN(this.start, buffer, this.bufferUsed + 1, this.chain, this.binary && binary);
      }

      this.buffer[this.bufferUsed] = a1;
      return new AppendN(this.start, this.buffer, this.bufferUsed + 1, this.chain, this.binary && binary);
    } else {
      const buffer = this.binary && binary ? alloc(BufferSize) : new Array(BufferSize);
      buffer[0] = a1;
      const chunk = array_(this.buffer).take(this.bufferUsed);
      return new AppendN(this.start.concat(chunk), buffer, 1, new AtomicNumber(1), this.binary && binary);
    }
  }

  copyToArray(n, array) {
    this.start.copyToArray(n, array);

    _copy(this.buffer, 0, array, this.start.length + n, this.bufferUsed);
  }

  [Symbol.iterator]() {
    const k = this.arrayLike();
    return k[Symbol.iterator]();
  }

  arrayLikeIterator() {
    const array = this.arrayLike();
    let done = false;
    return {
      next: () => {
        if (!done) {
          done = true;
          return {
            value: array,
            done: false
          };
        } else {
          return {
            value: 1,
            done: true
          };
        }
      }
    };
  }

  reverseArrayLikeIterator() {
    const array = this.arrayLike();
    let done = false;
    return {
      next: () => {
        if (!done) {
          done = true;
          return {
            value: array,
            done: false
          };
        } else {
          return {
            value: 1,
            done: true
          };
        }
      }
    };
  }

}
export const ArrTypeId = /*#__PURE__*/Symbol();
/**
 * Internal Array Chunk
 */

export class Arr extends ChunkInternal {
  constructor() {
    super(...arguments);
    this._typeId = ArrTypeId;
  }

}
/**
 * Internal Plain Array Chunk
 */

export class PlainArr extends Arr {
  constructor(_array) {
    super();
    this._array = _array;
    this.depth = 0;
    this.left = _Empty;
    this.right = _Empty;
    this.length = _array.length;
  }

  get binary() {
    if (typeof this.isBytes !== "undefined") {
      return this.isBytes;
    }

    this.isBytes = this._array.every(isByte);
    return this.isBytes;
  }

  get(n) {
    if (n >= this.length || n < 0) {
      throw new ArrayIndexOutOfBoundsException(n);
    }

    return this._array[n];
  }

  arrayLike() {
    if (!this.binary) {
      return this._array;
    }

    if (this.arrayLikeCache) {
      return this.arrayLikeCache;
    }

    const arr = alloc(this.length);
    this.copyToArray(0, arr);
    this.arrayLikeCache = arr;
    return arr;
  }

  array() {
    return this._array;
  }

  materialize() {
    return this;
  }

  copyToArray(n, array) {
    _copy(this._array, 0, array, n, this.length);
  }

  [Symbol.iterator]() {
    return this._array[Symbol.iterator]();
  }

  arrayLikeIterator() {
    let done = false;
    return {
      next: () => {
        if (!done) {
          done = true;
          return {
            value: this._array,
            done: false
          };
        } else {
          return {
            value: 1,
            done: true
          };
        }
      }
    };
  }

  reverseArrayLikeIterator() {
    let done = false;
    return {
      next: () => {
        if (!done) {
          done = true;
          return {
            value: this._array,
            done: false
          };
        } else {
          return {
            value: 1,
            done: true
          };
        }
      }
    };
  }

}
/**
 * Internal Binary Array Chunk
 */

export class Uint8Arr extends Arr {
  constructor(_array) {
    super();
    this._array = _array;
    this.depth = 0;
    this.left = _Empty;
    this.right = _Empty;
    this.binary = true;
    this.length = _array.length;
  }

  arrayLike() {
    return this._array;
  }

  get(n) {
    if (n >= this.length || n < 0) {
      throw new ArrayIndexOutOfBoundsException(n);
    }

    return this._array[n];
  }

  materialize() {
    return this;
  }

  copyToArray(n, array) {
    _copy(this._array, 0, array, n, this.length);
  }

  [Symbol.iterator]() {
    return this._array[Symbol.iterator]();
  }

  arrayLikeIterator() {
    let done = false;
    return {
      next: () => {
        if (!done) {
          done = true;
          return {
            value: this._array,
            done: false
          };
        } else {
          return {
            value: 1,
            done: true
          };
        }
      }
    };
  }

  reverseArrayLikeIterator() {
    let done = false;
    return {
      next: () => {
        if (!done) {
          done = true;
          return {
            value: this._array,
            done: false
          };
        } else {
          return {
            value: 1,
            done: true
          };
        }
      }
    };
  }

}
export const SliceTypeId = /*#__PURE__*/Symbol();
/**
 * Internal Slice Chunk
 */

export class Slice extends ChunkInternal {
  constructor(chunk, offset, length) {
    super();
    this.chunk = chunk;
    this.offset = offset;
    this.length = length;
    this.depth = 0;
    this.left = _Empty;
    this.right = _Empty;
    this._typeId = SliceTypeId;
    this.binary = this.chunk.binary;
  }

  get(n) {
    return this.chunk.get(n + this.offset);
  }

  copyToArray(n, array) {
    let i = 0;
    let j = n;

    while (i < this.length) {
      array[j] = this.get(i);
      i += 1;
      j += 1;
    }
  }

  [Symbol.iterator]() {
    const k = this.arrayLike();
    return k[Symbol.iterator]();
  }

  arrayLikeIterator() {
    const array = this.arrayLike();
    let done = false;
    return {
      next: () => {
        if (!done) {
          done = true;
          return {
            value: array,
            done: false
          };
        } else {
          return {
            value: 1,
            done: true
          };
        }
      }
    };
  }

  reverseArrayLikeIterator() {
    const array = this.arrayLike();
    let done = false;
    return {
      next: () => {
        if (!done) {
          done = true;
          return {
            value: array,
            done: false
          };
        } else {
          return {
            value: 1,
            done: true
          };
        }
      }
    };
  }

}
export const SingletonTypeId = /*#__PURE__*/Symbol();
/**
 * Internal Singleton Chunk
 */

export class Singleton extends ChunkInternal {
  constructor(a) {
    super();
    this.a = a;
    this.depth = 0;
    this.left = _Empty;
    this.right = _Empty;
    this.length = 1;
    this._typeId = SingletonTypeId;
    this.binary = isByte(a);
  }

  get(n) {
    if (n === 0) {
      return this.a;
    }

    throw new ArrayIndexOutOfBoundsException(n);
  }

  copyToArray(n, array) {
    array[n] = this.a;
  }

  [Symbol.iterator]() {
    const k = this.arrayLike();
    return k[Symbol.iterator]();
  }

  arrayLikeIterator() {
    let done = false;
    return {
      next: () => {
        if (!done) {
          done = true;
          return {
            value: this.arrayLike(),
            done: false
          };
        } else {
          return {
            value: 1,
            done: true
          };
        }
      }
    };
  }

  reverseArrayLikeIterator() {
    let done = false;
    return {
      next: () => {
        if (!done) {
          done = true;
          return {
            value: this.arrayLike(),
            done: false
          };
        } else {
          return {
            value: 1,
            done: true
          };
        }
      }
    };
  }

}
export const PrependNTypeId = /*#__PURE__*/Symbol();
/**
 * Internal Prepend Chunk
 */

export class PrependN extends ChunkInternal {
  constructor(end, buffer, bufferUsed, chain, binary) {
    super();
    this.end = end;
    this.buffer = buffer;
    this.bufferUsed = bufferUsed;
    this.chain = chain;
    this.binary = binary;
    this.depth = 0;
    this.left = _Empty;
    this.right = _Empty;
    this._typeId = PrependNTypeId;
    this.length = this.end.length + this.bufferUsed;
  }

  get(n) {
    if (n < this.bufferUsed) {
      const k = BufferSize - this.bufferUsed + n;

      if (k >= this.buffer.length || k < 0) {
        throw new ArrayIndexOutOfBoundsException(n);
      }

      return this.buffer[k];
    }

    return this.end.get(n - this.bufferUsed);
  }

  copyToArray(n, array) {
    const length = Math.min(this.bufferUsed, Math.max(array.length - n, 0));

    _copy(this.buffer, BufferSize - this.bufferUsed, array, n, length);

    this.end.copyToArray(n + length, array);
  }

  prepend(a1) {
    const binary = this.binary && isByte(a1);

    if (this.bufferUsed < this.buffer.length && this.chain.compareAndSet(this.bufferUsed, this.bufferUsed + 1)) {
      if (this.binary && !binary) {
        const buffer = new Array(BufferSize);

        for (let i = 0; i < BufferSize; i++) {
          buffer[i] = this.buffer[i];
        }

        buffer[BufferSize - this.bufferUsed - 1] = a1;
        return new PrependN(this.end, buffer, this.bufferUsed + 1, this.chain, false);
      }

      this.buffer[BufferSize - this.bufferUsed - 1] = a1;
      return new PrependN(this.end, this.buffer, this.bufferUsed + 1, this.chain, this.binary && binary);
    } else {
      const buffer = binary ? alloc(BufferSize) : new Array(BufferSize);
      buffer[BufferSize - 1] = a1;
      const chunk = array_("subarray" in this.buffer ? this.buffer.subarray(this.buffer.length - this.bufferUsed) : this.buffer.slice(this.buffer.length - this.bufferUsed));
      return new PrependN(chunk.concat(this.end), buffer, 1, new AtomicNumber(1), this.binary && binary);
    }
  }

  [Symbol.iterator]() {
    const k = this.arrayLike();
    return k[Symbol.iterator]();
  }

  arrayLikeIterator() {
    let done = false;
    return {
      next: () => {
        if (!done) {
          done = true;
          return {
            value: this.arrayLike(),
            done: false
          };
        } else {
          return {
            value: 1,
            done: true
          };
        }
      }
    };
  }

  reverseArrayLikeIterator() {
    let done = false;
    return {
      next: () => {
        if (!done) {
          done = true;
          return {
            value: this.arrayLike(),
            done: false
          };
        } else {
          return {
            value: 1,
            done: true
          };
        }
      }
    };
  }

}
/**
 * Internal copy arrays
 */

export function _copy(src, srcPos, dest, destPos, len) {
  for (let i = srcPos; i < Math.min(src.length, srcPos + len); i++) {
    dest[destPos + i - srcPos] = src[i];
  }

  return dest;
}
export const ConcatTypeId = /*#__PURE__*/Symbol();
/**
 * Internal Concat Chunk
 */

export class Concat extends ChunkInternal {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
    this._typeId = ConcatTypeId;
    this.depth = 1 + Math.max(this.left.depth, this.right.depth);
    this.length = this.left.length + this.right.length;
    this.binary = this.left.binary && this.right.binary;
  }

  get(n) {
    return n < this.left.length ? this.left.get(n) : this.right.get(n - this.left.length);
  }

  copyToArray(n, array) {
    this.left.copyToArray(n, array);
    this.right.copyToArray(n + this.left.length, array);
  }

  [Symbol.iterator]() {
    const k = this.arrayLike();
    return k[Symbol.iterator]();
  }

  arrayLikeIterator() {
    let it = this.left.arrayLikeIterator();
    let i = 0;
    let n = it.next();
    let j = 0;
    return {
      next: () => {
        j++;

        if (i === 0 && n.done) {
          it = this.right.arrayLikeIterator();
          const k = it.next();

          if (k.done) {
            return {
              value: j,
              done: true
            };
          }

          i++;
          n = it.next();
          return k;
        } else {
          if (n.done) {
            return {
              value: j,
              done: true
            };
          }

          const k = n;
          n = it.next();
          return k;
        }
      }
    };
  }

  reverseArrayLikeIterator() {
    let it = this.right.arrayLikeIterator();
    let i = 0;
    let n = it.next();
    let j = 0;
    return {
      next: () => {
        j++;

        if (i === 0 && n.done) {
          it = this.left.arrayLikeIterator();
          const k = it.next();

          if (k.done) {
            return {
              value: j,
              done: true
            };
          }

          i++;
          n = it.next();
          return k;
        } else {
          if (n.done) {
            return {
              value: j,
              done: true
            };
          }

          const k = n;
          n = it.next();
          return k;
        }
      }
    };
  }

}
export function isChunk(u) {
  return typeof u === "object" && u != null && ChunkTypeId in u;
}

function array_(array) {
  if (isChunk(array)) {
    ;
    return array;
  }

  if (array instanceof Uint8Array) {
    return new Uint8Arr(array);
  }

  return new PlainArr(Array.isArray(array) ? array : Array.from(array));
}
/**
 * Builds a chunk from an array.
 */


export const from = array_;
/**
 * Determines whether this chunk and the specified chunk have the same length
 * and every pair of corresponding elements of this chunk and the specified
 * chunk satisfy the specified predicate.
 */

export function corresponds_(self, that, f) {
  if (self.length !== that.length) {
    return false;
  }

  const leftIterator = self.arrayLikeIterator();
  const rightIterator = that.arrayLikeIterator();
  let i = 0;
  let j = 0;
  let equal = true;
  let done = false;
  let leftLength = 0;
  let rightLength = 0;
  let left = undefined;
  let right = undefined;
  let leftNext;
  let rightNext;

  while (equal && !done) {
    if (i < leftLength && j < rightLength) {
      if (!f(left[i], right[j])) {
        equal = false;
      }

      i++;
      j++;
    } else if (i === leftLength && (leftNext = leftIterator.next()) && !leftNext.done) {
      left = leftNext.value;
      leftLength = left.length;
      i = 0;
    } else if (j === rightLength && (rightNext = rightIterator.next()) && !rightNext.done) {
      right = rightNext.value;
      rightLength = right.length;
      j = 0;
    } else if (i === leftLength && j === rightLength) {
      done = true;
    } else {
      equal = false;
    }
  }

  return equal;
}
/**
 * Determines whether this chunk and the specified chunk have the same length
 * and every pair of corresponding elements of this chunk and the specified
 * chunk satisfy the specified predicate.
 *
 * @ets_data_first corresponds_
 */

export function corresponds(that, f) {
  return self => corresponds_(self, that, f);
}
export function toString(self) {
  return self.toString();
}
//# sourceMappingURL=definition.mjs.map