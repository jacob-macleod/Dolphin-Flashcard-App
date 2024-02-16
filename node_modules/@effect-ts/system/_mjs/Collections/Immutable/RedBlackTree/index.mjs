// ets_tracing: off
import "../../../Operator/index.mjs";
import { tuple } from "../../../Function/index.mjs";
import * as I from "../../../Iterable/index.mjs";
import * as O from "../../../Option/index.mjs";
import { Stack } from "../../../Stack/index.mjs";
import * as St from "../../../Structural/index.mjs";
import * as A from "../Array/index.mjs";
import * as Tp from "../Tuple/index.mjs";

class Node {
  constructor(color, key, value, left, right, count) {
    this.color = color;
    this.key = key;
    this.value = value;
    this.left = left;
    this.right = right;
    this.count = count;
  }

}

function cloneNode(node) {
  return new Node(node.color, node.key, node.value, node.left, node.right, node.count);
}

function swapNode(n, v) {
  n.key = v.key;
  n.value = v.value;
  n.left = v.left;
  n.right = v.right;
  n.color = v.color;
  n.count = v.count;
}

function repaintNode(node, color) {
  return new Node(color, node.key, node.value, node.left, node.right, node.count);
}

function recountNode(node) {
  var _a, _b, _c, _d;

  node.count = 1 + ((_b = (_a = node.left) === null || _a === void 0 ? void 0 : _a.count) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = node.right) === null || _c === void 0 ? void 0 : _c.count) !== null && _d !== void 0 ? _d : 0);
}
/**
 * A Red-Black Tree
 */


export class RedBlackTree {
  constructor(ord, root) {
    this.ord = ord;
    this.root = root;
  }

  [Symbol.iterator]() {
    const stack = [];
    let n = this.root;

    while (n) {
      stack.push(n);
      n = n.left;
    }

    return new RedBlackTreeIterator(this, stack, "Forward");
  }

  get [St.hashSym]() {
    return St.hashIterator(this[Symbol.iterator]());
  }

  [St.equalsSym](that) {
    return that instanceof RedBlackTree && size(this) === size(that) && I.corresponds(this, that, St.equals);
  }

}
/**
 * Creates a new Red-Black Tree
 */

export function make(ord) {
  return new RedBlackTree(ord, undefined);
}
/**
 * Returns the length of the tree
 */

export function size(self) {
  var _a, _b;

  return (_b = (_a = self.root) === null || _a === void 0 ? void 0 : _a.count) !== null && _b !== void 0 ? _b : 0;
}
/**
 * Insert a new item into the tree
 */

