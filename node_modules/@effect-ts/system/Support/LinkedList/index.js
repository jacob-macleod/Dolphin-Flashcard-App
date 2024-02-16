"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkedListNode = exports.LinkedList = void 0;

require("../../Operator/index.js");

// ets_tracing: off
class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

}

exports.LinkedListNode = LinkedListNode;

class LinkedList {
  constructor(head = null, tail = null) {
    this.head = head;
    this.tail = tail;
    this.head = null;
    this.tail = null;
  }

  empty() {
    return this.head === null;
  }

  prepend(value) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value) {
    const newNode = new LinkedListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    } // eslint-disable-next-line @typescript-eslint/no-non-null-assertion


    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

}

exports.LinkedList = LinkedList;
//# sourceMappingURL=index.js.map