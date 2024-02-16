// ets_tracing: off
import "../../Operator/index.mjs";
import * as L from "../../Collections/Immutable/List/index.mjs";
import { DoublyLinkedList } from "../DoublyLinkedList/index.mjs";
export class RingBuffer {
  constructor(size, ignoreFn) {
    this.size = size;
    this.ignoreFn = ignoreFn;
    this.values = new DoublyLinkedList();
    this.ignored = 0;
  }

  push(value) {
    if (this.values.length - this.ignored >= this.size) {
      this.values.shift();
    }

    this.values.add(value);

    if (this.ignoreFn && this.ignoreFn(value)) {
      this.ignored++;
    }

    return this.values;
  }

  pop() {
    const popped = this.values.pop();

    if (popped && this.ignoreFn && this.ignoreFn(popped)) {
      this.ignored--;
    }

    return this.values;
  }

  get list() {
    const l = L.emptyPushable();
    this.values.forEach(t => {
      L.push_(l, t);
    });
    return l;
  }

  get listReverse() {
    return L.reverse(this.list);
  }

}
//# sourceMappingURL=index.mjs.map