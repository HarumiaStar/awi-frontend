import { ThreeDMap, TwoDMap } from "../Utils/Types/ThreeDMap";
import { expect, test, describe } from 'vitest'


describe('TwoDMap', () => {

    test('set', () => {
        const map = new TwoDMap<string, string, number>();
        map.set('a', 'b', 1);
    });

    test('get', () => {
        const map = new TwoDMap<string, string, number>();
        map.set('a', 'b', 1);
        expect(map.get('a', 'b')).toBe(1);
    });

    test('get throws', () => {
        const map = new TwoDMap<string, string, number>();
        map.set('a', 'b', 1);
        try {
            map.get('a', 'c');
            expect(false).toBeTruthy();
        } catch (error) {
            expect(true).toBeTruthy();
        }
    });

    test('get 1D by first Dimension', () => {
        const map = new TwoDMap<string, string, number>();
        map.set('a', 'b', 1);

        const map1D = map.getMapWithFirstDimension();
        expect(map1D).toBeDefined();

        const rowA = map1D.get('a');

        expect(rowA).toBeDefined();

        const value = rowA!.get('b');
        expect(value).toBe(1);

    });

    test('get 1D by second Dimension', () => {
        const map = new TwoDMap<string, string, number>();
        map.set('a', 'b', 1);

        const map1D = map.getMapWithSecondDimension();
        expect(map1D).toBeDefined();

        const rowB = map1D.get('b');

        expect(rowB).toBeDefined();

        const value = rowB!.get('a');
        expect(value).toBe(1);

    });

});

describe('ThreeDMap', () => {

    test('set', () => {
        const map = new ThreeDMap<string, string, string, number>();
        map.set('a', 'b', 'c', 1);
    });

    test('get', () => {
        const map = new ThreeDMap<string, string, string, number>();
        map.set('a', 'b', 'c', 1);
        expect(map.get('a', 'b', 'c')).toBe(1);
    });

    test('get throws', () => {
        const map = new ThreeDMap<string, string, string, number>();
        map.set('a', 'b', 'c', 1);
        try {
            map.get('a', 'b', 'd');
            expect(false).toBeTruthy();
        } catch (error) {
            expect(true).toBeTruthy();
        }
    });

    test('get 2D', () => {
        const map = new ThreeDMap<string, string, string, number>();
        map.set('a', 'b', 'c', 1);

        const map2D = map.get2DByA();
        expect(map2D).toBeDefined();

        const rowA = map2D.get('a');
        expect(rowA).toBeDefined();

        const value = rowA!.get('b', 'c');
        expect(value).toBe(1);
    });

    test('get 2D throws', () => {
        const map = new ThreeDMap<string, string, string, number>();
        map.set('a', 'b', 'c', 1);

        const map2D = map.get2DByA();
        expect(map2D).toBeDefined();

        const rowA = map2D.get('a');
        expect(rowA).toBeDefined();

        try {
            rowA!.get('b', 'd');
            expect(false).toBeTruthy();
        } catch (error) {
            expect(true).toBeTruthy();
        }
    });

    test('get 2D by B', () => {
        const map = new ThreeDMap<string, string, string, number>();
        map.set('a', 'b', 'c', 1);

        const map2D = map.get2DByB();
        expect(map2D).toBeDefined();

        const rowB = map2D.get('b');
        expect(rowB).toBeDefined();

        const value = rowB!.get('a', 'c');
        expect(value).toBe(1);
    });

    test('get 2D by C', () => {
        const map = new ThreeDMap<string, string, string, number>();
        map.set('a', 'b', 'c', 1);
        map.set('a', 'b', 'd', 2);
        map.set('a', 'c', 'c', 3);
        map.set('a', 'c', 'd', 4);
        map.set('e', 'b', 'c', 5);

        const map2D = map.get2DByC();
        expect(map2D).toBeDefined();

        const rowC = map2D.get('d');
        expect(rowC).toBeDefined();

        let value = rowC!.get('a', 'b');
        expect(value).toBe(2);

        value = rowC!.get('a', 'c');
        expect(value).toBe(4);
    });

    test('loop through A, B, C', () => {
        const map = new ThreeDMap<string, string, string, number>();
        map.set('a', 'b', 'c', 1);
        map.set('a', 'b', 'd', 2);
        map.set('a', 'c', 'c', 3);
        map.set('a', 'c', 'd', 4);
        map.set('e', 'b', 'c', 5);
        map.set('e', 'b', 'd', 6);
        map.set('e', 'c', 'c', 7);
        map.set('e', 'c', 'd', 8);
        
        const result: string[] = [];
        map.get2DByA().forEach((rowA, a) => {
            rowA.getMapWithFirstDimension().forEach((rowB, b) => {
                rowB?.forEach((value, c) => {
                    result.push(a + "-" + b + "-" + c + "-" + value);
                });
            });
        });

        expect(result).toEqual([
            "a-b-c-1",
            "a-b-d-2",
            "a-c-c-3",
            "a-c-d-4",
            "e-b-c-5",
            "e-b-d-6",
            "e-c-c-7",
            "e-c-d-8",
        ]);

    });

    test('loop through B, C, A', () => {
        const map = new ThreeDMap<string, string, string, number>();
        map.set('a', 'b', 'c', 1);
        map.set('a', 'b', 'd', 2);
        map.set('a', 'c', 'c', 3);
        map.set('a', 'c', 'd', 4);
        map.set('e', 'b', 'c', 5);
        map.set('e', 'b', 'd', 6);
        map.set('e', 'c', 'c', 7);
        map.set('e', 'c', 'd', 8);
        
        const result: string[] = [];
        map.get2DByB().forEach((rowB, b) => {
            rowB.getMapWithSecondDimension().forEach((rowC, c) => {
                rowC?.forEach((value, a) => {
                    result.push(a + "-" + b + "-" + c + "-" + value);
                });
            });
        });

        expect(result).toEqual([
            "a-b-c-1",
            "e-b-c-5",
            "a-b-d-2",
            "e-b-d-6",
            "a-c-c-3",
            "e-c-c-7",
            "a-c-d-4",
            "e-c-d-8",
        ]);

    });


    test('loop through C, A, B', () => {
        const map = new ThreeDMap<string, string, string, number>();
        map.set('a', 'b', 'c', 1);
        map.set('a', 'b', 'd', 2);
        map.set('a', 'c', 'c', 3);
        map.set('a', 'c', 'd', 4);
        map.set('e', 'b', 'c', 5);
        map.set('e', 'b', 'd', 6);
        map.set('e', 'c', 'c', 7);
        map.set('e', 'c', 'd', 8);
        
        const result: string[] = [];
        map.get2DByC().forEach((rowC, c) => {
            rowC.getMapWithFirstDimension().forEach((rowA, a) => {
                rowA?.forEach((value, b) => {
                    result.push(a + "-" + b + "-" + c + "-" + value);
                });
            });
        });

        expect(result).toEqual([
            "a-b-c-1",
            "a-c-c-3",
            "e-b-c-5",
            "e-c-c-7",
            "a-b-d-2",
            "a-c-d-4",
            "e-b-d-6",
            "e-c-d-8",
        ]);

    });

});
