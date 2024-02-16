// ets_tracing: off
import * as Chunk from "../../Collections/Immutable/Chunk/index.mjs";
import * as O from "../../Option/index.mjs";
export class RingBufferNew {
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
//# sourceMappingURL=index.mjs.map