export function insert_(self, key, value) {
  const cmp = self.ord.compare; //Find point to insert new node at

  let n = self.root;
  const n_stack = [];
  const d_stack = [];

  while (n) {
    const d = cmp(key, n.key);
    n_stack.push(n);
    d_stack.push(d);

    if (d <= 0) {
      n = n.left;
    } else {
      n = n.right;
    }
  } //Rebuild path to leaf node


  n_stack.push(new Node("Red", key, value, undefined, undefined, 1));

  for (let s = n_stack.length - 2; s >= 0; --s) {
    const n2 = n_stack[s];

    if (d_stack[s] <= 0) {
      n_stack[s] = new Node(n2.color, n2.key, n2.value, n_stack[s + 1], n2.right, n2.count + 1);
    } else {
      n_stack[s] = new Node(n2.color, n2.key, n2.value, n2.left, n_stack[s + 1], n2.count + 1);
    }
  } //Rebalance tree using rotations


  for (let s = n_stack.length - 1; s > 1; --s) {
    const p = n_stack[s - 1];
    const n3 = n_stack[s];

    if (p.color === "Black" || n3.color === "Black") {
      break;
    }

    const pp = n_stack[s - 2];

    if (pp.left === p) {
      if (p.left === n3) {
        const y = pp.right;

        if (y && y.color === "Red") {
          p.color = "Black";
          pp.right = repaintNode(y, "Black");
          pp.color = "Red";
          s -= 1;
        } else {
          pp.color = "Red";
          pp.left = p.right;
          p.color = "Black";
          p.right = pp;
          n_stack[s - 2] = p;
          n_stack[s - 1] = n3;
          recountNode(pp);
          recountNode(p);

          if (s >= 3) {
            const ppp = n_stack[s - 3];

            if (ppp.left === pp) {
              ppp.left = p;
            } else {
              ppp.right = p;
            }
          }

          break;
        }
      } else {
        const y = pp.right;

        if (y && y.color === "Red") {
          p.color = "Black";
          pp.right = repaintNode(y, "Black");
          pp.color = "Red";
          s -= 1;
        } else {
          p.right = n3.left;
          pp.color = "Red";
          pp.left = n3.right;
          n3.color = "Black";
          n3.left = p;
          n3.right = pp;
          n_stack[s - 2] = n3;
          n_stack[s - 1] = p;
          recountNode(pp);
          recountNode(p);
          recountNode(n3);

          if (s >= 3) {
            const ppp = n_stack[s - 3];

            if (ppp.left === pp) {
              ppp.left = n3;
            } else {
              ppp.right = n3;
            }
          }

          break;
        }
      }
    } else {
      if (p.right === n3) {
        const y = pp.left;

        if (y && y.color === "Red") {
          p.color = "Black";
          pp.left = repaintNode(y, "Black");
          pp.color = "Red";
          s -= 1;
        } else {
          pp.color = "Red";
          pp.right = p.left;
          p.color = "Black";
          p.left = pp;
          n_stack[s - 2] = p;
          n_stack[s - 1] = n3;
          recountNode(pp);
          recountNode(p);

          if (s >= 3) {
            const ppp = n_stack[s - 3];

            if (ppp.right === pp) {
              ppp.right = p;
            } else {
              ppp.left = p;
            }
          }

          break;
        }
      } else {
        const y = pp.left;

        if (y && y.color === "Red") {
          p.color = "Black";
          pp.left = repaintNode(y, "Black");
          pp.color = "Red";
          s -= 1;
        } else {
          p.left = n3.right;
          pp.color = "Red";
          pp.right = n3.left;
          n3.color = "Black";
          n3.right = p;
          n3.left = pp;
          n_stack[s - 2] = n3;
          n_stack[s - 1] = p;
          recountNode(pp);
          recountNode(p);
          recountNode(n3);

          if (s >= 3) {
            const ppp = n_stack[s - 3];

            if (ppp.right === pp) {
              ppp.right = n3;
            } else {
              ppp.left = n3;
            }
          }

          break;
        }
      }
    }
  } //Return new tree


  n_stack[0].color = "Black";
  return new RedBlackTree(self.ord, n_stack[0]);
}
/**
 * Insert a new item into the tree
 */

export function insert(key, value) {
  return self => insert_(self, key, value);
}
/**
 * Visit all nodes inorder until a Some is returned
 */

export function visitFull(node, visit) {
  let current = node;
  let stack = undefined;
  let done = false;

  while (!done) {
    if (current) {
      stack = new Stack(current, stack);
      current = current.left;
    } else if (stack) {
      const v = visit(stack.value.key, stack.value.value);

      if (O.isSome(v)) {
        return v;
      }

      current = stack.value.right;
      stack = stack.previous;
    } else {
      done = true;
    }
  }

  return O.none;
}
/**
 * Visit each node of the tree in order
 */

export function forEach_(self, visit) {
  if (self.root) {
    visitFull(self.root, (key, value) => {
      visit(key, value);
      return O.none;
    });
  }
}
/**
 * Visit each node of the tree in order
 */

export function forEach(visit) {
  return self => forEach_(self, visit);
}
/**
 * Visit nodes greater than or equal to key
 */

export function visitGe(node, min, ord, visit) {
  let current = node;
  let stack = undefined;
  let done = false;

  while (!done) {
    if (current) {
      stack = new Stack(current, stack);

      if (ord.compare(min, current.key) <= 0) {
        current = current.left;
      } else {
        current = undefined;
      }
    } else if (stack) {
      if (ord.compare(min, stack.value.key) <= 0) {
        const v = visit(stack.value.key, stack.value.value);

        if (O.isSome(v)) {
          return v;
        }
      }

      current = stack.value.right;
      stack = stack.previous;
    } else {
      done = true;
    }
  }

  return O.none;
}
/**
 * Visit each node of the tree in order with key greater then or equal to max
 */

