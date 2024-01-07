export class Liste_deroulante_element {
    nom: string;
    data: Liste_deroulante_element_data[];

    constructor(nom: string, data: { nom: string, valeur: number }[]) {
        this.nom = nom;
        this.data = data;
    }
}

export class Liste_deroulante_element_data {
    nom: string;
    valeur: number;

    constructor(nom: string, valeur: number) {
        this.nom = nom;
        this.valeur = valeur;
    }
}