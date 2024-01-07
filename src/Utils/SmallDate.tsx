export default class SmallDate{
    private _day_of_month: number;
    private _month: number;
    private _year: number;

    
    constructor(day_of_month: number, month: number, year: number){
        if(day_of_month < 1 || day_of_month > 31){
            throw new Error("Invalid day of month");
        }
        if(month < 1 || month > 12){
            throw new Error("Invalid month");
        }
        if(year < 0){
            throw new Error("Invalid year");
        }


        this._day_of_month = day_of_month;
        this._month = month;
        this._year = year;
    }

    public get day_of_month(): number {
        return this._day_of_month;
    }

    public get month(): number {
        return this._month;
    }

    public get year(): number {
        return this._year;
    }

    public set day_of_month(value: number) {
        this._day_of_month = value;
    }

    public set month(value: number) {
        this._month = value;
    }

    public set year(value: number) {
        this._year = value;
    }

    public toString(): string {
        return this._day_of_month + "/" + this._month + "/" + this._year;
    }

    public clone(): SmallDate {
        return new SmallDate(this._day_of_month, this._month, this._year);
    }

    public static fromString(date: string): SmallDate {
        const split = date.split("/");
        return new SmallDate(parseInt(split[0]), parseInt(split[1]), parseInt(split[2]));
    }

    // Redefine the operator === to compare two SmallDate
    public equals(other: SmallDate): boolean {
        return this._day_of_month === other._day_of_month && this._month === other._month && this._year === other._year;
    }
  
}