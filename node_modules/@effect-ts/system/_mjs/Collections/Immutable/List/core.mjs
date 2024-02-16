import { identity } from "../../../Function/index.mjs";
import * as O from "../../../Option/index.mjs";
import * as St from "../../../Structural/index.mjs";
import * as Tp from "../Tuple/index.mjs";
/**
 * Forked from https://github.com/funkia/list/blob/master/src/index.ts
 *
 * All credits to original authors.
 *
 * The implementation has been forked to adapt to the double standard pipeable/data first
 * available in the remaining modules and to remove the fantasy-land bias.
 */

const branchingFactor = 32;
const branchBits = 5;
const mask = 31;

function elementEquals(a, b) {
  if (a === b) {
    return true;
  } else {
    return false;
  }
}

function createPath(depth, value) {
  let current = value;

  for (let i = 0; i < depth; ++i) {
    current = new Node(undefined, [current]);
  }

  return current;
} // Array helper functions


function copyArray(source) {
  const array = [];

  for (let i = 0; i < source.length; ++i) {
    array[i] = source[i];
  }

  return array;
}

function pushElements(source, target, offset, amount) {
  for (let i = offset; i < offset + amount; ++i) {
    target.push(source[i]);
  }
}

function copyIndices(source, sourceStart, target, targetStart, length) {
  for (let i = 0; i < length; ++i) {
    target[targetStart + i] = source[sourceStart + i];
  }
}

function arrayPrepend(value, array) {
  const newLength = array.length + 1;
  const result = new Array(newLength);
  result[0] = value;

  for (let i = 1; i < newLength; ++i) {
    result[i] = array[i - 1];
  }

  return result;
}
/**
 * Create a reverse _copy_ of an array.
 */


function reverseArray(array) {
  return array.slice().reverse();
}

function arrayFirst(array) {
  return array[0];
}

function arrayLast(array) {
  return array[array.length - 1];
}

const pathResult = {
  path: 0,
  index: 0,
  updatedOffset: 0
};

function getPath(index, offset, depth, sizes) {
  if (sizes === undefined && offset !== 0) {
    pathResult.updatedOffset = 0;
    index = handleOffset(depth, offset, index);
  }

  let path = index >> depth * branchBits & mask;

  if (sizes !== undefined) {
    while (sizes[path] <= index) {
      path++;
    }

    const traversed = path === 0 ? 0 : sizes[path - 1];
    index -= traversed;
    pathResult.updatedOffset = offset;
  }

  pathResult.path = path;
  pathResult.index = index;
  return pathResult;
}

function updateNode(node, depth, index, offset, value) {
  const {
    index: newIndex,
    path,
    updatedOffset
  } = getPath(index, offset, depth, node.sizes);
  const array = copyArray(node.array);
  array[path] = depth > 0 ? updateNode(array[path], depth - 1, newIndex, updatedOffset, value) : value;
  return new Node(node.sizes, array);
}

export class Node {
  constructor(sizes, array) {
    this.sizes = sizes;
    this.array = array;
  }

}

function cloneNode({
  array,
  sizes
}) {
  return new Node(sizes === undefined ? undefined : copyArray(sizes), copyArray(array));
} // This array should not be mutated. Thus a dummy element is placed in
// it. Thus the affix will not be owned and thus not mutated.


const emptyAffix = [0]; // We store a bit field in list. From right to left, the first five
// bits are suffix length, the next five are prefix length and the
// rest is depth. The functions below are for working with the bits in
// a sane way.

const affixBits = 6;
const affixMask = 0b111111;

function getSuffixSize(l) {
  return l.bits & affixMask;
}

function getPrefixSize(l) {
  return l.bits >> affixBits & affixMask;
}

function getDepth(l) {
  return l.bits >> affixBits * 2;
}

function setPrefix(size, bits) {
  return size << affixBits | bits & ~(affixMask << affixBits);
}

function setSuffix(size, bits) {
  return size | bits & ~affixMask;
}

function setDepth(depth, bits) {
  return depth << affixBits * 2 | bits & (affixMask | affixMask << affixBits);
}

function incrementPrefix(bits) {
  return bits + (1 << affixBits);
}

function incrementSuffix(bits) {
  return bits + 1;
}

function incrementDepth(bits) {
  return bits + (1 << affixBits * 2);
}

function decrementDepth(bits) {
  return bits - (1 << affixBits * 2);
}
/*
 * Invariants that any list `l` should satisfy
 *
 * 1. If `l.root !== undefined` then `getSuffixSize(l) !== 0` and
 *    `getPrefixSize(l) !== 0`. The invariant ensures that `first` and
 *    `last` never have to look in the root and that they therefore
 *    take O(1) time.
 * 2. If a tree or sub-tree does not have a size-table then all leaf
 *    nodes in the tree are of size 32.
 */

/**
 * Represents a list of elements.
 */


export class List {
  constructor(bits, offset, length, prefix, root, suffix) {
    this.bits = bits;
    this.offset = offset;
    this.length = length;
    this.prefix = prefix;
    this.root = root;
    this.suffix = suffix;
  }

  [Symbol.iterator]() {
    return new ForwardListIterator(this);
  }

  toJSON() {
    return toArray(this);
  }

  [St.equalsSym](that) {
    return that instanceof List && equalsWith_(this, that, St.equals);
  }

  get [St.hashSym]() {
    return St.hashIterator(this[Symbol.iterator]());
  }

}

function cloneList(l) {
  return new List(l.bits, l.offset, l.length, l.prefix, l.root, l.suffix);
}

class ListIterator {
  constructor(l, direction) {
    this.l = l;
    this.result = {
      done: false,
      value: undefined
    };
    this.idx = direction === 1 ? -1 : l.length;
    this.prefixSize = getPrefixSize(l);
    this.middleSize = l.length - getSuffixSize(l);

    if (l.root !== undefined) {
      const depth = getDepth(l);
      this.stack = new Array(depth + 1);
      this.indices = new Array(depth + 1);
      let currentNode = l.root.array;

      for (let i = depth; 0 <= i; --i) {
        this.stack[i] = currentNode;
        const idx = direction === 1 ? 0 : currentNode.length - 1;
        this.indices[i] = idx;
        currentNode = currentNode[idx].array;
      }

      this.indices[0] -= direction;
    }
  }

}

class ForwardListIterator extends ListIterator {
  constructor(l) {
    super(l, 1);
  }

  nextInTree() {
    for (var i = 0; ++this.indices[i] === this.stack[i].length; ++i) {
      this.indices[i] = 0;
    }

    for (; 0 < i; --i) {
      this.stack[i - 1] = this.stack[i][this.indices[i]].array;
    }
  }

  next() {
    let newVal;
    const idx = ++this.idx;

    if (idx < this.prefixSize) {
      newVal = this.l.prefix[this.prefixSize - idx - 1];
    } else if (idx < this.middleSize) {
      this.nextInTree();
      newVal = this.stack[0][this.indices[0]];
    } else if (idx < this.l.length) {
      newVal = this.l.suffix[idx - this.middleSize];
    } else {
      this.result.done = true;
    }

    this.result.value = newVal;
    return this.result;
  }

}

class BackwardsListIterator extends ListIterator {
  constructor(l) {
    super(l, -1);
  }

  prevInTree() {
    for (var i = 0; this.indices[i] === 0; ++i) {//
    }

    --this.indices[i];

    for (; 0 < i; --i) {
      const n = this.stack[i][this.indices[i]].array;
      this.stack[i - 1] = n;
      this.indices[i - 1] = n.length - 1;
    }
  }

  next() {
    let newVal;
    const idx = --this.idx;

    if (this.middleSize <= idx) {
      newVal = this.l.suffix[idx - this.middleSize];
    } else if (this.prefixSize <= idx) {
      this.prevInTree();
      newVal = this.stack[0][this.indices[0]];
    } else if (0 <= idx) {
      newVal = this.l.prefix[this.prefixSize - idx - 1];
    } else {
      this.result.done = true;
    }

    this.result.value = newVal;
    return this.result;
  }

}
/**
 * Returns an iterable that iterates backwards over the given list.
 *
 * @complexity O(1)
 */


export function backwards(l) {
  return {
    [Symbol.iterator]() {
      return new BackwardsListIterator(l);
    }

  };
}
export function emptyPushable() {
  return new List(0, 0, 0, [], undefined, []);
}
/** Appends the value to the list by _mutating_ the list and its content. */

export function push_(l, value) {
  const suffixSize = getSuffixSize(l);

  if (l.length === 0) {
    l.bits = setPrefix(1, l.bits);
    l.prefix = [value];
  } else if (suffixSize < 32) {
    l.bits = incrementSuffix(l.bits);
    l.suffix.push(value);
  } else if (l.root === undefined) {
    l.root = new Node(undefined, l.suffix);
    l.suffix = [value];
    l.bits = setSuffix(1, l.bits);
  } else {
    const newNode = new Node(undefined, l.suffix);
    const index = l.length - 1 - 32 + 1;
    let current = l.root;
    let depth = getDepth(l);
    l.suffix = [value];
    l.bits = setSuffix(1, l.bits);

    if (index - 1 < branchingFactor ** (depth + 1)) {
      for (; depth >= 0; --depth) {
        const path = index >> depth * branchBits & mask;

        if (path < current.array.length) {
          current = current.array[path];
        } else {
          current.array.push(createPath(depth - 1, newNode));
          break;
        }
      }
    } else {
      l.bits = incrementDepth(l.bits);
      l.root = new Node(undefined, [l.root, createPath(depth, newNode)]);
    }
  }

  l.length++;
  return l;
}
/**
 * Creates a list of the given elements.
 *
 * @complexity O(n)
 */

export function list(...elements) {
  const l = emptyPushable();

  for (const element of elements) {
    push_(l, element);
  }

  return l;
}
/**
 * Creates an empty list.
 *
 * @complexity O(1)
 */

export function empty() {
  return new List(0, 0, 0, emptyAffix, undefined, emptyAffix);
}
/**
 * Takes a single arguments and returns a singleton list that contains it.
 *
 * @complexity O(1)
 */

