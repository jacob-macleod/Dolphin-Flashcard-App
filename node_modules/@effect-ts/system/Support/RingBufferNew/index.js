"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RingBufferNew = void 0;

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class RingBufferNew {
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.current = 0;
    this.array = Array.from({
      length: capacity
    }, _ => null);
  }

  head() {
    return O.fromNullable(this.array[this.current]);
  }

  lastorNull() {
    var _a;

    if (this.size === 0) {
      return null;
    }

    const index = this.current === 0 ? this.array.length - 1 : this.current - 1;
    return (_a = this.array[index]) !== null && _a !== void 0 ? _a : null;
  }

  put(value) {
    this.array[this.current] = value;
    this.increment();
  }

  dropLast() {
    if (this.size > 0) {
      this.decrement();
      this.array[this.current] = null;
    }
  }

  toChunk() {
    const begin = this.current - this.size;
    const newArray = begin < 0 ? this.array.slice(this.capacity + begin, this.capacity).concat(this.array.slice(0, this.current)) : this.array.slice(begin, this.current);
    return Chunk.from(newArray);
  }

  increment() {
    if (this.size < this.capacity) {
      this.size += 1;
    }

    this.current = (this.current + 1) % this.capacity;
  }

  decrement() {
    this.size -= 1;

    if (this.current > 0) {
      this.current -= 1;
    } else {
      this.current = this.capacity - 1;
    }
  }

}

exports.RingBufferNew = RingBufferNew;
//# sourceMappingURL=index.js.map