import * as FoldSink from "./foldSink.mjs";
/**
 * Runs this sink until it yields a result, then uses that result to create another
 * sink from the provided function which will continue to run until it yields a result.
 *
 * This function essentially runs sinks in sequence.
 */

export function chain_(self, f) {
  return FoldSink.foldSink_(self, _ => fail(_), f);
}
/**
 * Runs this sink until it yields a result, then uses that result to create another
 * sink from the provided function which will continue to run until it yields a result.
 *
 * This function essentially runs sinks in sequence.
 *
 * @ets_data_first chain_
 */

export function chain(f) {
  return self => chain_(self, f);
}
//# sourceMappingURL=chain.mjs.map