export function of(a) {
  return list(a);
}
/**
 * Takes two arguments and returns a list that contains them.
 *
 * @complexity O(1)
 */

export function pair(second) {
  return first => pair_(first, second);
}
/**
 * Takes two arguments and returns a list that contains them.
 *
 * @complexity O(1)
 */

export function pair_(first, second) {
  return new List(2, 0, 2, emptyAffix, undefined, [first, second]);
}
export function from(sequence) {
  const l = emptyPushable();

  if (sequence.length > 0 && (sequence[0] !== undefined || 0 in sequence)) {
    for (let i = 0; i < sequence.length; ++i) {
      push_(l, sequence[i]);
    }
  } else if (Symbol.iterator in sequence) {
    const iterator = sequence[Symbol.iterator]();
    let cur; // tslint:disable-next-line:no-conditional-assignment

    while (!(cur = iterator.next()).done) {
      push_(l, cur.value);
    }
  }

  return l;
}
/**
 * Returns a list of numbers between an inclusive lower bound and an exclusive upper bound.
 *
 * @complexity O(n)
 */

export function range(end) {
  return start => range_(start, end);
}
/**
 * Returns a list of numbers between an inclusive lower bound and an exclusive upper bound.
 *
 * @complexity O(n)
 */

export function range_(start, end) {
  const list = emptyPushable();

  for (let i = start; i < end; ++i) {
    push_(list, i);
  }

  return list;
}
/**
 * Returns a list of a given length that contains the specified value
 * in all positions.
 *
 * @complexity O(n)
 */

export function repeat(times) {
  return value => repeat_(value, times);
}
/**
 * Returns a list of a given length that contains the specified value
 * in all positions.
 *
 * @complexity O(n)
 */

export function repeat_(value, times) {
  const l = emptyPushable();

  while (--times >= 0) {
    push_(l, value);
  }

  return l;
}
/**
 * Generates a new list by calling a function with the current index
 * `n` times.
 *
 * @complexity O(n)
 */

export function times(times) {
  return func => times_(func, times);
}
/**
 * Generates a new list by calling a function with the current index
 * `n` times.
 *
 * @complexity O(n)
 */

export function times_(func, times) {
  const l = emptyPushable();

  for (let i = 0; i < times; i++) {
    push_(l, func(i));
  }

  return l;
}

function nodeNthDense(node, depth, index) {
  let current = node;

  for (; depth >= 0; --depth) {
    current = current.array[index >> depth * branchBits & mask];
  }

  return current;
}

function handleOffset(depth, offset, index) {
  index += offset;

  for (; depth >= 0; --depth) {
    index = index - (offset & mask << depth * branchBits);

    if ((index >> depth * branchBits & mask) !== 0) {
      break;
    }
  }

  return index;
}

function nodeNth(node, depth, offset, index) {
  let path;
  let current = node;

  while (current.sizes !== undefined) {
    path = index >> depth * branchBits & mask;

    while (current.sizes[path] <= index) {
      path++;
    }

    if (path !== 0) {
      index -= current.sizes[path - 1];
      offset = 0; // Offset is discarded if the left spine isn't traversed
    }

    depth--;
    current = current.array[path];
  }

  return nodeNthDense(current, depth, offset === 0 ? index : handleOffset(depth, offset, index));
}
/**
 * Gets the nth element of the list. If `n` is out of bounds
 * `undefined` is returned.
 *
 * @complexity O(log(n))
 */


export function unsafeNth_(l, index) {
  return O.toUndefined(nth_(l, index));
}
/**
 * Gets the nth element of the list. If `n` is out of bounds
 * `undefined` is returned.
 *
 * @complexity O(log(n))
 */

export function unsafeNth(index) {
  return l => unsafeNth_(l, index);
}
/**
 * Gets the nth element of the list. If `n` is out of bounds
 * `undefined` is returned.
 *
 * @complexity O(log(n))
 */

export function nth_(l, index) {
  if (index < 0 || l.length <= index) {
    return O.none;
  }

  const prefixSize = getPrefixSize(l);
  const suffixSize = getSuffixSize(l);

  if (index < prefixSize) {
    return O.some(l.prefix[prefixSize - index - 1]);
  } else if (index >= l.length - suffixSize) {
    return O.some(l.suffix[index - (l.length - suffixSize)]);
  }

  const {
    offset
  } = l;
  const depth = getDepth(l);
  return O.some(l.root.sizes === undefined ? nodeNthDense(l.root, depth, offset === 0 ? index - prefixSize : handleOffset(depth, offset, index - prefixSize)) : nodeNth(l.root, depth, offset, index - prefixSize));
}
/**
 * Gets the nth element of the list. If `n` is out of bounds
 * `undefined` is returned.
 *
 * @complexity O(log(n))
 */

export function nth(index) {
  return l => nth_(l, index);
}

function setSizes(node, height) {
  let sum = 0;
  const sizeTable = [];

  for (let i = 0; i < node.array.length; ++i) {
    sum += sizeOfSubtree(node.array[i], height - 1);
    sizeTable[i] = sum;
  }

  node.sizes = sizeTable;
  return node;
}
/**
 * Returns the number of elements stored in the node.
 */


function sizeOfSubtree(node, height) {
  if (height !== 0) {
    if (node.sizes !== undefined) {
      return arrayLast(node.sizes);
    } else {
      // the node is leftwise dense so all all but the last child are full
      const lastSize = sizeOfSubtree(arrayLast(node.array), height - 1);
      return (node.array.length - 1 << height * branchBits) + lastSize;
    }
  } else {
    return node.array.length;
  }
} // prepend & append


function affixPush(a, array, length) {
  if (array.length === length) {
    array.push(a);
    return array;
  } else {
    const newArray = [];
    copyIndices(array, 0, newArray, 0, length);
    newArray.push(a);
    return newArray;
  }
}
/**
 * Prepends an element to the front of a list and returns the new list.
 *
 * @complexity O(1)
 */


export function prepend_(l, value) {
  const prefixSize = getPrefixSize(l);

  if (prefixSize < 32) {
    return new List(incrementPrefix(l.bits), l.offset, l.length + 1, affixPush(value, l.prefix, prefixSize), l.root, l.suffix);
  } else {
    const newList = cloneList(l);
    prependNodeToTree(newList, reverseArray(l.prefix));
    const newPrefix = [value];
    newList.prefix = newPrefix;
    newList.length++;
    newList.bits = setPrefix(1, newList.bits);
    return newList;
  }
}
/**
 * Prepends an element to the front of a list and returns the new list.
 *
 * @complexity O(1)
 */

export function prepend(value) {
  return l => prepend_(l, value);
}
/**
 * Traverses down the left edge of the tree and copies k nodes.
 * Returns the last copied node.
 * @param l
 * @param k The number of nodes to copy. Should always be at least 1.
 */

function copyLeft(l, k) {
  let currentNode = cloneNode(l.root); // copy root

  l.root = currentNode; // install copy of root

  for (let i = 1; i < k; ++i) {
    const index = 0; // go left

    if (currentNode.sizes !== undefined) {
      for (let i = 0; i < currentNode.sizes.length; ++i) {
        currentNode.sizes[i] += 32;
      }
    }

    const newNode = cloneNode(currentNode.array[index]); // Install the copied node

    currentNode.array[index] = newNode;
    currentNode = newNode;
  }

  return currentNode;
}
/**
 * Prepends an element to a node
 */


function nodePrepend(value, size, node) {
  const array = arrayPrepend(value, node.array);
  let sizes = undefined;

  if (node.sizes !== undefined) {
    sizes = new Array(node.sizes.length + 1);
    sizes[0] = size;

    for (let i = 0; i < node.sizes.length; ++i) {
      sizes[i + 1] = node.sizes[i] + size;
    }
  }

  return new Node(sizes, array);
}
/**
 * Prepends a node to a tree. Either by shifting the nodes in the root
 * left or by increasing the height
 */


function prependTopTree(l, depth, node) {
  let newOffset;

  if (l.root.array.length < branchingFactor) {
    // There is space in the root, there is never a size table in this
    // case
    newOffset = 32 ** depth - 32;
    l.root = new Node(undefined, arrayPrepend(createPath(depth - 1, node), l.root.array));
  } else {
    // We need to create a new root
    l.bits = incrementDepth(l.bits);
    const sizes = l.root.sizes === undefined ? undefined : [32, arrayLast(l.root.sizes) + 32];
    newOffset = depth === 0 ? 0 : 32 ** (depth + 1) - 32;
    l.root = new Node(sizes, [createPath(depth, node), l.root]);
  }

  return newOffset;
}
/**
 * Takes a list and a node tail. It then prepends the node to the tree
 * of the list.
 * @param l The subject for prepending. `l` will be mutated. Nodes in
 * the tree will _not_ be mutated.
 * @param node The node that should be prepended to the tree.
 */