export function forEachGe_(self, min, visit) {
  if (self.root) {
    visitGe(self.root, min, self.ord, (key, value) => {
      visit(key, value);
      return O.none;
    });
  }
}
/**
 * Visit each node of the tree in order with key greater then or equal to max
 */

export function forEachGe(min, visit) {
  return self => forEachGe_(self, min, visit);
}
/**
 * Visit nodes lower than key
 */

export function visitLt(node, max, ord, visit) {
  let current = node;
  let stack = undefined;
  let done = false;

  while (!done) {
    if (current) {
      stack = new Stack(current, stack);
      current = current.left;
    } else if (stack && ord.compare(max, stack.value.key) > 0) {
      const v = visit(stack.value.key, stack.value.value);

      if (O.isSome(v)) {
        return v;
      }

      current = stack.value.right;
      stack = stack.previous;
    } else {
      done = true;
    }
  }

  return O.none;
}
/**
 * Visit each node of the tree in order with key lower then max
 */

export function forEachLt_(self, max, visit) {
  if (self.root) {
    visitLt(self.root, max, self.ord, (key, value) => {
      visit(key, value);
      return O.none;
    });
  }
}
/**
 * Visit each node of the tree in order with key lower then max
 */

export function forEachLt(max, visit) {
  return self => forEachLt_(self, max, visit);
}
/**
 * Visit nodes with key lower than max and greater then or equal to min
 */

export function visitBetween(node, min, max, ord, visit) {
  let current = node;
  let stack = undefined;
  let done = false;

  while (!done) {
    if (current) {
      stack = new Stack(current, stack);

      if (ord.compare(min, current.key) <= 0) {
        current = current.left;
      } else {
        current = undefined;
      }
    } else if (stack && ord.compare(max, stack.value.key) > 0) {
      if (ord.compare(min, stack.value.key) <= 0) {
        const v = visit(stack.value.key, stack.value.value);

        if (O.isSome(v)) {
          return v;
        }
      }

      current = stack.value.right;
      stack = stack.previous;
    } else {
      done = true;
    }
  }

  return O.none;
}
/**
 * Visit each node of the tree in order with key lower than max and greater then or equal to min
 */

export function forEachBetween_(self, min, max, visit) {
  if (self.root) {
    visitBetween(self.root, min, max, self.ord, (key, value) => {
      visit(key, value);
      return O.none;
    });
  }
}
/**
 * Visit each node of the tree in order with key lower than max and greater then or equal to min
 */

export function forEachBetween(min, max, visit) {
  return self => forEachBetween_(self, min, max, visit);
}
/**
 * Fix up a double black node in a tree
 */

