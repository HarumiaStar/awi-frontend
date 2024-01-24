export default class Tuple<T1, T2> {
    public readonly item1: T1;
    public readonly item2: T2;

    constructor(item1: T1, item2: T2) {
        this.item1 = item1;
        this.item2 = item2;
    }
}