function prependNodeToTree(l, array) {
  if (l.root === undefined) {
    if (getSuffixSize(l) === 0) {
      // ensure invariant 1
      l.bits = setSuffix(array.length, l.bits);
      l.suffix = array;
    } else {
      l.root = new Node(undefined, array);
    }

    return l;
  } else {
    const node = new Node(undefined, array);
    const depth = getDepth(l);
    let newOffset = 0;

    if (l.root.sizes === undefined) {
      if (l.offset !== 0) {
        newOffset = l.offset - branchingFactor;
        l.root = prependDense(l.root, depth, l.offset, node);
      } else {
        // in this case we can be sure that the is not room in the tree
        // for the new node
        newOffset = prependTopTree(l, depth, node);
      }
    } else {
      // represents how many nodes _with size-tables_ that we should copy.
      let copyableCount = 0; // go down while there is size tables

      let nodesTraversed = 0;
      let currentNode = l.root;

      while (currentNode.sizes !== undefined && nodesTraversed < depth) {
        ++nodesTraversed;

        if (currentNode.array.length < 32) {
          // there is room if offset is > 0 or if the first node does not
          // contain as many nodes as it possibly can
          copyableCount = nodesTraversed;
        }

        currentNode = currentNode.array[0];
      }

      if (l.offset !== 0) {
        const copiedNode = copyLeft(l, nodesTraversed);

        for (let i = 0; i < copiedNode.sizes.length; ++i) {
          copiedNode.sizes[i] += branchingFactor;
        }

        copiedNode.array[0] = prependDense(copiedNode.array[0], depth - nodesTraversed, l.offset, node);
        l.offset = l.offset - branchingFactor;
        return l;
      } else {
        if (copyableCount === 0) {
          l.offset = prependTopTree(l, depth, node);
        } else {
          let parent;
          let prependableNode; // Copy the part of the path with size tables

          if (copyableCount > 1) {
            parent = copyLeft(l, copyableCount - 1);
            prependableNode = parent.array[0];
          } else {
            parent = undefined;
            prependableNode = l.root;
          }

          const path = createPath(depth - copyableCount, node); // add offset

          l.offset = 32 ** (depth - copyableCount + 1) - 32;
          const prepended = nodePrepend(path, 32, prependableNode);

          if (parent === undefined) {
            l.root = prepended;
          } else {
            parent.array[0] = prepended;
          }
        }

        return l;
      }
    }

    l.offset = newOffset;
    return l;
  }
}
/**
 * Prepends a node to a dense tree. The given `offset` is never zero.
 */


function prependDense(node, depth, offset, value) {
  // We're indexing down `offset - 1`. At each step `path` is either 0 or -1.
  const curOffset = offset >> depth * branchBits & mask;
  const path = (offset - 1 >> depth * branchBits & mask) - curOffset;

  if (path < 0) {
    return new Node(undefined, arrayPrepend(createPath(depth - 1, value), node.array));
  } else {
    const array = copyArray(node.array);
    array[0] = prependDense(array[0], depth - 1, offset, value);
    return new Node(undefined, array);
  }
}
/**
 * Appends an element to the end of a list and returns the new list.
 *
 * @complexity O(n)
 */


export function append_(l, value) {
  const suffixSize = getSuffixSize(l);

  if (suffixSize < 32) {
    return new List(incrementSuffix(l.bits), l.offset, l.length + 1, l.prefix, l.root, affixPush(value, l.suffix, suffixSize));
  }

  const newSuffix = [value];
  const newList = cloneList(l);
  appendNodeToTree(newList, l.suffix);
  newList.suffix = newSuffix;
  newList.length++;
  newList.bits = setSuffix(1, newList.bits);
  return newList;
}
/**
 * Appends an element to the end of a list and returns the new list.
 *
 * @complexity O(n)
 */

export function append(value) {
  return l => append_(l, value);
}
/**
 * Gets the length of a list.
 *
 * @complexity `O(1)`
 */

export function size(l) {
  return l.length;
}
/**
 * Returns the first element of the list. If the list is empty the
 * function returns undefined.
 *
 * @complexity O(1)
 */

export function unsafeFirst(l) {
  return O.toUndefined(first(l));
}
/**
 * Returns the first element of the list. If the list is empty the
 * function returns undefined.
 *
 * @complexity O(1)
 */

export function first(l) {
  const prefixSize = getPrefixSize(l);
  return prefixSize !== 0 ? O.some(l.prefix[prefixSize - 1]) : l.length !== 0 ? O.some(l.suffix[0]) : O.none;
}
/**
 * Returns the last element of the list. If the list is empty the
 * function returns `undefined`.
 *
 * @complexity O(1)
 */

export function unsafeLast(l) {
  return O.toUndefined(last(l));
}
/**
 * Returns the last element of the list. If the list is empty the
 * function returns `undefined`.
 *
 * @complexity O(1)
 */

export function last(l) {
  const suffixSize = getSuffixSize(l);
  return suffixSize !== 0 ? O.some(l.suffix[suffixSize - 1]) : l.length !== 0 ? O.some(l.prefix[0]) : O.none;
} // map

function mapArray(f, array) {
  const result = new Array(array.length);

  for (let i = 0; i < array.length; ++i) {
    result[i] = f(array[i]);
  }

  return result;
}

function mapNode(f, node, depth) {
  if (depth !== 0) {
    const {
      array
    } = node;
    const result = new Array(array.length);

    for (let i = 0; i < array.length; ++i) {
      result[i] = mapNode(f, array[i], depth - 1);
    }

    return new Node(node.sizes, result);
  } else {
    return new Node(undefined, mapArray(f, node.array));
  }
}

function mapPrefix(f, prefix, length) {
  const newPrefix = new Array(length);

  for (let i = length - 1; 0 <= i; --i) {
    newPrefix[i] = f(prefix[i]);
  }

  return newPrefix;
}

function mapAffix(f, suffix, length) {
  const newSuffix = new Array(length);

  for (let i = 0; i < length; ++i) {
    newSuffix[i] = f(suffix[i]);
  }

  return newSuffix;
}
/**
 * Applies a function to each element in the given list and returns a
 * new list of the values that the function return.
 *
 * @complexity O(n)
 */


export function map_(l, f) {
  return new List(l.bits, l.offset, l.length, mapPrefix(f, l.prefix, getPrefixSize(l)), l.root === undefined ? undefined : mapNode(f, l.root, getDepth(l)), mapAffix(f, l.suffix, getSuffixSize(l)));
}
/**
 * Applies a function to each element in the given list and returns a
 * new list of the values that the function return.
 *
 * @complexity O(n)
 */

export function map(f) {
  return l => new List(l.bits, l.offset, l.length, mapPrefix(f, l.prefix, getPrefixSize(l)), l.root === undefined ? undefined : mapNode(f, l.root, getDepth(l)), mapAffix(f, l.suffix, getSuffixSize(l)));
}
/**
 * Extracts the specified property from each object in the list.
 */

export function pluck_(l, key) {
  return map_(l, a => a[key]);
}
/**
 * Extracts the specified property from each object in the list.
 */

export function pluck(key) {
  return l => pluck_(l, key);
} // fold

function foldlSuffix(f, acc, array, length) {
  for (let i = 0; i < length; ++i) {
    acc = f(acc, array[i]);
  }

  return acc;
}

function foldlPrefix(f, acc, array, length) {
  for (let i = length - 1; 0 <= i; --i) {
    acc = f(acc, array[i]);
  }

  return acc;
}

function foldlNode(f, acc, node, depth) {
  const {
    array
  } = node;

  if (depth === 0) {
    return foldlSuffix(f, acc, array, array.length);
  }

  for (let i = 0; i < array.length; ++i) {
    acc = foldlNode(f, acc, array[i], depth - 1);
  }

  return acc;
}
/**
 * Folds a function over a list. Left-associative.
 */


export function reduce_(l, initial, f) {
  const suffixSize = getSuffixSize(l);
  const prefixSize = getPrefixSize(l);
  initial = foldlPrefix(f, initial, l.prefix, prefixSize);

  if (l.root !== undefined) {
    initial = foldlNode(f, initial, l.root, getDepth(l));
  }

  return foldlSuffix(f, initial, l.suffix, suffixSize);
}
/**
 * Folds a function over a list. Left-associative.
 */

export function reduce(initial, f) {
  return l => reduce_(l, initial, f);
}
/**
 * Folds a function over a list from left to right while collecting
 * all the intermediate steps in a resulting list.
 */

export function scan_(l, initial, f) {
  return reduce_(l, push_(emptyPushable(), initial), (l2, a) => push_(l2, f(unsafeLast(l2), a)));
}
/**
 * Folds a function over a list from left to right while collecting
 * all the intermediate steps in a resulting list.
 */

export function scan(initial, f) {
  return l => scan_(l, initial, f);
}
/**
 * Invokes a given callback for each element in the list from left to
 * right. Returns `undefined`.
 *
 * This function is very similar to map. It should be used instead of
 * `map` when the mapping function has side-effects. Whereas `map`
 * constructs a new list `forEach` merely returns `undefined`. This
 * makes `forEach` faster when the new list is unneeded.
 *
 * @complexity O(n)
 */

export function forEach_(l, callback) {
  reduce_(l, undefined, (_, element) => callback(element));
}
/**
 * Invokes a given callback for each element in the list from left to
 * right. Returns `undefined`.
 *
 * This function is very similar to map. It should be used instead of
 * `map` when the mapping function has side-effects. Whereas `map`
 * constructs a new list `forEach` merely returns `undefined`. This
 * makes `forEach` faster when the new list is unneeded.
 *
 * @complexity O(n)
 */

export function forEach(callback) {
  return l => forEach_(l, callback);
}
export function filter_(l, predicate) {
  return reduce_(l, emptyPushable(), (acc, a) => predicate(a) ? push_(acc, a) : acc);
}
export function filter(predicate) {
  return l => reduce_(l, emptyPushable(), (acc, a) => predicate(a) ? push_(acc, a) : acc);
}
/**
 * Returns a new list that only contains the elements of the original
 * list for which the f returns `Some`.
 *
 * @complexity O(n)
 */

export function filterMap_(l, f) {
  return reduce_(l, emptyPushable(), (acc, a) => {
    const fa = f(a);

    if (fa._tag === "Some") {
      push_(acc, fa.value);
    }

    return acc;
  });
}
/**
 * Returns a new list that only contains the elements of the original
 * list for which the f returns `Some`.
 *
 * @complexity O(n)
 */

export function filterMap(f) {
  return l => filterMap_(l, f);
}
/**
 * Filter out optional values
 */

export function compact(fa) {
  return filterMap(x => x)(fa);
}
/**
 * Returns a new list that only contains the elements of the original
 * list for which the predicate returns `false`.
 *
 * @complexity O(n)
 */

export function filterNot_(l, predicate) {
  return reduce_(l, emptyPushable(), (acc, a) => predicate(a) ? acc : push_(acc, a));
}
/**
 * Returns a new list that only contains the elements of the original
 * list for which the predicate returns `false`.
 *
 * @complexity O(n)
 */

