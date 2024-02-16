"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkedListNode = exports.DoublyLinkedList = void 0;

require("../../Operator/index.js");

// ets_tracing: off
class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.removed = false;
    this.right = undefined;
    this.left = undefined;
  }

}

exports.LinkedListNode = LinkedListNode;

class DoublyLinkedList {
  constructor() {
    this.length = 0;
    this.headN = undefined;
    this.tailN = undefined;
  }

  get head() {
    return this.headN === undefined ? undefined : this.headN.value;
  }

  get isEmpty() {
    return this.length === 0;
  }

  get tail() {
    return this.tailN === undefined ? undefined : this.tailN.value;
  }

  forEach(f) {
    let current = this.headN;

    while (current !== undefined) {
      f(current.value);
      current = current.right;
    }
  }

  add(val) {
    const node = new LinkedListNode(val);

    if (this.length === 0) {
      this.headN = node;
    }

    if (this.tailN === undefined) {
      this.tailN = node;
    } else {
      this.tailN.right = node;
      node.left = this.tailN;
      this.tailN = node;
    }

    this.length += 1;
    return node;
  }

  empty() {
    this.length = 0;
    this.headN = this.tailN = undefined;
  }

  pop() {
    const h = this.tailN;

    if (h !== undefined) {
      this.remove(h);
      return h.value;
    }

    return undefined;
  }

  remove(n) {
    if (n.removed) {
      return;
    }

    n.removed = true;

    if (n.left !== undefined && n.right !== undefined) {
      n.left.right = n.right;
      n.right.left = n.left;
    } else if (n.left !== undefined) {
      this.tailN = n.left;
      n.left.right = undefined;
    } else if (n.right !== undefined) {
      this.headN = n.right;
      n.right.left = undefined;
    } else {
      this.tailN = undefined;
      this.headN = undefined;
    }

    if (this.length > 0) {
      this.length -= 1;
    }
  }

  shift() {
    const h = this.headN;

    if (h !== undefined) {
      this.remove(h);
      return h.value;
    }

    return undefined;
  }

}

exports.DoublyLinkedList = DoublyLinkedList;
//# sourceMappingURL=index.js.map