function fixDoubleBlack(stack) {
  let n, p, s, z;

  for (let i = stack.length - 1; i >= 0; --i) {
    n = stack[i];

    if (i === 0) {
      n.color = "Black";
      return;
    } //console.log("visit node:", n.key, i, stack[i].key, stack[i-1].key)


    p = stack[i - 1];

    if (p.left === n) {
      //console.log("left child")
      s = p.right;

      if (s && s.right && s.right.color === "Red") {
        //console.log("case 1: right sibling child red")
        s = p.right = cloneNode(s);
        z = s.right = cloneNode(s.right);
        p.right = s.left;
        s.left = p;
        s.right = z;
        s.color = p.color;
        n.color = "Black";
        p.color = "Black";
        z.color = "Black";
        recountNode(p);
        recountNode(s);

        if (i > 1) {
          const pp = stack[i - 2];

          if (pp.left === p) {
            pp.left = s;
          } else {
            pp.right = s;
          }
        }

        stack[i - 1] = s;
        return;
      } else if (s && s.left && s.left.color === "Red") {
        //console.log("case 1: left sibling child red")
        s = p.right = cloneNode(s);
        z = s.left = cloneNode(s.left);
        p.right = z.left;
        s.left = z.right;
        z.left = p;
        z.right = s;
        z.color = p.color;
        p.color = "Black";
        s.color = "Black";
        n.color = "Black";
        recountNode(p);
        recountNode(s);
        recountNode(z);

        if (i > 1) {
          const pp = stack[i - 2];

          if (pp.left === p) {
            pp.left = z;
          } else {
            pp.right = z;
          }
        }

        stack[i - 1] = z;
        return;
      }

      if (s && s.color === "Black") {
        if (p.color === "Red") {
          //console.log("case 2: black sibling, red parent", p.right.value)
          p.color = "Black";
          p.right = repaintNode(s, "Red");
          return;
        } else {
          //console.log("case 2: black sibling, black parent", p.right.value)
          p.right = repaintNode(s, "Red");
          continue;
        }
      } else if (s) {
        //console.log("case 3: red sibling")
        s = cloneNode(s);
        p.right = s.left;
        s.left = p;
        s.color = p.color;
        p.color = "Red";
        recountNode(p);
        recountNode(s);

        if (i > 1) {
          const pp = stack[i - 2];

          if (pp.left === p) {
            pp.left = s;
          } else {
            pp.right = s;
          }
        }

        stack[i - 1] = s;
        stack[i] = p;

        if (i + 1 < stack.length) {
          stack[i + 1] = n;
        } else {
          stack.push(n);
        }

        i = i + 2;
      }
    } else {
      //console.log("right child")
      s = p.left;

      if (s && s.left && s.left.color === "Red") {
        //console.log("case 1: left sibling child red", p.value, p._color)
        s = p.left = cloneNode(s);
        z = s.left = cloneNode(s.left);
        p.left = s.right;
        s.right = p;
        s.left = z;
        s.color = p.color;
        n.color = "Black";
        p.color = "Black";
        z.color = "Black";
        recountNode(p);
        recountNode(s);

        if (i > 1) {
          const pp = stack[i - 2];

          if (pp.right === p) {
            pp.right = s;
          } else {
            pp.left = s;
          }
        }

        stack[i - 1] = s;
        return;
      } else if (s && s.right && s.right.color === "Red") {
        //console.log("case 1: right sibling child red")
        s = p.left = cloneNode(s);
        z = s.right = cloneNode(s.right);
        p.left = z.right;
        s.right = z.left;
        z.right = p;
        z.left = s;
        z.color = p.color;
        p.color = "Black";
        s.color = "Black";
        n.color = "Black";
        recountNode(p);
        recountNode(s);
        recountNode(z);

        if (i > 1) {
          const pp = stack[i - 2];

          if (pp.right === p) {
            pp.right = z;
          } else {
            pp.left = z;
          }
        }

        stack[i - 1] = z;
        return;
      }

      if (s && s.color === "Black") {
        if (p.color === "Red") {
          //console.log("case 2: black sibling, red parent")
          p.color = "Black";
          p.left = repaintNode(s, "Red");
          return;
        } else {
          //console.log("case 2: black sibling, black parent")
          p.left = repaintNode(s, "Red");
          continue;
        }
      } else if (s) {
        //console.log("case 3: red sibling")
        s = cloneNode(s);
        p.left = s.right;
        s.right = p;
        s.color = p.color;
        p.color = "Red";
        recountNode(p);
        recountNode(s);

        if (i > 1) {
          const pp = stack[i - 2];

          if (pp.right === p) {
            pp.right = s;
          } else {
            pp.left = s;
          }
        }

        stack[i - 1] = s;
        stack[i] = p;

        if (i + 1 < stack.length) {
          stack[i + 1] = n;
        } else {
          stack.push(n);
        }

        i = i + 2;
      }
    }
  }
}
/**
 * Stateful iterator
 */


export class RedBlackTreeIterator {
  constructor(self, stack, direction) {
    this.self = self;
    this.stack = stack;
    this.direction = direction;
    this.count = 0;
  }
  /**
   * Clones the iterator
   */


  clone() {
    return new RedBlackTreeIterator(this.self, this.stack.slice(), this.direction);
  }
  /**
   * Reverse the traversal direction
   */


  reversed() {
    return new RedBlackTreeIterator(this.self, this.stack.slice(), this.direction === "Forward" ? "Backward" : "Forward");
  }
  /**
   * Iterator next
   */


