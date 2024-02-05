import Api from "./api";
import { login, logout, register, setupHashSeed } from "./Auth";
import { Festival, Jeu, creneau, poste, zoneAnimation } from "./typesRetour";

export {
    Api,
    login,
    logout,
    register,
    setupHashSeed,

};


export type {
    Festival,
    Jeu,
    creneau,
    poste,
    zoneAnimation
};