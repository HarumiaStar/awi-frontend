import { jeuxParser, separator } from "../Utils/Types/JeuxParser";
import { header, jeuComplet, jeuSansZoneBenevole } from "./data/Jeux";

describe('JeuxParser', () => {
    test('Empty data show error', () => {
        try {
            jeuxParser([]);
        } catch (error) {
            expect(true).toBeTruthy();
            return;
        }
        expect(false).toBeTruthy();
    });

    test('Bad header show error', () => {
        try {
            let badHeader: string[] = [...header];
            badHeader[0] = "";
            const headerRow = badHeader.join(separator);
            jeuxParser([headerRow])
        }
        catch (error) {
            expect(true).toBeTruthy();
            return;
        }
        expect(false).toBeTruthy();
    });

    test('Good header show no error and return empty array', () => {
        const headerRow = header.join(separator);
        const result = jeuxParser([headerRow]);
        expect(result).toStrictEqual([]);
    });

    test('Bad data show error', () => {
        try {
            const headerRow = header.join(separator);
            let badDataRowData: string[] = [...jeuComplet];
            badDataRowData[0] = "";
            const badDataRow = badDataRowData.join(separator);
            jeuxParser([headerRow, badDataRow])

        }
        catch (error) {
            expect(true).toBeTruthy();
            return;
        }
        expect(false).toBeTruthy();
    });

    test('Good data show no error and return array with one element', () => {
        const headerRow = header.join(separator);
        const goodDataRow = jeuComplet.join(separator);
        const result = jeuxParser([headerRow, goodDataRow]);
        expect(result.length).toBe(1);
    });

    test('Good data : empty zone benevole', () => {
        const headerRow = header.join(separator);
        const goodDataRow = jeuComplet.join(separator);
        const secondRow = jeuSansZoneBenevole.join(separator);
        const result = jeuxParser([headerRow, goodDataRow, secondRow]);

        expect(result.length).toBe(2);
        expect(result[1].zoneBenevole).not.toBeDefined();

    });

});