export function filterNot(predicate) {
  return l => filterNot_(l, predicate);
}
export function partition_(l, predicate) {
  return reduce_(l, Tp.tuple(emptyPushable(), emptyPushable()), (arr, a) => (predicate(a) ? push_(arr.get(0), a) : push_(arr.get(1), a), arr));
}
export function partition(predicate) {
  return l => partition_(l, predicate);
}
/**
 * Splits the list into two lists. One list that contains the lefts
 * and one contains the rights
 *
 * @complexity O(n)
 */

export function partitionMap_(l, f) {
  return reduce_(l, Tp.tuple(emptyPushable(), emptyPushable()), (arr, a) => {
    const fa = f(a);

    if (fa._tag === "Left") {
      push_(arr.get(0), fa.left);
    } else {
      push_(arr.get(1), fa.right);
    }

    return arr;
  });
}
/**
 * Splits the list into two lists. One list that contains the lefts
 * and one contains the rights
 *
 * @complexity O(n)
 */

export function partitionMap(f) {
  return l => partitionMap_(l, f);
}
/**
 * Splits the list into two lists. One list that contains the lefts
 * and one contains the rights
 *
 * @complexity O(n)
 */

export function separate(l) {
  return partitionMap_(l, identity);
}
/**
 * Concats the strings in the list separated by a specified separator.
 */

export function join_(l, separator) {
  return reduce_(l, "", (a, b) => a.length === 0 ? b : a + separator + b);
}
/**
 * Concats the strings in the list separated by a specified separator.
 */

export function join(separator) {
  return l => join_(l, separator);
}

function foldrSuffix(f, initial, array, length) {
  let acc = initial;

  for (let i = length - 1; 0 <= i; --i) {
    acc = f(array[i], acc);
  }

  return acc;
}

function foldrPrefix(f, initial, array, length) {
  let acc = initial;

  for (let i = 0; i < length; ++i) {
    acc = f(array[i], acc);
  }

  return acc;
}

function foldrNode(f, initial, {
  array
}, depth) {
  if (depth === 0) {
    return foldrSuffix(f, initial, array, array.length);
  }

  let acc = initial;

  for (let i = array.length - 1; 0 <= i; --i) {
    acc = foldrNode(f, acc, array[i], depth - 1);
  }

  return acc;
}
/**
 * Folds a function over a list. Right-associative.
 *
 * @complexity O(n)
 */


export function reduceRight_(l, initial, f) {
  const suffixSize = getSuffixSize(l);
  const prefixSize = getPrefixSize(l);
  let acc = foldrSuffix(f, initial, l.suffix, suffixSize);

  if (l.root !== undefined) {
    acc = foldrNode(f, acc, l.root, getDepth(l));
  }

  return foldrPrefix(f, acc, l.prefix, prefixSize);
}
/**
 * Folds a function over a list. Right-associative.
 *
 * @complexity O(n)
 */

export function reduceRight(initial, f) {
  return l => reduceRight_(l, initial, f);
}
/**
 * Applies a list of functions to a list of values.
 */

export function ap_(listF, l) {
  return flatten(map_(listF, f => map_(l, f)));
}
/**
 * Applies a list of functions to a list of values.
 */

export function ap(l) {
  return listF => ap_(listF, l);
}
/**
 * Flattens a list of lists into a list. Note that this function does
 * not flatten recursively. It removes one level of nesting only.
 *
 * @complexity O(n * log(m)), where n is the length of the outer list and m the length of the inner lists.
 */

export function flatten(nested) {
  return reduce_(nested, empty(), concat_);
}
/**
 * Maps a function over a list and concatenates all the resulting
 * lists together.
 */

export function chain_(l, f) {
  return flatten(map_(l, f));
}
/**
 * Maps a function over a list and concatenates all the resulting
 * lists together.
 */

export function chain(f) {
  return l => chain_(l, f);
}

function foldlArrayCb(cb, state, array, from, to) {
  for (var i = from; i < to && cb(array[i], state); ++i) {//
  }

  return i === to;
}

function foldrArrayCb(cb, state, array, from, to) {
  for (var i = from - 1; to <= i && cb(array[i], state); --i) {//
  }

  return i === to - 1;
}

function foldlNodeCb(cb, state, node, depth) {
  const {
    array
  } = node;

  if (depth === 0) {
    return foldlArrayCb(cb, state, array, 0, array.length);
  }

  const to = array.length;

  for (let i = 0; i < to; ++i) {
    if (!foldlNodeCb(cb, state, array[i], depth - 1)) {
      return false;
    }
  }

  return true;
}
/**
 * This function is a lot like a fold. But the reducer function is
 * supposed to mutate its state instead of returning it. Instead of
 * returning a new state it returns a boolean that tells wether or not
 * to continue the fold. `true` indicates that the folding should
 * continue.
 */


function foldlCb(cb, state, l) {
  const prefixSize = getPrefixSize(l);

  if (!foldrArrayCb(cb, state, l.prefix, prefixSize, 0) || l.root !== undefined && !foldlNodeCb(cb, state, l.root, getDepth(l))) {
    return state;
  }

  const suffixSize = getSuffixSize(l);
  foldlArrayCb(cb, state, l.suffix, 0, suffixSize);
  return state;
}

function foldrNodeCb(cb, state, node, depth) {
  const {
    array
  } = node;

  if (depth === 0) {
    return foldrArrayCb(cb, state, array, array.length, 0);
  }

  for (let i = array.length - 1; 0 <= i; --i) {
    if (!foldrNodeCb(cb, state, array[i], depth - 1)) {
      return false;
    }
  }

  return true;
}

function foldrCb(cb, state, l) {
  const suffixSize = getSuffixSize(l);
  const prefixSize = getPrefixSize(l);

  if (!foldrArrayCb(cb, state, l.suffix, suffixSize, 0) || l.root !== undefined && !foldrNodeCb(cb, state, l.root, getDepth(l))) {
    return state;
  }

  const prefix = l.prefix;
  foldlArrayCb(cb, state, l.prefix, prefix.length - prefixSize, prefix.length);
  return state;
}
/**
 * Similar to `foldl`. But, for each element it calls the predicate function
 * _before_ the folding function and stops folding if it returns `false`.
 *
 * @category Folds
 * @example
 * const isOdd = (_acc:, x) => x % 2 === 1;
 *
 * const xs = L.list(1, 3, 5, 60, 777, 800);
 * foldlWhile(isOdd, (n, m) => n + m, 0, xs) //=> 9
 *
 * const ys = L.list(2, 4, 6);
 * foldlWhile(isOdd, (n, m) => n + m, 111, ys) //=> 111
 */


function foldlWhileCb(a, state) {
  if (state.predicate(state.result, a) === false) {
    return false;
  }

  state.result = state.f(state.result, a);
  return true;
}

export function reduceWhile_(l, initial, predicate, f) {
  return foldlCb(foldlWhileCb, {
    predicate,
    f,
    result: initial
  }, l).result;
}
export function reduceWhile(initial, predicate, f) {
  return l => reduceWhile_(l, initial, predicate, f);
}

function everyCb(value, state) {
  return state.result = state.predicate(value);
}
/**
 * Returns `true` if and only if the predicate function returns `true`
 * for all elements in the given list.
 *
 * @complexity O(n)
 */


export function every_(l, predicate) {
  return foldlCb(everyCb, {
    predicate,
    result: true
  }, l).result;
}
/**
 * Returns `true` if and only if the predicate function returns `true`
 * for all elements in the given list.
 *
 * @complexity O(n)
 */

export function every(predicate) {
  return l => every_(l, predicate);
}

function someCb(value, state) {
  return !(state.result = state.predicate(value));
}
/**
 * Returns true if and only if there exists an element in the list for
 * which the predicate returns true.
 *
 * @complexity O(n)
 */


export function some_(l, predicate) {
  return foldlCb(someCb, {
    predicate,
    result: false
  }, l).result;
}
/**
 * Returns true if and only if there exists an element in the list for
 * which the predicate returns true.
 *
 * @complexity O(n)
 */

export function some(predicate) {
  return l => some_(l, predicate);
}
/**
 * Returns `true` if and only if the predicate function returns
 * `false` for every element in the given list.
 *
 * @complexity O(n)
 */

export function none_(l, predicate) {
  return !some_(l, predicate);
}
/**
 * Returns `true` if and only if the predicate function returns
 * `false` for every element in the given list.
 *
 * @complexity O(n)
 */

export function none(predicate) {
  return l => none_(l, predicate);
}

function findCb(value, state) {
  if (state.predicate(value)) {
    state.result = O.some(value);
    return false;
  } else {
    return true;
  }
}
/**
 * Returns the _first_ element for which the predicate returns `true`.
 * If no such element is found the function returns `undefined`.
 *
 * @complexity O(n)
 */


export function unsafeFind_(l, predicate) {
  return O.toUndefined(find_(l, predicate));
}
/**
 * Returns the _first_ element for which the predicate returns `true`.
 * If no such element is found the function returns `undefined`.
 *
 * @complexity O(n)
 */

export function unsafeFind(predicate) {
  return l => unsafeFind_(l, predicate);
}
/**
 * Returns the _first_ element for which the predicate returns `true`.
 * If no such element is found the function returns `undefined`.
 *
 * @complexity O(n)
 */

export function find_(l, predicate) {
  return foldlCb(findCb, {
    predicate,
    result: O.none
  }, l).result;
}
/**
 * Returns the _first_ element for which the predicate returns `true`.
 * If no such element is found the function returns `undefined`.
 *
 * @complexity O(n)
 */

export function find(predicate) {
  return l => find_(l, predicate);
}
/**
 * Returns the _last_ element for which the predicate returns `true`.
 * If no such element is found the function returns `undefined`.
 *
 * @complexity O(n)
 */

export function unsafeFindLast_(l, predicate) {
  return O.toUndefined(findLast_(l, predicate));
}
/**
 * Returns the _last_ element for which the predicate returns `true`.
 * If no such element is found the function returns `undefined`.
 *
 * @complexity O(n)
 */

