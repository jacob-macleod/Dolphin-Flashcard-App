// ets_tracing: off
import * as CS from "../../../../../Cause/index.mjs";
import * as CK from "../../../../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../../../../../Effect/index.mjs";
import * as Ex from "../../../../../Exit/index.mjs";
import * as O from "../../../../../Option/index.mjs";
export function toEmit(fn) {
  const ops = {
    chunk(as) {
      return this(T.succeed(as));
    },

    die(err) {
      return this(T.die(err));
    },

    dieMessage(message) {
      return this(T.dieMessage(message));
    },

    done(exit) {
      return this(T.done(Ex.mapBoth_(exit, e => O.some(e), a => CK.single(a))));
    },

    end() {
      return this(T.fail(O.none));
    },

    fail(e) {
      return this(T.fail(O.some(e)));
    },

    fromEffect(io) {
      return this(T.mapBoth_(io, e => O.some(e), a => CK.single(a)));
    },

    fromEffectChunk(io) {
      return this(T.mapError_(io, e => O.some(e)));
    },

    halt(cause) {
      return this(T.halt(CS.map_(cause, e => O.some(e))));
    },

    single(a) {
      return this(T.succeed(CK.single(a)));
    }

  };
  return Object.assign(fn, ops);
}
//# sourceMappingURL=Emit.mjs.map