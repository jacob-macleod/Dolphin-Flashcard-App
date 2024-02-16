"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeafNode = exports.IndexedNode = exports.Empty = exports.CollisionNode = exports.ArrayNode = void 0;
exports.canEditNode = canEditNode;
exports.isEmptyNode = isEmptyNode;
exports.isLeaf = isLeaf;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var _index2 = /*#__PURE__*/require("../../../../Stack/index.js");

var St = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Structural/index.js"));

var _index4 = /*#__PURE__*/require("../Array/index.js");

var _index5 = /*#__PURE__*/require("../Bitwise/index.js");

var _index6 = /*#__PURE__*/require("../Config/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Empty {
  constructor() {
    this._tag = "Empty";
  }

  modify(edit, _shift, f, hash, key, size) {
    const v = f(O.none);
    if (O.isNone(v)) return new Empty();
    ++size.value;
    return new LeafNode(edit, hash, key, v);
  }

}

exports.Empty = Empty;

function isEmptyNode(a) {
  return a instanceof Empty;
}

function isLeaf(node) {
  return isEmptyNode(node) || node._tag === "LeafNode" || node._tag === "CollisionNode";
}

function canEditNode(edit, node) {
  return isEmptyNode(node) ? false : edit === node.edit;
}

class LeafNode {
  constructor(edit, hash, key, value) {
    this.edit = edit;
    this.hash = hash;
    this.key = key;
    this.value = value;
    this._tag = "LeafNode";
  }

  modify(edit, shift, f, hash, key, size) {
    if (St.equals(key, this.key)) {
      const v = f(this.value);
      if (v === this.value) return this;else if (O.isNone(v)) {
        --size.value;
        return new Empty();
      }

      if (canEditNode(edit, this)) {
        this.value = v;
        return this;
      }

      return new LeafNode(edit, hash, key, v);
    }

    const v = f(O.none);
    if (O.isNone(v)) return this;
    ++size.value;
    return mergeLeaves(edit, shift, this.hash, this, hash, new LeafNode(edit, hash, key, v));
  }

}

exports.LeafNode = LeafNode;

class CollisionNode {
  constructor(edit, hash, children) {
    this.edit = edit;
    this.hash = hash;
    this.children = children;
    this._tag = "CollisionNode";
  }

  modify(edit, shift, f, hash, key, size) {
    if (hash === this.hash) {
      const canEdit = canEditNode(edit, this);
      const list = this.updateCollisionList(canEdit, edit, this.hash, this.children, f, key, size);
      if (list === this.children) return this;
      return list.length > 1 ? new CollisionNode(edit, this.hash, list) : list[0]; // collapse single element collision list
    }

    const v = f(O.none);
    if (O.isNone(v)) return this;
    ++size.value;
    return mergeLeaves(edit, shift, this.hash, this, hash, new LeafNode(edit, hash, key, v));
  }

  updateCollisionList(mutate, edit, hash, list, f, key, size) {
    const len = list.length;

    for (let i = 0; i < len; ++i) {
      const child = list[i];

      if ("key" in child && St.equals(key, child.key)) {
        const value = child.value;
        const newValue = f(value);
        if (newValue === value) return list;

        if (O.isNone(newValue)) {
          --size.value;
          return (0, _index4.arraySpliceOut)(mutate, i, list);
        }

        return (0, _index4.arrayUpdate)(mutate, i, new LeafNode(edit, hash, key, newValue), list);
      }
    }

    const newValue = f(O.none);
    if (O.isNone(newValue)) return list;
    ++size.value;
    return (0, _index4.arrayUpdate)(mutate, len, new LeafNode(edit, hash, key, newValue), list);
  }

}

exports.CollisionNode = CollisionNode;

class IndexedNode {
  constructor(edit, mask, children) {
    this.edit = edit;
    this.mask = mask;
    this.children = children;
    this._tag = "IndexedNode";
  }