export function unsafeFindLast(predicate) {
  return l => unsafeFindLast_(l, predicate);
}
/**
 * Returns the _last_ element for which the predicate returns `true`.
 * If no such element is found the function returns `undefined`.
 *
 * @complexity O(n)
 */

export function findLast_(l, predicate) {
  return foldrCb(findCb, {
    predicate,
    result: O.none
  }, l).result;
}
/**
 * Returns the _last_ element for which the predicate returns `true`.
 * If no such element is found the function returns `undefined`.
 *
 * @complexity O(n)
 */

export function findLast(predicate) {
  return l => findLast_(l, predicate);
}

function indexOfCb(value, state) {
  ++state.index;
  return !(state.found = elementEquals(value, state.element));
}
/**
 * Returns the index of the _first_ element in the list that is equal
 * to the given element. If no such element is found `-1` is returned.
 *
 * @complexity O(n)
 */


export function indexOf_(l, element) {
  const state = {
    element,
    found: false,
    index: -1
  };
  foldlCb(indexOfCb, state, l);
  return state.found ? state.index : -1;
}
/**
 * Returns the index of the _first_ element in the list that is equal
 * to the given element. If no such element is found `-1` is returned.
 *
 * @complexity O(n)
 */

export function indexOf(element) {
  return l => indexOf_(l, element);
}
/**
 * Returns the index of the _last_ element in the list that is equal
 * to the given element. If no such element is found `-1` is returned.
 *
 * @complexity O(n)
 */

export function lastIndexOf_(l, element) {
  const state = {
    element,
    found: false,
    index: 0
  };
  foldrCb(indexOfCb, state, l);
  return state.found ? l.length - state.index : -1;
}
/**
 * Returns the index of the _last_ element in the list that is equal
 * to the given element. If no such element is found `-1` is returned.
 *
 * @complexity O(n)
 */

export function lastIndexOf(element) {
  return l => lastIndexOf_(l, element);
}

function findIndexCb(value, state) {
  ++state.index;
  return !(state.found = state.predicate(value));
}
/**
 * Returns the index of the `first` element for which the predicate
 * returns true. If no such element is found the function returns
 * `-1`.
 *
 * @complexity O(n)
 */


export function findIndex_(l, predicate) {
  const {
    found,
    index
  } = foldlCb(findIndexCb, {
    predicate,
    found: false,
    index: -1
  }, l);
  return found ? index : -1;
}
/**
 * Returns the index of the `first` element for which the predicate
 * returns true. If no such element is found the function returns
 * `-1`.
 *
 * @complexity O(n)
 */

export function findIndex(predicate) {
  return l => findIndex_(l, predicate);
}
const containsState = {
  element: undefined,
  result: false
};

function containsCb(value, state) {
  return !(state.result = value === state.element);
}
/**
 * Returns `true` if the list contains the specified element.
 * Otherwise it returns `false`.
 *
 * @complexity O(n)
 */


export function contains_(l, element) {
  containsState.element = element;
  containsState.result = false;
  return foldlCb(containsCb, containsState, l).result;
}
/**
 * Returns `true` if the list contains the specified element.
 * Otherwise it returns `false`.
 *
 * @complexity O(n)
 */

export function contains(element) {
  return l => contains_(l, element);
}

function equalsCb(value2, state) {
  const {
    value
  } = state.iterator.next();
  return state.equals = state.f(value, value2);
}
/**
 * Returns true if the two lists are equivalent.
 *
 * @complexity O(n)
 */


export function equals_(l1, l2) {
  return equalsWith_(l1, l2, elementEquals);
}
/**
 * Returns true if the two lists are equivalent.
 *
 * @complexity O(n)
 */

export function equals(l2) {
  return l1 => equals_(l1, l2);
}
/**
 * Returns true if the two lists are equivalent when comparing each
 * pair of elements with the given comparison function.
 *
 * @complexity O(n)
 */

export function equalsWith_(l1, l2, f) {
  if (l1 === l2) {
    return true;
  } else if (l1.length !== l2.length) {
    return false;
  } else {
    const s = {
      iterator: l2[Symbol.iterator](),
      equals: true,
      f
    };
    return foldlCb(equalsCb, s, l1).equals;
  }
}
/**
 * Returns true if the two lists are equivalent when comparing each
 * pair of elements with the given comparison function.
 *
 * @complexity O(n)
 */

export function equalsWith(l2, f) {
  return l1 => equalsWith_(l1, l2, f);
} // concat

const eMax = 2;

function createConcatPlan(array) {
  const sizes = [];
  let sum = 0;

  for (let i = 0; i < array.length; ++i) {
    sum += array[i].array.length; // FIXME: maybe only access array once

    sizes[i] = array[i].array.length;
  }

  const optimalLength = Math.ceil(sum / branchingFactor);
  let n = array.length;
  let i = 0;

  if (optimalLength + eMax >= n) {
    return undefined; // no rebalancing needed
  }

  while (optimalLength + eMax < n) {
    while (sizes[i] > branchingFactor - eMax / 2) {
      // Skip nodes that are already sufficiently balanced
      ++i;
    } // the node at this index is too short


    let remaining = sizes[i]; // number of elements to re-distribute

    do {
      const size = Math.min(remaining + sizes[i + 1], branchingFactor);
      sizes[i] = size;
      remaining = remaining - (size - sizes[i + 1]);
      ++i;
    } while (remaining > 0); // Shift nodes after


    for (let j = i; j <= n - 1; ++j) {
      sizes[j] = sizes[j + 1];
    }

    --i;
    --n;
  }

  sizes.length = n;
  return sizes;
}
/**
 * Combines the children of three nodes into an array. The last child
 * of `left` and the first child of `right is ignored as they've been
 * concatenated into `center`.
 */


function concatNodeMerge(left, center, right) {
  const array = [];

  if (left !== undefined) {
    for (let i = 0; i < left.array.length - 1; ++i) {
      array.push(left.array[i]);
    }
  }

  for (let i = 0; i < center.array.length; ++i) {
    array.push(center.array[i]);
  }

  if (right !== undefined) {
    for (let i = 1; i < right.array.length; ++i) {
      array.push(right.array[i]);
    }
  }

  return array;
}

function executeConcatPlan(merged, plan, height) {
  const result = [];
  let sourceIdx = 0; // the current node we're copying from

  let offset = 0; // elements in source already used

  for (let toMove of plan) {
    let source = merged[sourceIdx].array;

    if (toMove === source.length && offset === 0) {
      // source matches target exactly, reuse source
      result.push(merged[sourceIdx]);
      ++sourceIdx;
    } else {
      const node = new Node(undefined, []);

      while (toMove > 0) {
        const available = source.length - offset;
        const itemsToCopy = Math.min(toMove, available);
        pushElements(source, node.array, offset, itemsToCopy);

        if (toMove >= available) {
          ++sourceIdx;
          source = merged[sourceIdx].array;
          offset = 0;
        } else {
          offset += itemsToCopy;
        }

        toMove -= itemsToCopy;
      }

      if (height > 1) {
        // Set sizes on children unless they are leaf nodes
        setSizes(node, height - 1);
      }

      result.push(node);
    }
  }

  return result;
}
/**
 * Takes three nodes and returns a new node with the content of the
 * three nodes. Note: The returned node does not have its size table
 * set correctly. The caller must do that.
 */


function rebalance(left, center, right, height, top) {
  const merged = concatNodeMerge(left, center, right);
  const plan = createConcatPlan(merged);
  const balanced = plan !== undefined ? executeConcatPlan(merged, plan, height) : merged;

  if (balanced.length <= branchingFactor) {
    if (top === true) {
      return new Node(undefined, balanced);
    } else {
      // Return a single node with extra height for balancing at next
      // level
      return new Node(undefined, [setSizes(new Node(undefined, balanced), height)]);
    }
  } else {
    return new Node(undefined, [setSizes(new Node(undefined, balanced.slice(0, branchingFactor)), height), setSizes(new Node(undefined, balanced.slice(branchingFactor)), height)]);
  }
}

function concatSubTree(left, lDepth, right, rDepth, isTop) {
  if (lDepth > rDepth) {
    const c = concatSubTree(arrayLast(left.array), lDepth - 1, right, rDepth, false);
    return rebalance(left, c, undefined, lDepth, isTop);
  } else if (lDepth < rDepth) {
    const c = concatSubTree(left, lDepth, arrayFirst(right.array), rDepth - 1, false);
    return rebalance(undefined, c, right, rDepth, isTop);
  } else if (lDepth === 0) {
    return new Node(undefined, [left, right]);
  } else {
    const c = concatSubTree(arrayLast(left.array), lDepth - 1, arrayFirst(right.array), rDepth - 1, false);
    return rebalance(left, c, right, lDepth, isTop);
  }
}

function getHeight(node) {
  if (node.array[0] instanceof Node) {
    return 1 + getHeight(node.array[0]);
  } else {
    return 0;
  }
}
/**
 * Takes a RRB-tree and an affix. It then appends the node to the
 * tree.
 * @param l The subject for appending. `l` will be mutated. Nodes in
 * the tree will _not_ be mutated.
 * @param array The affix that should be appended to the tree.
 */


