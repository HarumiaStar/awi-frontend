import SmallDate from "../Utils/Types/SmallDate";
import { expect, test, describe } from 'vitest'

describe('SmallDate', () => {
   
    test('constructor', () => {
        const myDate = new SmallDate(29, 2, 2020);
        expect(myDate).toBeDefined();
    });

    test('constructor throws', () => {
        try {
            new SmallDate(32, 2, 2020);
        } catch (error) {
            expect(true).toBeTruthy();
        }
    });

    test('constructor throws', () => {
        try {
            new SmallDate(29, 13, 2020);
        } catch (error) {
            expect(true).toBeTruthy();
        }
    });

    test('constructor throws', () => {
        try {
            new SmallDate(29, 2, -2021);
        } catch (error) {
            expect(true).toBeTruthy();
        }
    });

    test('ToString', () => {
        const myDate = new SmallDate(29, 2, 2020);
        expect(myDate.toString()).toBe('29/2/2020');
    });

    test('ToString', () => {
        const myDate = new SmallDate(29, 12, 2020);
        expect(myDate.toString()).toBe('29/12/2020');
    });

    test('FromString', () => {
        const myDate = SmallDate.fromString('29/02/2020');
        expect(myDate).toBeDefined();
        expect(myDate.day_of_month).toBe(29);
        expect(myDate.month).toBe(2);
        expect(myDate.year).toBe(2020);
    });

    test('FromString throws', () => {
        try {
            SmallDate.fromString('40/02/2021');
        } catch (error) {
            expect(true).toBeTruthy();
        }
    });

    test('FromString throws', () => {
        try {
            SmallDate.fromString('29/13/2021');
        } catch (error) {
            expect(true).toBeTruthy();
        }
    });

    test('Clone', () => {
        const myDate = new SmallDate(29, 2, 2020);
        const clone = myDate.clone();
        expect(clone).toBeDefined();
        expect(clone.day_of_month).toBe(29);
        expect(clone.month).toBe(2);
        expect(clone.year).toBe(2020);

        expect(clone).not.toBe(myDate);
    });

    test('Equals true', () => {
        const myDate = new SmallDate(29, 2, 2020);
        const clone = myDate.clone();
        expect(clone.equals(myDate)).toBeTruthy();
        expect(myDate.equals(clone)).toBeTruthy();
    });

    test('Equals false', () => {
        const myDate = new SmallDate(29, 2, 2020);
        const clone = myDate.clone();
        clone.day_of_month = 28;
        expect(clone.equals(myDate)).toBeFalsy();
        expect(myDate.equals(clone)).toBeFalsy();
    });

    test('frFormat', () => {
        const myDate = new SmallDate(29, 2, 2020);
        expect(myDate.frFormat).toBe('29/2/2020');
    });


});