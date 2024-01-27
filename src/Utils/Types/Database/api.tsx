
import { HmacSHA256 } from 'crypto-js';

export default class Api {
    private static readonly instance: Api = new Api();


    public static getInstance(): Api {
        return Api.instance;
    }

    /* -------------------------------------------------------------------------- */
    /*                              REQUETE CLASSIQUE                             */
    /* -------------------------------------------------------------------------- */

    public async get(url: string): Promise<Response> {
        return fetch(url);
    }

    public async post(url: string, body: any): Promise<Response> {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body
        });

    }

    public async put(url: string, body: any): Promise<Response> {
        return fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body
        });
    }

    public async delete(url: string): Promise<Response> {
        return fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                            FIN REQUETE CLASSIQUE                           */
    /* -------------------------------------------------------------------------- */


    /* -------------------------------------------------------------------------- */
    /*                                 REQUETE API                                */
    /* -------------------------------------------------------------------------- */



    private readonly api_url: string;
    private token: string | null = null;
    private hash_seed: string | null = null;
    private constructor() {
        const url = import.meta.env.VITE_API_URL;
        if (url === undefined || url === null || url === "") {
            throw new Error("API URL is not defined");
        }
        this.api_url = url;
        this.getToken();
    }

    public setToken(token: string): void {
        this.token = token;
        localStorage.setItem("token", token);
    }

    public getToken(): string | null {
        if (this.token === null) {
            const token = localStorage.getItem("token");
            if (token === null) {
                return null;
            }
            this.token = token;
        }
        return this.token;
    }

    public getApiUrl(): string {
        return this.api_url;
    }

    public getHashSeed(): string | null {
        return this.hash_seed;
    }

    public setHashSeed(hash_seed: string): void {
        this.hash_seed = hash_seed;
    }

    public resetToken(): void {
        this.token = null;
        localStorage.removeItem("token");
    }

    public encryptWithHashSeed(data: string): string {
        if (this.hash_seed === null) {
            throw new Error("Hash seed is null");
        }
        const hash = HmacSHA256(data, this.hash_seed).toString();
        return hash;
    }


    getHashSeedFromServer(): Promise<Response> {
        return this.get(this.api_url + "/auth/hash-seed");
    }

    public async getApi(path: string, token: boolean = true): Promise<Response> {
        const url = this.api_url + path;
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? "Bearer " + this.token : ""
            }
        });
    }

    public async postApi(path: string, body: any, token: boolean = true): Promise<Response> {
        const url = this.api_url + path;
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? "Bearer " + this.token : ""
            },
            body
        });
    }

    public async putApi(path: string, body: any, token: boolean = true): Promise<Response> {
        const url = this.api_url + path;
        return fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? "Bearer " + this.token : ""
            },
            body
        });
    }

    public async deleteApi(path: string, token: boolean = true): Promise<Response> {
        const url = this.api_url + path;
        return fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? "Bearer " + this.token : ""
            }
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                               FIN REQUETE API                              */
    /* -------------------------------------------------------------------------- */


}