function appendNodeToTree(l, array) {
  if (l.root === undefined) {
    // The old list has no content in tree, all content is in affixes
    if (getPrefixSize(l) === 0) {
      l.bits = setPrefix(array.length, l.bits);
      l.prefix = reverseArray(array);
    } else {
      l.root = new Node(undefined, array);
    }

    return l;
  }

  const depth = getDepth(l);
  let index = handleOffset(depth, l.offset, l.length - 1 - getPrefixSize(l));
  let nodesToCopy = 0;
  let nodesVisited = 0;
  let shift = depth * 5;
  let currentNode = l.root;

  if (32 ** (depth + 1) < index) {
    shift = 0; // there is no room

    nodesVisited = depth;
  }

  while (shift > 5) {
    let childIndex;

    if (currentNode.sizes === undefined) {
      // does not have size table
      childIndex = index >> shift & mask;
      index &= ~(mask << shift); // wipe just used bits
    } else {
      childIndex = currentNode.array.length - 1;
      index -= currentNode.sizes[childIndex - 1];
    }

    nodesVisited++;

    if (childIndex < mask) {
      // we are not going down the far right path, this implies that
      // there is still room in the current node
      nodesToCopy = nodesVisited;
    }

    currentNode = currentNode.array[childIndex];

    if (currentNode === undefined) {
      // This will only happened in a pvec subtree. The index does not
      // exist so we'll have to create a new path from here on.
      nodesToCopy = nodesVisited;
      shift = 5; // Set shift to break out of the while-loop
    }

    shift -= 5;
  }

  if (shift !== 0) {
    nodesVisited++;

    if (currentNode.array.length < branchingFactor) {
      // there is room in the found node
      nodesToCopy = nodesVisited;
    }
  }

  const node = new Node(undefined, array);

  if (nodesToCopy === 0) {
    // there was no room in the found node
    const newPath = nodesVisited === 0 ? node : createPath(nodesVisited, node);
    const newRoot = new Node(undefined, [l.root, newPath]);
    l.root = newRoot;
    l.bits = incrementDepth(l.bits);
  } else {
    const copiedNode = copyFirstK(l, nodesToCopy, array.length);
    copiedNode.array.push(createPath(depth - nodesToCopy, node));
  }

  return l;
}
/**
 * Traverses down the right edge of the tree and copies k nodes.
 * @param oldList
 * @param newList
 * @param k The number of nodes to copy. Will always be at least 1.
 * @param leafSize The number of elements in the leaf that will be inserted.
 */


function copyFirstK(newList, k, leafSize) {
  let currentNode = cloneNode(newList.root); // copy root

  newList.root = currentNode; // install root

  for (let i = 1; i < k; ++i) {
    const index = currentNode.array.length - 1;

    if (currentNode.sizes !== undefined) {
      currentNode.sizes[index] += leafSize;
    }

    const newNode = cloneNode(currentNode.array[index]); // Install the copied node

    currentNode.array[index] = newNode;
    currentNode = newNode;
  }

  if (currentNode.sizes !== undefined) {
    currentNode.sizes.push(arrayLast(currentNode.sizes) + leafSize);
  }

  return currentNode;
}

const concatBuffer = /*#__PURE__*/new Array(3);

function concatAffixes(left, right) {
  // TODO: Try and find a neat way to reduce the LOC here
  let nr = 0;
  let arrIdx = 0;
  let i = 0;
  let length = getSuffixSize(left);
  concatBuffer[nr] = [];

  for (i = 0; i < length; ++i) {
    concatBuffer[nr][arrIdx++] = left.suffix[i];
  }

  length = getPrefixSize(right);

  for (i = 0; i < length; ++i) {
    if (arrIdx === 32) {
      arrIdx = 0;
      ++nr;
      concatBuffer[nr] = [];
    }

    concatBuffer[nr][arrIdx++] = right.prefix[length - 1 - i];
  }

  length = getSuffixSize(right);

  for (i = 0; i < length; ++i) {
    if (arrIdx === 32) {
      arrIdx = 0;
      ++nr;
      concatBuffer[nr] = [];
    }

    concatBuffer[nr][arrIdx++] = right.suffix[i];
  }

  return nr;
}
/**
 * Concatenates two lists.
 *
 * @complexity O(log(n))
 */


export function concat_(left, right) {
  if (left.length === 0) {
    return right;
  } else if (right.length === 0) {
    return left;
  }

  const newSize = left.length + right.length;
  const rightSuffixSize = getSuffixSize(right);
  let newList = cloneList(left);

  if (right.root === undefined) {
    // right is nothing but a prefix and a suffix
    const nrOfAffixes = concatAffixes(left, right);

    for (let i = 0; i < nrOfAffixes; ++i) {
      newList = appendNodeToTree(newList, concatBuffer[i]);
      newList.length += concatBuffer[i].length; // wipe pointer, otherwise it might end up keeping the array alive

      concatBuffer[i] = undefined;
    }

    newList.length = newSize;
    newList.suffix = concatBuffer[nrOfAffixes];
    newList.bits = setSuffix(concatBuffer[nrOfAffixes].length, newList.bits);
    concatBuffer[nrOfAffixes] = undefined;
    return newList;
  } else {
    const leftSuffixSize = getSuffixSize(left);

    if (leftSuffixSize > 0) {
      newList = appendNodeToTree(newList, left.suffix.slice(0, leftSuffixSize));
      newList.length += leftSuffixSize;
    }

    newList = appendNodeToTree(newList, right.prefix.slice(0, getPrefixSize(right)).reverse());
    const newNode = concatSubTree(newList.root, getDepth(newList), right.root, getDepth(right), true);
    const newDepth = getHeight(newNode);
    setSizes(newNode, newDepth);
    newList.root = newNode;
    newList.offset &= ~(mask << getDepth(left) * branchBits);
    newList.length = newSize;
    newList.bits = setSuffix(rightSuffixSize, setDepth(newDepth, newList.bits));
    newList.suffix = right.suffix;
    return newList;
  }
}
/**
 * Concatenates two lists.
 *
 * @complexity O(log(n))
 */

export function concat(right) {
  return left => concat_(left, right);
}
/**
 * Returns a list that has the entry specified by the index replaced with the given value.
 *
 * If the index is out of bounds the given list is returned unchanged.
 *
 * @complexity O(log(n))
 */

export function update_(l, index, a) {
  if (index < 0 || l.length <= index) {
    return l;
  }

  const prefixSize = getPrefixSize(l);
  const suffixSize = getSuffixSize(l);
  const newList = cloneList(l);

  if (index < prefixSize) {
    const newPrefix = copyArray(newList.prefix);
    newPrefix[newPrefix.length - index - 1] = a;
    newList.prefix = newPrefix;
  } else if (index >= l.length - suffixSize) {
    const newSuffix = copyArray(newList.suffix);
    newSuffix[index - (l.length - suffixSize)] = a;
    newList.suffix = newSuffix;
  } else {
    newList.root = updateNode(l.root, getDepth(l), index - prefixSize, l.offset, a);
  }

  return newList;
}
/**
 * Returns a list that has the entry specified by the index replaced with the given value.
 *
 * If the index is out of bounds the given list is returned unchanged.
 *
 * @complexity O(log(n))
 */

export function update(index, a) {
  return l => update_(l, index, a);
}
/**
 * Returns a list that has the entry specified by the index replaced with
 * the value returned by applying the function to the value.
 *
 * If the index is out of bounds the given list is
 * returned unchanged.
 *
 * @complexity `O(log(n))`
 */

export function adjust_(l, index, f) {
  if (index < 0 || l.length <= index) {
    return l;
  }

  return update_(l, index, f(unsafeNth_(l, index)));
}
/**
 * Returns a list that has the entry specified by the index replaced with
 * the value returned by applying the function to the value.
 *
 * If the index is out of bounds the given list is
 * returned unchanged.
 *
 * @complexity `O(log(n))`
 */

export function adjust(index, f) {
  return l => adjust_(l, index, f);
} // slice and slice based functions

let newAffix; // function getBitsForDepth(n: number, depth: number): number {
//   return n & ~(~0 << ((depth + 1) * branchBits));
// }

function sliceNode(node, index, depth, pathLeft, pathRight, childLeft, childRight) {
  const array = node.array.slice(pathLeft, pathRight + 1);

  if (childLeft !== undefined) {
    array[0] = childLeft;
  }

  if (childRight !== undefined) {
    array[array.length - 1] = childRight;
  }

  let sizes = node.sizes;

  if (sizes !== undefined) {
    sizes = sizes.slice(pathLeft, pathRight + 1);
    let slicedOffLeft = pathLeft !== 0 ? node.sizes[pathLeft - 1] : 0;

    if (childLeft !== undefined) {
      // If the left child has been sliced into a new child we need to know
      // how many elements have been removed from the child.
      if (childLeft.sizes !== undefined) {
        // If the left child has a size table we can simply look at that.
        const oldChild = node.array[pathLeft];
        slicedOffLeft += arrayLast(oldChild.sizes) - arrayLast(childLeft.sizes);
      } else {
        // If the left child does not have a size table we can
        // calculate how many elements have been removed from it by
        // looking at the index. Note that when we slice into a leaf
        // the leaf is moved up as a prefix. Thus slicing, for
        // instance, at index 20 will remove 32 elements from the
        // child. Similarly slicing at index 50 will remove 64
        // elements at slicing at 64 will remove 92 elements.
        slicedOffLeft += (index - slicedOffLeft & ~0b011111) + 32;
      }
    }

    for (let i = 0; i < sizes.length; ++i) {
      sizes[i] -= slicedOffLeft;
    }

    if (childRight !== undefined) {
      const slicedOffRight = sizeOfSubtree(node.array[pathRight], depth - 1) - sizeOfSubtree(childRight, depth - 1);
      sizes[sizes.length - 1] -= slicedOffRight;
    }
  }

  return new Node(sizes, array);
}

let newOffset = 0;

function sliceLeft(tree, depth, index, offset, top) {
  let {
    index: newIndex,
    path,
    updatedOffset
  } = getPath(index, offset, depth, tree.sizes);

  if (depth === 0) {
    newAffix = tree.array.slice(path).reverse(); // This leaf node is moved up as a suffix so there is nothing here
    // after slicing

    return undefined;
  } else {
    const child = sliceLeft(tree.array[path], depth - 1, newIndex, updatedOffset, false);

    if (child === undefined) {
      // There is nothing in the child after slicing so we don't include it
      ++path;

      if (path === tree.array.length) {
        return undefined;
      }
    } // If we've sliced something away and it's not a the root, update offset


    if (tree.sizes === undefined && top === false) {
      newOffset |= 32 - (tree.array.length - path) << depth * branchBits;
    }

    return sliceNode(tree, index, depth, path, tree.array.length - 1, child, undefined);
  }
}
/** Slice elements off of a tree from the right */


