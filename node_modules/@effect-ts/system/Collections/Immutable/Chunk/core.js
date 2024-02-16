"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  single: true,
  empty: true,
  append: true,
  append_: true,
  prepend: true,
  prepend_: true,
  concat: true,
  concat_: true,
  toArrayLike: true,
  toArray: true,
  get_: true,
  get: true,
  unsafeGet_: true,
  unsafeGet: true,
  equals_: true,
  equals: true,
  take_: true,
  take: true,
  takeRight_: true,
  takeRight: true,
  drop_: true,
  drop: true,
  dropRight_: true,
  dropRight: true,
  size: true,
  map_: true,
  map: true,
  mapWithIndex_: true,
  mapWithIndex: true,
  chain_: true,
  chain: true,
  flatten: true,
  head: true,
  tail: true,
  last: true,
  unsafeHead: true,
  unsafeTail: true,
  unsafeLast: true,
  isEmpty: true,
  isNonEmpty: true,
  buckets: true,
  reverseBuckets: true,
  reverse: true,
  materialize: true,
  unit: true,
  make: true,
  makeBy_: true,
  builder: true,
  ChunkBuilder: true
};
exports.ChunkBuilder = void 0;
exports.append = append;
exports.append_ = append_;
exports.buckets = buckets;
exports.builder = builder;
exports.chain = chain;
exports.chain_ = chain_;
exports.concat = concat;
exports.concat_ = concat_;
exports.drop = drop;
exports.dropRight = dropRight;
exports.dropRight_ = dropRight_;
exports.drop_ = drop_;
exports.empty = empty;
exports.equals = equals;
exports.equals_ = equals_;
exports.flatten = flatten;
exports.get = get;
exports.get_ = get_;
exports.head = head;
exports.isEmpty = isEmpty;
exports.isNonEmpty = isNonEmpty;
exports.last = last;
exports.make = make;
exports.makeBy_ = makeBy_;
exports.map = map;
exports.mapWithIndex = mapWithIndex;
exports.mapWithIndex_ = mapWithIndex_;
exports.map_ = map_;
exports.materialize = materialize;
exports.prepend = prepend;
exports.prepend_ = prepend_;
exports.reverse = reverse;
exports.reverseBuckets = reverseBuckets;
exports.single = single;
exports.size = size;
exports.tail = tail;
exports.take = take;
exports.takeRight = takeRight;
exports.takeRight_ = takeRight_;
exports.take_ = take_;
exports.toArray = toArray;
exports.toArrayLike = toArrayLike;
exports.unit = void 0;
exports.unsafeGet = unsafeGet;
exports.unsafeGet_ = unsafeGet_;
exports.unsafeHead = unsafeHead;
exports.unsafeLast = unsafeLast;
exports.unsafeTail = unsafeTail;

var _index = /*#__PURE__*/require("../../../Function/index.js");

var _index2 = /*#__PURE__*/require("../../../GlobalExceptions/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Option/index.js"));

var St = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Structural/index.js"));

var _definition = /*#__PURE__*/require("./definition.js");

Object.keys(_definition).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _definition[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _definition[key];
    }
  });
});

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Builds a chunk of a single value
 */
function single(a) {
  return new _definition.Singleton(a);
}
/**
 * Builds an empty chunk
 */


function empty() {
  return _definition._Empty;
}
/**
 * Appends a value to a chunk
 *
 * @ets_data_first append_
 */


function append(a) {
  return self => self.append(a);
}
/**
 * Appends a value to a chunk
 */


function append_(self, a) {
  return self.append(a);
}
/**
 * Prepends a value to a chunk
 *
 * @ets_data_first prepend_
 */


function prepend(a) {
  return self => self.prepend(a);
}
/**
 * Prepends a value to a chunk
 */


function prepend_(self, a) {
  return self.prepend(a);
}
/**
 * Concats chunks
 *
 * @ets_data_first concat_
 */


function concat(that) {
  return self => self.concat(that);
}
/**
 * Concats chunks
 */


function concat_(self, that) {
  return self.concat(that);
}
/**
 * Converts a chunk to an ArrayLike (either Array or Buffer)
 */


function toArrayLike(self) {
  return self.arrayLike();
}
/**
 * Converts a chunk to an Array
 */


function toArray(self) {
  return self.array();
}
/**
 * Safely get a value
 */


function get_(self, n) {
  return !Number.isInteger(n) || n < 0 || n >= self.length ? O.none : O.some(self.get(n));
}
/**
 * Safely get a value
 *
 * @ets_data_first get_
 */


function get(n) {
  return self => get_(self, n);
}
/**
 * Unsafely get a value
 */


function unsafeGet_(self, n) {
  return self.get(n);
}
/**
 * Safely get a value
 *
 * @ets_data_first unsafeGet_
 */


function unsafeGet(n) {
  return self => unsafeGet_(self, n);
}
/**
 * Referential equality check
 */


function equals_(self, that) {
  return (0, _definition.corresponds_)(self, that, St.equals);
}
/**
 * Referential equality check
 *
 * @ets_data_first equals_
 */


function equals(that) {
  return self => equals_(self, that);
}
/**
 * Takes the first n elements
 */


function take_(self, n) {
  return self.take(n);
}
/**
 * Takes the first n elements
 *
 * @ets_data_first take_
 */


function take(n) {
  return self => self.take(n);
}
/**
 * Takes the last n elements
 */


