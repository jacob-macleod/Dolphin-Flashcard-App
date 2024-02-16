export function struct(shows) {
  return {
    show: s => `{ ${Object.keys(shows).map(k => `${k}: ${shows[k].show(s[k])}`).join(", ")} }`
  };
}
export function tuple(...shows) {
  return {
    show: t => `[${t.map((a, i) => shows[i].show(a)).join(", ")}]`
  };
}
export const boolean = {
  show: a => JSON.stringify(a)
};
export const number = {
  show: a => JSON.stringify(a)
};
export const string = {
  show: a => JSON.stringify(a)
};
//# sourceMappingURL=operations.mjs.map