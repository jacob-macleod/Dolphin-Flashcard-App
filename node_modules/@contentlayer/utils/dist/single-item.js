export class SingleItem {
    constructor(item) {
        this.item = item;
    }
    map(fn) {
        return new SingleItem(fn(this.item));
    }
    filter(fn) {
        return fn(this.item) ? this : new SingleItem(undefined);
    }
}
export const singleItem = (item) => new SingleItem(item);
//# sourceMappingURL=single-item.js.map