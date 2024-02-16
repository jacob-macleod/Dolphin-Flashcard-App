"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chain = chain;
exports.chain_ = chain_;
exports.first = first;
exports.flatten = flatten;
exports.fold = fold;
exports.fold_ = fold_;
exports.map = map;
exports.map_ = map_;
exports.toCause = toCause;
exports.zip = zip;
exports.zipLeft = zipLeft;
exports.zipLeft_ = zipLeft_;
exports.zipRight = zipRight;
exports.zipRight_ = zipRight_;
exports.zipWith = zipWith;
exports.zipWith_ = zipWith_;
exports.zip_ = zip_;

var Cause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Cause/core.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Either/index.js"));

var _index2 = /*#__PURE__*/require("../../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Option/index.js"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../List/core.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Tuple/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./primitives.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns the first event in this collection of events. If multiple events
 * occur in parallel and before any other events then any of these events
 * may be returned.
 */
function first(self) {
  // eslint-disable-next-line no-constant-condition
  while (1) {
    switch (self._tag) {
      case "Single":
        {
          return O.some(self.a);
        }

      case "Empty":
        {
          return O.none;
        }

      case "Both":
        {
          self = self.left;
          break;
        }

      case "Then":
        {
          self = self.left;
          break;
        }
    }
  }

  throw new Error("Bug");
}

function foldLoop(emptyCase, singleCase, thenCase, bothCase, inp, out) {
  // eslint-disable-next-line no-constant-condition
  while (1) {
    if (L.isEmpty(inp)) {
      return L.reduce_(out, L.empty(), (acc, val) => {
        if (val._tag === "Right") {
          return L.prepend_(acc, val.right);
        } else {
          if (val.left) {
            let parSeqs = acc;
            const left = L.unsafeFirst(parSeqs);
            parSeqs = L.tail(parSeqs);
            const right = L.unsafeFirst(parSeqs);
            parSeqs = L.tail(parSeqs);
            return L.prepend_(parSeqs, bothCase(left, right));
          } else {
            let parSeqs = acc;
            const left = L.unsafeFirst(parSeqs);
            parSeqs = L.tail(parSeqs);
            const right = L.unsafeFirst(parSeqs);
            parSeqs = L.tail(parSeqs);
            return L.prepend_(parSeqs, thenCase(left, right));
          }
        }
      });
    } else {
      const head = L.unsafeFirst(inp);
      const parSeqs = L.tail(inp);

      switch (head._tag) {
        case "Empty":
          {
            inp = parSeqs;
            out = L.prepend_(out, E.right(emptyCase));
            break;
          }

        case "Single":
          {
            inp = parSeqs;
            out = L.prepend_(out, E.right(singleCase(head.a)));
            break;
          }

        case "Then":
          {
            inp = L.prepend_(L.prepend_(parSeqs, head.right), head.left);
            out = L.prepend_(out, E.left(false));
            break;
          }

        case "Both":
          {
            inp = L.prepend_(L.prepend_(parSeqs, head.right), head.left);
            out = L.prepend_(out, E.left(true));
            break;
          }
      }
    }
  }

  throw new Error("Bug");
}
/**
 * Folds over the events in this collection of events using the specified
 * functions.
 */


function fold_(self, emptyCase, singleCase, thenCase, bothCase) {
  return L.unsafeFirst(foldLoop(emptyCase, singleCase, thenCase, bothCase, L.of(self), L.empty()));
}
/**
 * Folds over the events in this collection of events using the specified
 * functions.
 *
 * @ets_data_first fold_
 */


function fold(emptyCase, singleCase, thenCase, bothCase) {
  return self => fold_(self, emptyCase, singleCase, thenCase, bothCase);
}
/**
 * Constructs a new collection of events for each event in this collection of
 * events, collecting them back into a single collection of events.
 */


function chain_(self, f) {
  return fold_(self, P.empty, f, P.combineSeq_, P.combinePar_);
}
/**
 * Constructs a new collection of events for each event in this collection of
 * events, collecting them back into a single collection of events.
 *
 * @ets_data_first chain_
 */


function chain(f) {
  return self => chain_(self, f);
}
/**
 * Flattens a collection of collections of events into a single collection
 * of events.
 */


function flatten(self) {
  return chain_(self, _index2.identity);
}
/**
 * Converts a ParSeq to a Cause
 */


function toCause(self) {
  return fold_(self, Cause.empty, Cause.fail, Cause.combineSeq, Cause.combinePar);
}
/**
 * Transforms the type of events in this collection of events with the
 * specified function.
 */


function map_(self, f) {
  return chain_(self, a => P.single(f(a)));
}
/**
 * Transforms the type of events in this collection of events with the
 * specified function.
 *
 * @ets_data_first map_
 */


function map(f) {
  return self => map_(self, f);
}
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events using the specified function.
 */


function zipWith_(self, that, f) {
  return chain_(self, a => map_(that, b => f(a, b)));
}
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events using the specified function.
 *
 * @ets_data_first zipWith_
 */


function zipWith(that, f) {
  return self => zipWith_(self, that, f);
}
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, combining the elements into a
 * tuple.
 */


function zip_(self, that) {
  return zipWith_(self, that, Tp.tuple);
}
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, combining the elements into a
 * tuple.
 *
 * @ets_data_first zip_
 */


function zip(that) {
  return self => zip_(self, that);
}
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, keeping only the events from this
 * collection.
 */


function zipLeft_(self, that) {
  return zipWith_(self, that, (a, _b) => a);
}
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, keeping only the events from this
 * collection.
 *
 * @ets_data_first zipLeft_
 */


function zipLeft(that) {
  return self => zipLeft_(self, that);
}
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, keeping only the events from that
 * collection.
 */


function zipRight_(self, that) {
  return zipWith_(self, that, (_a, b) => b);
}
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, keeping only the events from that
 * collection.
 *
 * @ets_data_first zipRight_
 */


function zipRight(that) {
  return self => zipRight_(self, that);
}
//# sourceMappingURL=core.js.map