  modify(edit, shift, f, hash, key, size) {
    const mask = this.mask;
    const children = this.children;
    const frag = (0, _index5.hashFragment)(shift, hash);
    const bit = (0, _index5.toBitmap)(frag);
    const indx = (0, _index5.fromBitmap)(mask, bit);
    const exists = mask & bit;
    const canEdit = canEditNode(edit, this);

    if (!exists) {
      const _newChild = new Empty().modify(edit, shift + _index6.SIZE, f, hash, key, size);

      if (!_newChild) return this;
      return children.length >= _index6.MAX_INDEX_NODE ? expand(edit, frag, _newChild, mask, children) : new IndexedNode(edit, mask | bit, (0, _index4.arraySpliceIn)(canEdit, indx, _newChild, children));
    }

    const current = exists ? children[indx] : new Empty();
    const child = current.modify(edit, shift + _index6.SIZE, f, hash, key, size);
    if (current === child) return this;
    let bitmap = mask;
    let newChildren;

    if (isEmptyNode(child)) {
      // remove
      bitmap &= ~bit;
      if (!bitmap) return new Empty();
      if (children.length <= 2 && isLeaf(children[indx ^ 1])) return children[indx ^ 1]; // collapse

      newChildren = (0, _index4.arraySpliceOut)(canEdit, indx, children);
    } else {
      // modify
      newChildren = (0, _index4.arrayUpdate)(canEdit, indx, child, children);
    }

    if (canEdit) {
      this.mask = bitmap;
      this.children = newChildren;
      return this;
    }

    return new IndexedNode(edit, bitmap, newChildren);
  }

}

exports.IndexedNode = IndexedNode;

class ArrayNode {
  constructor(edit, size, children) {
    this.edit = edit;
    this.size = size;
    this.children = children;
    this._tag = "ArrayNode";
  }

  modify(edit, shift, f, hash, key, size) {
    let count = this.size;
    const children = this.children;
    const frag = (0, _index5.hashFragment)(shift, hash);
    const child = children[frag];
    const newChild = (child || new Empty()).modify(edit, shift + _index6.SIZE, f, hash, key, size);
    if (child === newChild) return this;
    const canEdit = canEditNode(edit, this);
    let newChildren;

    if (isEmptyNode(child) && !isEmptyNode(newChild)) {
      // add
      ++count;
      newChildren = (0, _index4.arrayUpdate)(canEdit, frag, newChild, children);
    } else if (!isEmptyNode(child) && isEmptyNode(newChild)) {
      // remove
      --count;

      if (count <= _index6.MIN_ARRAY_NODE) {
        return pack(edit, count, frag, children);
      }

      newChildren = (0, _index4.arrayUpdate)(canEdit, frag, new Empty(), children);
    } else {
      // modify
      newChildren = (0, _index4.arrayUpdate)(canEdit, frag, newChild, children);
    }

    if (canEdit) {
      this.size = count;
      this.children = newChildren;
      return this;
    }

    return new ArrayNode(edit, count, newChildren);
  }

}

exports.ArrayNode = ArrayNode;

function pack(edit, count, removed, elements) {
  const children = new Array(count - 1);
  let g = 0;
  let bitmap = 0;

  for (let i = 0, len = elements.length; i < len; ++i) {
    if (i !== removed) {
      const elem = elements[i];

      if (elem && !isEmptyNode(elem)) {
        children[g++] = elem;
        bitmap |= 1 << i;
      }
    }
  }

  return new IndexedNode(edit, bitmap, children);
}

function expand(edit, frag, child, bitmap, subNodes) {
  const arr = [];
  let bit = bitmap;
  let count = 0;

  for (let i = 0; bit; ++i) {
    if (bit & 1) arr[i] = subNodes[count++];
    bit >>>= 1;
  }

  arr[frag] = child;
  return new ArrayNode(edit, count + 1, arr);
}

function mergeLeavesInner(edit, shift, h1, n1, h2, n2) {
  if (h1 === h2) return new CollisionNode(edit, h1, [n2, n1]);
  const subH1 = (0, _index5.hashFragment)(shift, h1);
  const subH2 = (0, _index5.hashFragment)(shift, h2);

  if (subH1 === subH2) {
    return child => new IndexedNode(edit, (0, _index5.toBitmap)(subH1) | (0, _index5.toBitmap)(subH2), [child]);
  } else {
    const children = subH1 < subH2 ? [n1, n2] : [n2, n1];
    return new IndexedNode(edit, (0, _index5.toBitmap)(subH1) | (0, _index5.toBitmap)(subH2), children);
  }
}

function mergeLeaves(edit, shift, h1, n1, h2, n2) {
  let stack = undefined;
  let currentShift = shift; // eslint-disable-next-line no-constant-condition

  while (true) {
    const res = mergeLeavesInner(edit, currentShift, h1, n1, h2, n2);

    if (typeof res === "function") {
      stack = new _index2.Stack(res, stack);
      currentShift = currentShift + _index6.SIZE;
    } else {
      let final = res;

      while (stack != null) {
        final = stack.value(final);
        stack = stack.previous;
      }

      return final;
    }
  }
}
//# sourceMappingURL=index.js.map