  next() {
    const entry = this.entry;
    this.count++;

    if (this.direction === "Forward") {
      this.moveNext();
    } else {
      this.movePrev();
    }

    return O.fold_(entry, () => ({
      done: true,
      value: this.count
    }), kv => ({
      done: false,
      value: kv
    }));
  }
  /**
   * Returns the key
   */


  get key() {
    if (this.stack.length > 0) {
      return O.some(this.stack[this.stack.length - 1].key);
    }

    return O.none;
  }
  /**
   * Returns the value
   */


  get value() {
    if (this.stack.length > 0) {
      return O.some(this.stack[this.stack.length - 1].value);
    }

    return O.none;
  }
  /**
   * Returns the key
   */


  get entry() {
    if (this.stack.length > 0) {
      return O.some(tuple(this.stack[this.stack.length - 1].key, this.stack[this.stack.length - 1].value));
    }

    return O.none;
  }
  /**
   * Returns the position of this iterator in the sorted list
   */


  get index() {
    let idx = 0;
    const stack = this.stack;

    if (stack.length === 0) {
      const r = this.self.root;

      if (r) {
        return r.count;
      }

      return 0;
    } else if (stack[stack.length - 1].left) {
      idx = stack[stack.length - 1].left.count;
    }

    for (let s = stack.length - 2; s >= 0; --s) {
      if (stack[s + 1] === stack[s].right) {
        ++idx;

        if (stack[s].left) {
          idx += stack[s].left.count;
        }
      }
    }

    return idx;
  }
  /**
   * Advances iterator to next element in list
   */


  moveNext() {
    const stack = this.stack;

    if (stack.length === 0) {
      return;
    }

    let n = stack[stack.length - 1];

    if (n.right) {
      n = n.right;

      while (n) {
        stack.push(n);
        n = n.left;
      }
    } else {
      stack.pop();

      while (stack.length > 0 && stack[stack.length - 1].right === n) {
        n = stack[stack.length - 1];
        stack.pop();
      }
    }
  }
  /**
   * Checks if there is a next element
   */


  get hasNext() {
    const stack = this.stack;

    if (stack.length === 0) {
      return false;
    }

    if (stack[stack.length - 1].right) {
      return true;
    }

    for (let s = stack.length - 1; s > 0; --s) {
      if (stack[s - 1].left === stack[s]) {
        return true;
      }
    }

    return false;
  }
  /**
   * Advances iterator to previous element in list
   */


  movePrev() {
    const stack = this.stack;

    if (stack.length === 0) {
      return;
    }

    let n = stack[stack.length - 1];

    if (n && n.left) {
      n = n.left;

      while (n) {
        stack.push(n);
        n = n.right;
      }
    } else {
      stack.pop();

      while (stack.length > 0 && stack[stack.length - 1].left === n) {
        n = stack[stack.length - 1];
        stack.pop();
      }
    }
  }
  /**
   * Checks if there is a previous element
   */


  get hasPrev() {
    const stack = this.stack;

    if (stack.length === 0) {
      return false;
    }

    if (stack[stack.length - 1].left) {
      return true;
    }

    for (let s = stack.length - 1; s > 0; --s) {
      if (stack[s - 1].right === stack[s]) {
        return true;
      }
    }

    return false;
  }

}
/**
 * Returns the first entry in the tree
 */

export function getFirst(tree) {
  let n = tree.root;
  let c = tree.root;

  while (n) {
    c = n;
    n = n.left;
  }

  return c ? O.some(Tp.tuple(c.key, c.value)) : O.none;
}
/**
 * Returns the last entry in the tree
 */

export function getLast(tree) {
  let n = tree.root;
  let c = tree.root;

  while (n) {
    c = n;
    n = n.right;
  }

  return c ? O.some(Tp.tuple(c.key, c.value)) : O.none;
}
/**
 * Returns an iterator that points to the element i of the tree
 */

