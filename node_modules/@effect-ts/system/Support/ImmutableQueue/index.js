"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImmutableQueue = void 0;

require("../../Operator/index.js");

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/List/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class ImmutableQueue {
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

exports.ImmutableQueue = ImmutableQueue;
//# sourceMappingURL=index.js.map