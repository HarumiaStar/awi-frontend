// Singleton class authentification for know if user is connected or not

export default class Authentification {
    private static instance: Authentification;
    private _isConnected: boolean = false;

    private constructor() { }

    public static getInstance(): Authentification {
        if (!Authentification.instance) {
            Authentification.instance = new Authentification();
        }

        return Authentification.instance;
    }

    public get isConnected(): boolean {
        return this._isConnected;
    }

    public set isConnected(value: boolean) {
        this._isConnected = value;
    }

    public disconnect() {
        this._isConnected = false;
    }

    public connect(login: string, password: string) {
        this._isConnected = true;
    }
}