export function at_(tree, idx, direction = "Forward") {
  return {
    ord: tree.ord,
    [Symbol.iterator]: () => {
      if (idx < 0) {
        return new RedBlackTreeIterator(tree, [], direction);
      }

      let n = tree.root;
      const stack = [];

      while (n) {
        stack.push(n);

        if (n.left) {
          if (idx < n.left.count) {
            n = n.left;
            continue;
          }

          idx -= n.left.count;
        }

        if (!idx) {
          return new RedBlackTreeIterator(tree, stack, direction);
        }

        idx -= 1;

        if (n.right) {
          if (idx >= n.right.count) {
            break;
          }

          n = n.right;
        } else {
          break;
        }
      }

      return new RedBlackTreeIterator(tree, [], direction);
    }
  };
}
/**
 * Returns an iterator that points to the element i of the tree
 */

export function at(idx) {
  return tree => at_(tree, idx);
}
/**
 * Returns the element i of the tree
 */

export function getAt_(tree, idx) {
  if (idx < 0) {
    return O.none;
  }

  let n = tree.root;
  let node = undefined;

  while (n) {
    node = n;

    if (n.left) {
      if (idx < n.left.count) {
        n = n.left;
        continue;
      }

      idx -= n.left.count;
    }

    if (!idx) {
      return O.some(Tp.tuple(node.key, node.value));
    }

    idx -= 1;

    if (n.right) {
      if (idx >= n.right.count) {
        break;
      }

      n = n.right;
    } else {
      break;
    }
  }

  return O.none;
}
/**
 * Returns the element i of the tree
 */

export function getAt(idx) {
  return tree => getAt_(tree, idx);
}
/**
 * Returns an iterator that traverse entries with keys less then or equal to key
 */

export function le_(tree, key, direction = "Forward") {
  return {
    ord: tree.ord,
    [Symbol.iterator]: () => {
      const cmp = tree.ord.compare;
      let n = tree.root;
      const stack = [];
      let last_ptr = 0;

      while (n) {
        const d = cmp(key, n.key);
        stack.push(n);

        if (d <= 0) {
          last_ptr = stack.length;
        }

        if (d <= 0) {
          n = n.left;
        } else {
          n = n.right;
        }
      }

      stack.length = last_ptr;
      return new RedBlackTreeIterator(tree, stack, direction);
    }
  };
}
/**
 * Returns an iterator that traverse entries with keys less then or equal to key
 */

export function le(key, direction = "Forward") {
  return tree => le_(tree, key, direction);
}
/**
 * Returns an iterator that traverse entries with keys less then key
 */

export function lt_(tree, key, direction = "Forward") {
  return {
    ord: tree.ord,
    [Symbol.iterator]: () => {
      const cmp = tree.ord.compare;
      let n = tree.root;
      const stack = [];
      let last_ptr = 0;

      while (n) {
        const d = cmp(key, n.key);
        stack.push(n);

        if (d > 0) {
          last_ptr = stack.length;
        }

        if (d <= 0) {
          n = n.left;
        } else {
          n = n.right;
        }
      }

      stack.length = last_ptr;
      return new RedBlackTreeIterator(tree, stack, direction);
    }
  };
}
/**
 * Returns an iterator that traverse entries with keys less then key
 */

export function lt(key, direction = "Forward") {
  return tree => lt_(tree, key, direction);
}
/**
 * Returns an iterator that traverse entries with keys greater then or equal to key
 */

export function ge_(tree, key, direction = "Forward") {
  return {
    ord: tree.ord,
    [Symbol.iterator]: () => {
      const cmp = tree.ord.compare;
      let n = tree.root;
      const stack = [];
      let last_ptr = 0;

      while (n) {
        const d = cmp(key, n.key);
        stack.push(n);

        if (d <= 0) {
          last_ptr = stack.length;
        }

        if (d <= 0) {
          n = n.left;
        } else {
          n = n.right;
        }
      }

      stack.length = last_ptr;
      return new RedBlackTreeIterator(tree, stack, direction);
    }
  };
}
/**
 * Returns an iterator that traverse entries with keys greater then or equal to key
 */

export function ge(key, direction = "Forward") {
  return tree => ge_(tree, key, direction);
}
/**
 * Returns an iterator that traverse entries with keys greater then or equal to key
 */

