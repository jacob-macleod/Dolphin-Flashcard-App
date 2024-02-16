// ets_tracing: off
import * as HashMap from "../../Collections/Immutable/HashMap/index.mjs";
import * as L from "../../Collections/Immutable/List/index.mjs";
import * as O from "../../Option/index.mjs";
export class TestAnnotationMap {
  constructor(map) {
    this.map = map;
  }

}
TestAnnotationMap.empty = /*#__PURE__*/new TestAnnotationMap( /*#__PURE__*/HashMap.make());
export function concat(self, that) {
  const l = L.from(self.map);
  const r = L.from(that.map);
  return new TestAnnotationMap(L.reduce_(L.concat_(l, r), TestAnnotationMap.empty.map, (acc, [key, value]) => HashMap.set_(acc, key, O.fold_(HashMap.get_(acc, key), () => value, x => key.combine(x, value)))));
}
export function get(key) {
  return tam => O.fold_(HashMap.get_(tam.map, key), () => key.initial, a => a);
}
export function overwrite(key, value) {
  return tam => new TestAnnotationMap(HashMap.set_(tam.map, key, value));
}
export function update(key, f) {
  return tam => overwrite(key, f(get(key)(tam)))(tam);
}
export function annotate(key, value) {
  return tam => update(key, _ => key.combine(_, value))(tam);
}
//# sourceMappingURL=index.mjs.map