

/**
 * TimerReset
 * 
 * Permet de reset un timer en fonction d'une clé sans avoir à utiliser de référence et useRef ou useState. Ainsi evite de re-render le composant.
 * 
 * - setTimer(key: string, callback: () => void, delay: number): void
 * - clearTimer(key: string): void
 */
export class TimerReset {

    private timers: { [key: string]: NodeJS.Timeout | null } = {};

    public static getInstance(): TimerReset {
        if (!TimerReset.instance) {
            TimerReset.instance = new TimerReset();
        }
        return TimerReset.instance;
    }

    private static instance: TimerReset;

    private constructor() { }

    public setTimer(key: string, callback: () => void, delay: number) {
        if (this.timers[key]) {
            clearTimeout(this.timers[key]!);
        }
        this.timers[key] = setTimeout(() => {
            callback();
            this.timers[key] = null;
        }, delay);
    }

    public clearTimer(key: string) {
        if (this.timers[key]) {
            clearTimeout(this.timers[key]!);
            this.timers[key] = null;
        }
    }
    
}