export function gt_(tree, key, direction = "Forward") {
  return {
    ord: tree.ord,
    [Symbol.iterator]: () => {
      const cmp = tree.ord.compare;
      let n = tree.root;
      const stack = [];
      let last_ptr = 0;

      while (n) {
        const d = cmp(key, n.key);
        stack.push(n);

        if (d < 0) {
          last_ptr = stack.length;
        }

        if (d < 0) {
          n = n.left;
        } else {
          n = n.right;
        }
      }

      stack.length = last_ptr;
      return new RedBlackTreeIterator(tree, stack, direction);
    }
  };
}
/**
 * Returns an iterator that traverse entries with keys greater then or equal to key
 */

export function gt(key, direction = "Forward") {
  return tree => gt_(tree, key, direction);
}
/**
 * Traverse the tree backwards
 */

export function backwards(self) {
  return {
    ord: self.ord,
    [Symbol.iterator]: () => {
      const stack = [];
      let n = self.root;

      while (n) {
        stack.push(n);
        n = n.right;
      }

      return new RedBlackTreeIterator(self, stack, "Backward");
    }
  };
}
/**
 * Get the values of the tree
 */

export function values_(self, direction = "Forward") {
  const begin = self[Symbol.iterator]();
  let count = 0;
  return {
    [Symbol.iterator]: () => values_(self, direction),
    next: () => {
      count++;
      const entry = begin.value;

      if (direction === "Forward") {
        begin.moveNext();
      } else {
        begin.movePrev();
      }

      return O.fold_(entry, () => ({
        value: count,
        done: true
      }), entry => ({
        value: entry,
        done: false
      }));
    }
  };
}
/**
 * Get the values of the tree
 */

export function values(direction = "Forward") {
  return self => values_(self, direction);
}
/**
 * Get the keys of the tree
 */

export function keys_(self, direction = "Forward") {
  const begin = self[Symbol.iterator]();
  let count = 0;
  return {
    [Symbol.iterator]: () => keys_(self, direction),
    next: () => {
      count++;
      const entry = begin.key;

      if (direction === "Forward") {
        begin.moveNext();
      } else {
        begin.movePrev();
      }

      return O.fold_(entry, () => ({
        value: count,
        done: true
      }), entry => ({
        value: entry,
        done: false
      }));
    }
  };
}
/**
 * Get the keys of the tree
 */

export function keys(direction = "Forward") {
  return self => keys_(self, direction);
}
export function from(...args) {
  let tree = args.length === 2 ? make(args[1]) : make(args[0].ord);

  for (const [k, v] of args[0]) {
    tree = insert_(tree, k, v);
  }

  return tree;
}
/**
 * Finds the item with key if it exists
 */

export function find_(tree, key) {
  const cmp = tree.ord.compare;
  let n = tree.root;
  const res = [];

  while (n) {
    const d = cmp(key, n.key);

    if (d === 0 && St.equals(key, n.key)) {
      res.push(n.value);
    }

    if (d <= 0) {
      n = n.left;
    } else {
      n = n.right;
    }
  }

  return A.reverse(res);
}
/**
 * Finds the item with key if it exists
 */

export function find(key) {
  return tree => find_(tree, key);
}
/**
 * Finds the item with key if it exists
 */

export function findFirst_(tree, key) {
  const cmp = tree.ord.compare;
  let n = tree.root;

  while (n) {
    const d = cmp(key, n.key);

    if (St.equals(key, n.key)) {
      return O.some(n.value);
    }

    if (d <= 0) {
      n = n.left;
    } else {
      n = n.right;
    }
  }

  return O.none;
}
/**
 * Finds the item with key if it exists
 */

export function findFirst(key) {
  return tree => findFirst_(tree, key);
}
/**
 * Finds the item with key if it exists
 */

export function has_(tree, key) {
  return findFirst_(tree, key)._tag === "Some";
}
/**
 * Finds the item with key if it exists
 */

export function has(key) {
  return tree => has_(tree, key);
}
/**
 * Removes entry with key
 */

