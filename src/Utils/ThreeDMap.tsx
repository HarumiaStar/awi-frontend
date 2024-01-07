type TwoDMapEntry<A, B, T> = [A, B, T];
class TwoDMap<A, B, T> {
    private map: Array<TwoDMapEntry<A, B, T>> = [];

    setValue(row: A, col: B, value: T): void {
        this.map.push([row, col, value]);
    }

    getMapWithFirstDimension(): Map<A, Map<B, T>> {
        const result = new Map<A, Map<B, T>>();
        for (const [keyA, keyB, value] of this.map) {
            if (!result.has(keyA)) {
                result.set(keyA, new Map());
            }
            result.get(keyA)!.set(keyB, value);
        }
        return result;
    }

    getMapWithSecondDimension(): Map<B, Map<A, T>> {
        const result = new Map<B, Map<A, T>>();
        for (const [keyA, keyB, value] of this.map) {
            if (!result.has(keyB)) {
                result.set(keyB, new Map());
            }
            result.get(keyB)!.set(keyA, value);
        }
        return result;
    }

    getValue(row: A, col: B): T {
        for (const [a, b, value] of this.map) {
            if (a === row && b === col) {
                return value;
            }
        }
        throw new Error(`No value for ${row}, ${col}`);
    }
}

type ThreeDMapEntry<A, B, C, T> = [A, B, C, T];
class ThreeDMap<A, B, C, T> {
    private map: Array<ThreeDMapEntry<A, B, C, T>> = [];

    setValue(keyA: A, keyB: B, keyC: C, value: T): void {
        this.map.push([keyA, keyB, keyC, value]);
    }

    get2DByA(): Map<A, TwoDMap<B, C, T>> {
        const result = new Map<A, TwoDMap<B, C, T>>();
        for (const [keyA, keyB, keyC, value] of this.map) {
            if (!result.has(keyA)) {
                result.set(keyA, new TwoDMap());
            }
            result.get(keyA)!.setValue(keyB, keyC, value);
        }
        return result;
    }

    get2DByB(): Map<B, TwoDMap<A, C, T>> {
        const result = new Map<B, TwoDMap<A, C, T>>();
        for (const [keyA, keyB, keyC, value] of this.map) {
            if (!result.has(keyB)) {
                result.set(keyB, new TwoDMap());
            }
            result.get(keyB)!.setValue(keyA, keyC, value);
        }
        return result;
    }

    get2DByC(): Map<C, TwoDMap<A, B, T>> {
        const result = new Map<C, TwoDMap<A, B, T>>();
        for (const [keyA, keyB, keyC, value] of this.map) {
            if (!result.has(keyC)) {
                result.set(keyC, new TwoDMap());
            }
            result.get(keyC)!.setValue(keyA, keyB, value);
        }
        return result;
    }

    getValue(keyA: A, keyB: B, keyC: C): T {
        for (const [a, b, c, value] of this.map) {
            if (a === keyA && b === keyB && c === keyC) {
                return value;
            }
        }
        throw new Error(`No value for ${keyA}, ${keyB}, ${keyC}`);
    }
}