function sliceRight(node, depth, index, offset) {
  let {
    index: newIndex,
    path
  } = getPath(index, offset, depth, node.sizes);

  if (depth === 0) {
    newAffix = node.array.slice(0, path + 1); // this leaf node is moved up as a suffix so there is nothing here
    // after slicing

    return undefined;
  } else {
    // slice the child, note that we subtract 1 then the radix lookup
    // algorithm can find the last element that we want to include
    // and sliceRight will do a slice that is inclusive on the index.
    const child = sliceRight(node.array[path], depth - 1, newIndex, path === 0 ? offset : 0);

    if (child === undefined) {
      // there is nothing in the child after slicing so we don't include it
      --path;

      if (path === -1) {
        return undefined;
      }
    } // note that we add 1 to the path since we want the slice to be
    // inclusive on the end index. Only at the leaf level do we want
    // to do an exclusive slice.


    const array = node.array.slice(0, path + 1);

    if (child !== undefined) {
      array[array.length - 1] = child;
    }

    let sizes = node.sizes;

    if (sizes !== undefined) {
      sizes = sizes.slice(0, path + 1);

      if (child !== undefined) {
        const slicedOff = sizeOfSubtree(node.array[path], depth - 1) - sizeOfSubtree(child, depth - 1);
        sizes[sizes.length - 1] -= slicedOff;
      }
    }

    return new Node(sizes, array);
  }
}

function sliceTreeList(from, to, tree, depth, offset, l) {
  const sizes = tree.sizes;
  let {
    index: newFrom,
    path: pathLeft
  } = getPath(from, offset, depth, sizes);
  let {
    index: newTo,
    path: pathRight
  } = getPath(to, offset, depth, sizes);

  if (depth === 0) {
    // we are slicing a piece off a leaf node
    l.prefix = emptyAffix;
    l.suffix = tree.array.slice(pathLeft, pathRight + 1);
    l.root = undefined;
    l.bits = setSuffix(pathRight - pathLeft + 1, 0);
    return l;
  } else if (pathLeft === pathRight) {
    // Both ends are located in the same subtree, this means that we
    // can reduce the height
    l.bits = decrementDepth(l.bits);
    return sliceTreeList(newFrom, newTo, tree.array[pathLeft], depth - 1, pathLeft === 0 ? offset : 0, l);
  } else {
    const childRight = sliceRight(tree.array[pathRight], depth - 1, newTo, 0);
    l.bits = setSuffix(newAffix.length, l.bits);
    l.suffix = newAffix;

    if (childRight === undefined) {
      --pathRight;
    }

    newOffset = 0;
    const childLeft = sliceLeft(tree.array[pathLeft], depth - 1, newFrom, pathLeft === 0 ? offset : 0, pathLeft === pathRight);
    l.offset = newOffset;
    l.bits = setPrefix(newAffix.length, l.bits);
    l.prefix = newAffix;

    if (childLeft === undefined) {
      ++pathLeft;
    }

    if (pathLeft >= pathRight) {
      if (pathLeft > pathRight) {
        // This only happens when `pathLeft` originally was equal to
        // `pathRight + 1` and `childLeft === childRight === undefined`.
        // In this case there is no tree left.
        l.bits = setDepth(0, l.bits);
        l.root = undefined;
      } else {
        // Height can be reduced
        l.bits = decrementDepth(l.bits);
        const newRoot = childRight !== undefined ? childRight : childLeft !== undefined ? childLeft : tree.array[pathLeft];
        l.root = new Node(newRoot.sizes, newRoot.array); // Is this size handling good enough?
      }
    } else {
      l.root = sliceNode(tree, from, depth, pathLeft, pathRight, childLeft, childRight);
    }

    return l;
  }
}
/**
 * Returns a slice of a list. Elements are removed from the beginning and
 * end. Both the indices can be negative in which case they will count
 * from the right end of the list.
 *
 * @complexity `O(log(n))`
 */


export function slice_(l, from, to) {
  let {
    bits,
    length
  } = l;
  to = Math.min(length, to); // Handle negative indices

  if (from < 0) {
    from = length + from;
  }

  if (to < 0) {
    to = length + to;
  } // Should we just return the empty list?


  if (to <= from || to <= 0 || length <= from) {
    return empty();
  } // Return list unchanged if we are slicing nothing off


  if (from <= 0 && length <= to) {
    return l;
  }

  const newLength = to - from;
  let prefixSize = getPrefixSize(l);
  const suffixSize = getSuffixSize(l); // Both indices lie in the prefix

  if (to <= prefixSize) {
    return new List(setPrefix(newLength, 0), 0, newLength, l.prefix.slice(prefixSize - to, prefixSize - from), undefined, emptyAffix);
  }

  const suffixStart = length - suffixSize; // Both indices lie in the suffix

  if (suffixStart <= from) {
    return new List(setSuffix(newLength, 0), 0, newLength, emptyAffix, undefined, l.suffix.slice(from - suffixStart, to - suffixStart));
  }

  const newList = cloneList(l);
  newList.length = newLength; // Both indices lie in the tree

  if (prefixSize <= from && to <= suffixStart) {
    sliceTreeList(from - prefixSize + l.offset, to - prefixSize + l.offset - 1, l.root, getDepth(l), l.offset, newList);
    return newList;
  }

  if (0 < from) {
    // we need to slice something off of the left
    if (from < prefixSize) {
      // shorten the prefix even though it's not strictly needed,
      // so that referenced items can be GC'd
      newList.prefix = l.prefix.slice(0, prefixSize - from);
      bits = setPrefix(prefixSize - from, bits);
    } else {
      // if we're here `to` can't lie in the tree, so we can set the
      // root
      newOffset = 0;
      newList.root = sliceLeft(newList.root, getDepth(l), from - prefixSize, l.offset, true);
      newList.offset = newOffset;

      if (newList.root === undefined) {
        bits = setDepth(0, bits);
      }

      bits = setPrefix(newAffix.length, bits);
      prefixSize = newAffix.length;
      newList.prefix = newAffix;
    }
  }

  if (to < length) {
    // we need to slice something off of the right
    if (length - to < suffixSize) {
      bits = setSuffix(suffixSize - (length - to), bits); // slice the suffix even though it's not strictly needed,
      // to allow the removed items to be GC'd

      newList.suffix = l.suffix.slice(0, suffixSize - (length - to));
    } else {
      newList.root = sliceRight(newList.root, getDepth(l), to - prefixSize - 1, newList.offset);

      if (newList.root === undefined) {
        bits = setDepth(0, bits);
        newList.offset = 0;
      }

      bits = setSuffix(newAffix.length, bits);
      newList.suffix = newAffix;
    }
  }

  newList.bits = bits;
  return newList;
}
/**
 * Returns a slice of a list. Elements are removed from the beginning and
 * end. Both the indices can be negative in which case they will count
 * from the right end of the list.
 *
 * @complexity `O(log(n))`
 */

export function slice(from, to) {
  return l => slice_(l, from, to);
}
/**
 * Takes the first `n` elements from a list and returns them in a new list.
 *
 * @complexity `O(log(n))`
 */

export function take_(l, n) {
  return slice_(l, 0, n);
}
/**
 * Takes the first `n` elements from a list and returns them in a new list.
 *
 * @complexity `O(log(n))`
 */

export function take(n) {
  return l => take_(l, n);
}

function findNotIndexCb(value, state) {
  if (state.predicate(value)) {
    ++state.index;
    return true;
  } else {
    return false;
  }
}
/**
 * Takes the first elements in the list for which the predicate returns
 * `true`.
 *
 * @complexity `O(k + log(n))` where `k` is the number of elements satisfying
 * the predicate.
 */


export function takeWhile_(l, predicate) {
  const {
    index
  } = foldlCb(findNotIndexCb, {
    predicate,
    index: 0
  }, l);
  return slice_(l, 0, index);
}
/**
 * Takes the first elements in the list for which the predicate returns
 * `true`.
 *
 * @complexity `O(k + log(n))` where `k` is the number of elements satisfying
 * the predicate.
 */

export function takeWhile(predicate) {
  return l => takeWhile_(l, predicate);
}
/**
 * Takes the last elements in the list for which the predicate returns
 * `true`.
 *
 * @complexity `O(k + log(n))` where `k` is the number of elements
 * satisfying the predicate.
 */

export function takeLastWhile_(l, predicate) {
  const {
    index
  } = foldrCb(findNotIndexCb, {
    predicate,
    index: 0
  }, l);
  return slice_(l, l.length - index, l.length);
}
/**
 * Takes the last elements in the list for which the predicate returns
 * `true`.
 *
 * @complexity `O(k + log(n))` where `k` is the number of elements
 * satisfying the predicate.
 */

export function takeLastWhile(predicate) {
  return l => takeLastWhile_(l, predicate);
}
/**
 * Removes the first elements in the list for which the predicate returns
 * `true`.
 *
 * @complexity `O(k + log(n))` where `k` is the number of elements
 * satisfying the predicate.
 */

export function dropWhile_(l, predicate) {
  const {
    index
  } = foldlCb(findNotIndexCb, {
    predicate,
    index: 0
  }, l);
  return slice_(l, index, l.length);
}
/**
 * Removes the first elements in the list for which the predicate returns
 * `true`.
 *
 * @complexity `O(k + log(n))` where `k` is the number of elements
 * satisfying the predicate.
 */

export function dropWhile(predicate) {
  return l => dropWhile_(l, predicate);
}
/**
 * Returns a new list without repeated elements.
 *
 * @complexity `O(n)`
 */

export function dropRepeats(l) {
  return dropRepeatsWith_(l, elementEquals);
}
/**
 * Returns a new list without repeated elements by using the given
 * function to determine when elements are equal.
 *
 * @complexity `O(n)`
 */

export function dropRepeatsWith_(l, predicate) {
  return reduce_(l, emptyPushable(), (acc, a) => acc.length !== 0 && predicate(unsafeLast(acc), a) ? acc : push_(acc, a));
}
/**
 * Returns a new list without repeated elements by using the given
 * function to determine when elements are equal.
 *
 * @complexity `O(n)`
 */

