export function tailRec(a, f) {
  let v = f(a);

  while (v._tag === "Left") {
    v = f(v.left);
  }

  return v.right;
}
//# sourceMappingURL=index.mjs.map