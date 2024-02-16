"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RingBuffer = void 0;

require("../../Operator/index.js");

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/List/index.js"));

var _index3 = /*#__PURE__*/require("../DoublyLinkedList/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class RingBuffer {
  constructor(size, ignoreFn) {
    this.size = size;
    this.ignoreFn = ignoreFn;
    this.values = new _index3.DoublyLinkedList();
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

exports.RingBuffer = RingBuffer;
//# sourceMappingURL=index.js.map