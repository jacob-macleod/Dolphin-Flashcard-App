"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SIZE = exports.MIN_ARRAY_NODE = exports.MAX_INDEX_NODE = exports.MASK = exports.BUCKET_SIZE = void 0;
// ets_tracing: off
// Configuration
const SIZE = 5;
exports.SIZE = SIZE;
const BUCKET_SIZE = /*#__PURE__*/Math.pow(2, SIZE);
exports.BUCKET_SIZE = BUCKET_SIZE;
const MASK = BUCKET_SIZE - 1;
exports.MASK = MASK;
const MAX_INDEX_NODE = BUCKET_SIZE / 2;
exports.MAX_INDEX_NODE = MAX_INDEX_NODE;
const MIN_ARRAY_NODE = BUCKET_SIZE / 4;
exports.MIN_ARRAY_NODE = MIN_ARRAY_NODE;
//# sourceMappingURL=index.js.map