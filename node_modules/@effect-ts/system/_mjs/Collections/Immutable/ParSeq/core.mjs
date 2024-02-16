// ets_tracing: off
import * as Cause from "../../../Cause/core.mjs";
import * as E from "../../../Either/index.mjs";
import { identity } from "../../../Function/index.mjs";
import * as O from "../../../Option/index.mjs";
import * as L from "../List/core.mjs";
import * as Tp from "../Tuple/index.mjs";
import * as P from "./primitives.mjs";
/**
 * Returns the first event in this collection of events. If multiple events
 * occur in parallel and before any other events then any of these events
 * may be returned.
 */

export function first(self) {
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


export function fold_(self, emptyCase, singleCase, thenCase, bothCase) {
  return L.unsafeFirst(foldLoop(emptyCase, singleCase, thenCase, bothCase, L.of(self), L.empty()));
}
/**
 * Folds over the events in this collection of events using the specified
 * functions.
 *
 * @ets_data_first fold_
 */

export function fold(emptyCase, singleCase, thenCase, bothCase) {
  return self => fold_(self, emptyCase, singleCase, thenCase, bothCase);
}
/**
 * Constructs a new collection of events for each event in this collection of
 * events, collecting them back into a single collection of events.
 */

export function chain_(self, f) {
  return fold_(self, P.empty, f, P.combineSeq_, P.combinePar_);
}
/**
 * Constructs a new collection of events for each event in this collection of
 * events, collecting them back into a single collection of events.
 *
 * @ets_data_first chain_
 */

export function chain(f) {
  return self => chain_(self, f);
}
/**
 * Flattens a collection of collections of events into a single collection
 * of events.
 */

export function flatten(self) {
  return chain_(self, identity);
}
/**
 * Converts a ParSeq to a Cause
 */

export function toCause(self) {
  return fold_(self, Cause.empty, Cause.fail, Cause.combineSeq, Cause.combinePar);
}
/**
 * Transforms the type of events in this collection of events with the
 * specified function.
 */

export function map_(self, f) {
  return chain_(self, a => P.single(f(a)));
}
/**
 * Transforms the type of events in this collection of events with the
 * specified function.
 *
 * @ets_data_first map_
 */

export function map(f) {
  return self => map_(self, f);
}
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events using the specified function.
 */

export function zipWith_(self, that, f) {
  return chain_(self, a => map_(that, b => f(a, b)));
}
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events using the specified function.
 *
 * @ets_data_first zipWith_
 */

export function zipWith(that, f) {
  return self => zipWith_(self, that, f);
}
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, combining the elements into a
 * tuple.
 */

export function zip_(self, that) {
  return zipWith_(self, that, Tp.tuple);
}
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, combining the elements into a
 * tuple.
 *
 * @ets_data_first zip_
 */

export function zip(that) {
  return self => zip_(self, that);
}
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, keeping only the events from this
 * collection.
 */

export function zipLeft_(self, that) {
  return zipWith_(self, that, (a, _b) => a);
}
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, keeping only the events from this
 * collection.
 *
 * @ets_data_first zipLeft_
 */

export function zipLeft(that) {
  return self => zipLeft_(self, that);
}
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, keeping only the events from that
 * collection.
 */

export function zipRight_(self, that) {
  return zipWith_(self, that, (_a, b) => b);
}
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, keeping only the events from that
 * collection.
 *
 * @ets_data_first zipRight_
 */

export function zipRight(that) {
  return self => zipRight_(self, that);
}
//# sourceMappingURL=core.mjs.map