function takeRight_(self, n) {
  return drop_(self, size(self) - n);
}
/**
 * Takes the last n elements
 *
 * @ets_data_first takeRight_
 */


function takeRight(n) {
  return self => takeRight_(self, n);
}
/**
 * Drops the first n elements
 */


function drop_(self, n) {
  ;

  if (n <= 0) {
    return self;
  } else if (n >= self.length) {
    return _definition._Empty;
  } else {
    const len = self.length;

    switch (self._typeId) {
      case _definition.EmptyTypeId:
        {
          return _definition._Empty;
        }

      case _definition.SliceTypeId:
        {
          return new _definition.Slice(self.chunk, self.offset + n, self.length - n);
        }

      case _definition.SingletonTypeId:
        {
          if (n > 0) {
            return _definition._Empty;
          }

          return self;
        }

      default:
        {
          return new _definition.Slice(self, n, len - n);
        }
    }
  }
}
/**
 * Drops the first n elements
 *
 * @ets_data_first drop_
 */


function drop(n) {
  return self => drop_(self, n);
}
/**
 * Drops the first n elements
 */


function dropRight_(self, n) {
  ;
  return take_(self, Math.max(0, self.length - n));
}
/**
 * Drops the first n elements
 *
 * @ets_data_first dropRight_
 */


function dropRight(n) {
  return self => dropRight_(self, n);
}
/**
 * Returns the number of elements in the chunk
 */


function size(self) {
  return self.length;
}
/**
 * Returns a chunk with the elements mapped by the specified function.
 */


function map_(self, f) {
  ;

  if (self._typeId === _definition.SingletonTypeId) {
    return new _definition.Singleton(f(self.a));
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


function map(f) {
  return self => map_(self, f);
}
/**
 * Returns a chunk with the elements mapped by the specified function.
 */


function mapWithIndex_(self, f) {
  ;

  if (self._typeId === _definition.SingletonTypeId) {
    return new _definition.Singleton(f(0, self.a));
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


function mapWithIndex(f) {
  return self => mapWithIndex_(self, f);
}
/**
 * Returns a chunk with the elements mapped by the specified function.
 */


function chain_(self, f) {
  ;

  if (self._typeId === _definition.SingletonTypeId) {
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


function chain(f) {
  return self => chain_(self, f);
}
/**
 * Flattens a chunk of chunks into a single chunk by concatenating all chunks.
 */


function flatten(self) {
  return chain_(self, _index.identity);
}
/**
 * Returns the first element of this chunk if it exists.
 */


function head(self) {
  return get_(self, 0);
}
/**
 * Returns every elements after the first
 */


function tail(self) {
  return self.length > 0 ? O.some(drop_(self, 1)) : O.none;
}
/**
 * Returns the last element of this chunk if it exists.
 */


function last(self) {
  return get_(self, self.length - 1);
}
/**
 * Returns the first element of this chunk. Note that this method is partial
 * in that it will throw an exception if the chunk is empty. Consider using
 * `head` to explicitly handle the possibility that the chunk is empty
 * or iterating over the elements of the chunk in lower level, performance
 * sensitive code unless you really only need the first element of the chunk.
 */


function unsafeHead(self) {
  return self.get(0);
}
/**
 * Returns every elements after the first. Note that this method is partial
 * in that it will throw an exception if the chunk is empty. Consider using
 * `head` to explicitly handle the possibility that the chunk is empty
 * or iterating over the elements of the chunk in lower level, performance
 * sensitive code unless you really only need the first element of the chunk.
 */


function unsafeTail(self) {
  if (self.length === 0) {
    throw new _index2.ArrayIndexOutOfBoundsException(1);
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


function unsafeLast(self) {
  return self.get(self.length - 1);
}
/**
 * Determines if the chunk is empty.
 */


function isEmpty(self) {
  return self.length === 0;
}
/**
 * Determines if the chunk is empty.
 */


function isNonEmpty(self) {
  return self.length !== 0;
}
/**
 * Buckets iterator
 */


function buckets(self) {
  return self.buckets();
}
/**
 * Reverse buckets iterator
 */


function reverseBuckets(self) {
  return self.reverseBuckets();
}
/**
 * Reverse buckets iterator
 */


function reverse(self) {
  return self.reverse();
}
/**
 * Materializes a chunk into a chunk backed by an array. This method can
 * improve the performance of bulk operations.
 */


function materialize(self) {
  return self.materialize();
}
/**
 * The unit chunk
 */


const unit = /*#__PURE__*/single(void 0);
/**
 * Build a chunk from a sequence of values
 *
 * NOTE: different from Chunk#from this copies the elements 1 by 1
 * allowing for binary to be correctly stored in typed arrays
 */

exports.unit = unit;

function make(...iter) {
  let builder = empty();

  for (const x of iter) {
    builder = append_(builder, x);
  }

  return builder;
}
/**
 * Return a chunk of length `n` with element `i` initialized with `f(i)`
 */


function makeBy_(n, f) {
  const b = builder();

  for (let i = 0; i < n; i++) {
    b.append(f(i));
  }

  return b.build();
}
/**
 * Builder
 */


function builder() {
  return new ChunkBuilder(empty());
}

class ChunkBuilder {
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

exports.ChunkBuilder = ChunkBuilder;
//# sourceMappingURL=core.js.map