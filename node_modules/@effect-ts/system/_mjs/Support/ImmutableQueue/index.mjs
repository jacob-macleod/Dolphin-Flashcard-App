// ets_tracing: off
import "../../Operator/index.mjs";
import * as L from "../../Collections/Immutable/List/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as O from "../../Option/index.mjs";
export class ImmutableQueue {
  constructor(backing) {
    this.backing = backing;
  }

  push(a) {
    return new ImmutableQueue(L.append_(this.backing, a));
  }

  prepend(a) {
    return new ImmutableQueue(L.prepend_(this.backing, a));
  }

  get size() {
    return this.backing.length;
  }

  dequeue() {
    if (!L.isEmpty(this.backing)) {
      return O.some(Tp.tuple( // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      L.unsafeFirst(this.backing), new ImmutableQueue(L.tail(this.backing))));
    } else {
      return O.none;
    }
  }

  find(f) {
    return L.find_(this.backing, f);
  }

  filter(f) {
    return new ImmutableQueue(L.filter_(this.backing, f));
  }

  static single(a) {
    return new ImmutableQueue(L.of(a));
  }

  [Symbol.iterator]() {
    return L.toArray(this.backing).values();
  }

}
//# sourceMappingURL=index.mjs.map