export function dropRepeatsWith(predicate) {
  return l => dropRepeatsWith_(l, predicate);
}
/**
 * Takes the last `n` elements from a list and returns them in a new
 * list.
 *
 * @complexity `O(log(n))`
 */

export function takeLast_(l, n) {
  return slice_(l, l.length - n, l.length);
}
/**
 * Takes the last `n` elements from a list and returns them in a new
 * list.
 *
 * @complexity `O(log(n))`
 */

export function takeLast(n) {
  return l => takeLast_(l, n);
}
/**
 * Splits a list at the given index and return the two sides in a pair.
 * The left side will contain all elements before but not including the
 * element at the given index. The right side contains the element at the
 * index and all elements after it.
 *
 * @complexity `O(log(n))`
 */

export function splitAt_(l, index) {
  return [slice_(l, 0, index), slice_(l, index, l.length)];
}
/**
 * Splits a list at the given index and return the two sides in a pair.
 * The left side will contain all elements before but not including the
 * element at the given index. The right side contains the element at the
 * index and all elements after it.
 *
 * @complexity `O(log(n))`
 */

export function splitAt(index) {
  return l => splitAt_(l, index);
}
/**
 * Splits a list at the first element in the list for which the given
 * predicate returns `true`.
 *
 * @complexity `O(n)`
 */

export function splitWhen_(l, predicate) {
  const idx = findIndex_(l, predicate);
  return idx === -1 ? [l, empty()] : splitAt_(l, idx);
}
/**
 * Splits a list at the first element in the list for which the given
 * predicate returns `true`.
 *
 * @complexity `O(n)`
 */

export function splitWhen(predicate) {
  return l => splitWhen_(l, predicate);
}
/**
 * Splits the list into chunks of the given size.
 */

export function splitEvery_(l, size) {
  const {
    buffer,
    l2
  } = reduce_(l, {
    l2: emptyPushable(),
    buffer: emptyPushable()
  }, ({
    buffer,
    l2
  }, elm) => {
    push_(buffer, elm);

    if (buffer.length === size) {
      return {
        l2: push_(l2, buffer),
        buffer: emptyPushable()
      };
    } else {
      return {
        l2,
        buffer
      };
    }
  });
  return buffer.length === 0 ? l2 : push_(l2, buffer);
}
/**
 * Splits the list into chunks of the given size.
 */

export function splitEvery(size) {
  return l => splitEvery_(l, size);
}
/**
 * Takes an index, a number of elements to remove and a list. Returns a
 * new list with the given amount of elements removed from the specified
 * index.
 *
 * @complexity `O(log(n))`
 */

export function remove_(l, from, amount) {
  return concat_(slice_(l, 0, from), slice_(l, from + amount, l.length));
}
/**
 * Takes an index, a number of elements to remove and a list. Returns a
 * new list with the given amount of elements removed from the specified
 * index.
 *
 * @complexity `O(log(n))`
 */

export function remove(from, amount) {
  return l => remove_(l, from, amount);
}
/**
 * Returns a new list without the first `n` elements.
 *
 * @complexity `O(log(n))`
 */

export function drop_(l, n) {
  return slice_(l, n, l.length);
}
/**
 * Returns a new list without the first `n` elements.
 *
 * @complexity `O(log(n))`
 */

export function drop(n) {
  return l => drop_(l, n);
}
/**
 * Returns a new list without the last `n` elements.
 *
 * @complexity `O(log(n))`
 */

export function dropLast_(l, n) {
  return slice_(l, 0, l.length - n);
}
/**
 * Returns a new list without the last `n` elements.
 *
 * @complexity `O(log(n))`
 */

export function dropLast(n) {
  return l => dropLast_(l, n);
}
/**
 * Returns a new list with the last element removed. If the list is
 * empty the empty list is returned.
 *
 * @complexity `O(1)`
 */

export function pop(l) {
  return slice_(l, 0, -1);
}
/**
 * Returns a new list with the first element removed. If the list is
 * empty the empty list is returned.
 *
 * @complexity `O(1)`
 */

export function tail(l) {
  return slice_(l, 1, l.length);
}

function arrayPush(array, a) {
  array.push(a);
  return array;
}
/**
 * Converts a list into an array.
 *
 * @complexity `O(n)`
 */


export function toArray(l) {
  return reduce_(l, [], arrayPush);
}
/**
 * Inserts the given element at the given index in the list.
 *
 * @complexity O(log(n))
 */

export function insert_(l, index, element) {
  return concat_(append_(slice_(l, 0, index), element), slice_(l, index, l.length));
}
/**
 * Inserts the given element at the given index in the list.
 *
 * @complexity O(log(n))
 */

export function insert(index, element) {
  return l => insert_(l, index, element);
}
/**
 * Inserts the given list of elements at the given index in the list.
 *
 * @complexity `O(log(n))`
 */

export function insertAll_(l, index, elements) {
  return concat_(concat_(slice_(l, 0, index), elements), slice_(l, index, l.length));
}
/**
 * Inserts the given list of elements at the given index in the list.
 *
 * @complexity `O(log(n))`
 */

export function insertAll(index, elements) {
  return l => insertAll_(l, index, elements);
}
/**
 * Reverses a list.
 * @complexity O(n)
 */

export function reverse(l) {
  return reduce_(l, empty(), (newL, element) => prepend_(newL, element));
}
/**
 * Returns `true` if the given argument is a list and `false`
 * otherwise.
 *
 * @complexity O(1)
 */

export function isList(l) {
  return typeof l === "object" && Array.isArray(l.suffix);
}
/**
 * Iterate over two lists in parallel and collect the pairs.
 *
 * @complexity `O(log(n))`, where `n` is the length of the smallest
 * list.
 */

export function zip_(as, bs) {
  return zipWith_(as, bs, Tp.tuple);
}
/**
 * Iterate over two lists in parallel and collect the pairs.
 *
 * @complexity `O(log(n))`, where `n` is the length of the smallest
 * list.
 */

export function zip(bs) {
  return as => zip_(as, bs);
}
/**
 * This is like mapping over two lists at the same time. The two lists
 * are iterated over in parallel and each pair of elements is passed
 * to the function. The returned values are assembled into a new list.
 *
 * The shortest list determines the size of the result.
 *
 * @complexity `O(log(n))` where `n` is the length of the smallest
 * list.
 */

export function zipWith_(as, bs, f) {
  const swapped = bs.length < as.length;
  const iterator = (swapped ? as : bs)[Symbol.iterator]();
  return map_(swapped ? bs : as, a => {
    const b = iterator.next().value;
    return swapped ? f(b, a) : f(a, b);
  });
}
/**
 * This is like mapping over two lists at the same time. The two lists
 * are iterated over in parallel and each pair of elements is passed
 * to the function. The returned values are assembled into a new list.
 *
 * The shortest list determines the size of the result.
 *
 * @complexity `O(log(n))` where `n` is the length of the smallest
 * list.
 */

export function zipWith(bs, f) {
  return as => zipWith_(as, bs, f);
}
/**
 * Sort the given list by comparing values using the given function.
 * The function receieves two values and should return `-1` if the
 * first value is stricty larger than the second, `0` is they are
 * equal and `1` if the first values is strictly smaller than the
 * second.
 *
 * @complexity O(n * log(n))
 */

export function sortWith_(l, ord) {
  const arr = [];
  let i = 0;
  forEach_(l, elm => arr.push({
    idx: i++,
    elm
  }));
  arr.sort(({
    elm: a,
    idx: i
  }, {
    elm: b,
    idx: j
  }) => {
    const c = ord.compare(a, b);
    return c !== 0 ? c : i < j ? -1 : 1;
  });
  const newL = emptyPushable();

  for (let i = 0; i < arr.length; ++i) {
    push_(newL, arr[i].elm);
  }

  return newL;
}
/**
 * Sort the given list by comparing values using the given function.
 * The function receieves two values and should return `-1` if the
 * first value is stricty larger than the second, `0` is they are
 * equal and `1` if the first values is strictly smaller than the
 * second.
 *
 * @complexity O(n * log(n))
 */

export function sortWith(ord) {
  return l => sortWith_(l, ord);
}
/**
 * Returns a list of lists where each sublist's elements are all
 * equal.
 */

export function group(l) {
  return groupWith_(l, elementEquals);
}
/**
 * Returns a list of lists where each sublist's elements are pairwise
 * equal based on the given comparison function.
 *
 * Note that only adjacent elements are compared for equality. If all
 * equal elements should be grouped together the list should be sorted
 * before grouping.
 */

export function groupWith_(l, f) {
  const result = emptyPushable();
  let buffer = emptyPushable();
  forEach_(l, a => {
    if (buffer.length !== 0 && !f(unsafeLast(buffer), a)) {
      push_(result, buffer);
      buffer = emptyPushable();
    }

    push_(buffer, a);
  });
  return buffer.length === 0 ? result : push_(result, buffer);
}
/**
 * Returns a list of lists where each sublist's elements are pairwise
 * equal based on the given comparison function.
 *
 * Note that only adjacent elements are compared for equality. If all
 * equal elements should be grouped together the list should be sorted
 * before grouping.
 */

export function groupWith(f) {
  return l => groupWith_(l, f);
}
/**
 * Inserts a separator between each element in a list.
 */

export function intersperse_(l, separator) {
  return pop(reduce_(l, emptyPushable(), (l2, a) => push_(push_(l2, a), separator)));
}
/**
 * Inserts a separator between each element in a list.
 */

export function intersperse(separator) {
  return l => intersperse_(l, separator);
}
/**
 * Returns `true` if the given list is empty and `false` otherwise.
 */

export function isEmpty(l) {
  return l.length === 0;
}
/**
 * Builder
 */

export function builder() {
  return new ListBuilder(emptyPushable());
}
export class ListBuilder {
  constructor(chunk) {
    this.chunk = chunk;
  }

  append(a) {
    push_(this.chunk, a);
    return this;
  }

  build() {
    return this.chunk;
  }

}
//# sourceMappingURL=core.mjs.map