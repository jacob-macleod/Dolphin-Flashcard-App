import * as HKT from "../HKT/index.mjs";
export function getContravariantComposition(F, G) {
  return {
    map: f => F.contramap(G.contramap(f))
  };
}
//# sourceMappingURL=index.mjs.map