export function removeFirst_(self, key) {
  const cmp = self.ord.compare;
  let node = self.root;
  const stack = [];

  while (node) {
    const d = cmp(key, node.key);
    stack.push(node);

    if (St.equals(key, node.key)) {
      node = undefined;
    } else if (d <= 0) {
      node = node.left;
    } else {
      node = node.right;
    }
  }

  if (stack.length === 0) {
    return self;
  }

  const cstack = new Array(stack.length);
  let n = stack[stack.length - 1];
  cstack[cstack.length - 1] = new Node(n.color, n.key, n.value, n.left, n.right, n.count);

  for (let i = stack.length - 2; i >= 0; --i) {
    n = stack[i];

    if (n.left === stack[i + 1]) {
      cstack[i] = new Node(n.color, n.key, n.value, cstack[i + 1], n.right, n.count);
    } else {
      cstack[i] = new Node(n.color, n.key, n.value, n.left, cstack[i + 1], n.count);
    }
  } //Get node


  n = cstack[cstack.length - 1]; //console.log("start remove: ", n.value)
  //If not leaf, then swap with previous node

  if (n.left && n.right) {
    //console.log("moving to leaf")
    //First walk to previous leaf
    const split = cstack.length;
    n = n.left;

    while (n.right) {
      cstack.push(n);
      n = n.right;
    } //Copy path to leaf


    const v = cstack[split - 1];
    cstack.push(new Node(n.color, v.key, v.value, n.left, n.right, n.count));
    cstack[split - 1].key = n.key;
    cstack[split - 1].value = n.value; //Fix up stack

    for (let i = cstack.length - 2; i >= split; --i) {
      n = cstack[i];
      cstack[i] = new Node(n.color, n.key, n.value, n.left, cstack[i + 1], n.count);
    }

    cstack[split - 1].left = cstack[split];
  } //console.log("stack=", cstack.map(function(v) { return v.value }))
  //Remove leaf node


  n = cstack[cstack.length - 1];

  if (n.color === "Red") {
    //Easy case: removing red leaf
    //console.log("RED leaf")
    const p = cstack[cstack.length - 2];

    if (p.left === n) {
      p.left = null;
    } else if (p.right === n) {
      p.right = null;
    }

    cstack.pop();

    for (let i = 0; i < cstack.length; ++i) {
      cstack[i]._count--;
    }

    return new RedBlackTree(self.ord, cstack[0]);
  } else {
    if (n.left || n.right) {
      //Second easy case:  Single child black parent
      //console.log("BLACK single child")
      if (n.left) {
        swapNode(n, n.left);
      } else if (n.right) {
        swapNode(n, n.right);
      } //Child must be red, so repaint it black to balance color


      n.color = "Black";

      for (let i = 0; i < cstack.length - 1; ++i) {
        cstack[i]._count--;
      }

      return new RedBlackTree(self.ord, cstack[0]);
    } else if (cstack.length === 1) {
      //Third easy case: root
      //console.log("ROOT")
      return new RedBlackTree(self.ord, undefined);
    } else {
      //Hard case: Repaint n, and then do some nasty stuff
      //console.log("BLACK leaf no children")
      for (let i = 0; i < cstack.length; ++i) {
        cstack[i]._count--;
      }

      const parent = cstack[cstack.length - 2];
      fixDoubleBlack(cstack); //Fix up links

      if (parent.left === n) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }
  }

  return new RedBlackTree(self.ord, cstack[0]);
}
/**
 * Removes entry with key
 */

export function removeFirst(key) {
  return tree => removeFirst_(tree, key);
}
/**
 * Reduce a state over the map entries
 */

export function reduceWithIndex_(map, z, f) {
  let x = z;

  for (const [k, v] of map) {
    x = f(x, k, v);
  }

  return x;
}
/**
 * Reduce a state over the map entries
 *
 * @ets_data_first reduceWithIndex_
 */

export function reduceWithIndex(z, f) {
  return map => reduceWithIndex_(map, z, f);
}
/**
 * Reduce a state over the map entries
 */

export function reduce_(map, z, f) {
  return reduceWithIndex_(map, z, (z1, _, v) => f(z1, v));
}
/**
 * Reduce a state over the map entries
 *
 * @ets_data_first reduceWithIndex_
 */

export function reduce(z, f) {
  return map => reduce_(map, z, f);
}
//# sourceMappingURL=index.mjs.map