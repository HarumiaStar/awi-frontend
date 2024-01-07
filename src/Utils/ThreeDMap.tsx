import SmallDate from "./SmallDate";

export type TwoDMapEntry<A, B, T> = [A, B, T];
export class TwoDMap<A, B, T> {
    private raw_data: Array<TwoDMapEntry<A, B, T>> = [];

    set(row: A, col: B, value: T): void {
        this.raw_data.push([row, col, value]);
    }

    getMapWithFirstDimension(): Map<A, Map<B, T>> {
        const result = new Map<A, Map<B, T>>();
        for (const [keyA, keyB, value] of this.raw_data) {
            if (!result.has(keyA)) {
                result.set(keyA, new Map());
            }
            result.get(keyA)!.set(keyB, value);
        }
        return result;
    }

    getMapWithSecondDimension(): Map<B, Map<A, T>> {
        const result = new Map<B, Map<A, T>>();
        for (const [keyA, keyB, value] of this.raw_data) {
            if (!result.has(keyB)) {
                result.set(keyB, new Map());
            }
            result.get(keyB)!.set(keyA, value);
        }
        return result;
    }

    get(row: A, col: B): T {
        for (const [a, b, value] of this.raw_data) {
            if (a === row && b === col) {
                return value;
            }
        }
        throw new Error(`No value for ${row}, ${col}`);
    }

    public equals(other: TwoDMap<A, B, T>): boolean {
        if (this.raw_data.length !== other.raw_data.length) {
            return false;
        }
        for (let i = 0; i < this.raw_data.length; i++) {
            if (this.raw_data[i][0] !== other.raw_data[i][0] || this.raw_data[i][1] !== other.raw_data[i][1] || this.raw_data[i][2] !== other.raw_data[i][2]) {
                return false;
            }
        }
        return true;
    }

    public clone(): TwoDMap<A, B, T> {
        const result = new TwoDMap<A, B, T>();
        for (const [a, b, value] of this.raw_data) {
            result.set(a, b, value);
        }
        return result;
    }
}

export type ThreeDMapEntry<A, B, C, T> = [A, B, C, T];
export class ThreeDMap<A, B, C, T> {
    private raw_data: Array<ThreeDMapEntry<A, B, C, T>> = [];

    set(keyA: A, keyB: B, keyC: C, value: T): void {
        this.raw_data.push([keyA, keyB, keyC, value]);
    }

    /**
     * 
     * @returns A map<A, TwoDMap<B, C, T>> where the first key is the first dimension, and the second key is the second dimension
     */
    get2DByA(): Map<A, TwoDMap<B, C, T>> {
        const result = new Map<A, TwoDMap<B, C, T>>();
        for (const entry of this.raw_data) {
            const [keyA, keyB, keyC, value] = entry;
            let twoDMap = Array.from(result).find(([key]) =>{
                if (key instanceof SmallDate) {
                    return key.equals(keyA as SmallDate);
                }
                return key === keyA;
            })?.[1];

            if (!twoDMap) {
                twoDMap = new TwoDMap<B, C, T>();
                result.set(keyA, twoDMap);
            }
            twoDMap.set(keyB, keyC, value);
        }
        return result;
    }


    /**
     * 
     * @returns A map<B, TwoDMap<A, C, T>> where the first key is the second dimension, and the second key is the first dimension
     */
    get2DByB(): Map<B, TwoDMap<A, C, T>> {
        const result = new Map<B, TwoDMap<A, C, T>>();
        for (const entry of this.raw_data) {
            const [keyA, keyB, keyC, value] = entry;
            let twoDMap = Array.from(result).find(([key]) => {
                if (key instanceof SmallDate) {
                    return key.equals(keyB as SmallDate);
                }
                return key === keyB;
            })?.[1];
            if (!twoDMap) {
                twoDMap = new TwoDMap<A, C, T>();
                result.set(keyB, twoDMap);
            }
            twoDMap.set(keyA, keyC, value);
        }
        return result;
    }

    /**
     * 
     * @returns A map<C, TwoDMap<A, B, T>> where the first key is the third dimension, and the second key is the first dimension
     */
    get2DByC(): Map<C, TwoDMap<A, B, T>> {
        const result = new Map<C, TwoDMap<A, B, T>>();
        for (const entry of this.raw_data) {
            const [keyA, keyB, keyC, value] = entry;
            let twoDMap = Array.from(result).find(([key]) => {
                if (key instanceof SmallDate) {
                    return key.equals(keyC as SmallDate);
                }
                return key === keyC;
            })?.[1];
            if (!twoDMap) {
                twoDMap = new TwoDMap<A, B, T>();
                result.set(keyC, twoDMap);
            }
            twoDMap.set(keyA, keyB, value);
        }
        return result;
    }

    get(keyA: A, keyB: B, keyC: C): T {
        for (const [a, b, c, value] of this.raw_data) {
            if (a === keyA && b === keyB && c === keyC) {
                return value;
            }
        }
        throw new Error(`No value for ${keyA}, ${keyB}, ${keyC}`);
    }
}

