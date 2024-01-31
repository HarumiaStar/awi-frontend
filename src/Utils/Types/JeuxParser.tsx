/**
idJeu	Nom du jeu	Auteur	Éditeur	nb joueurs	âge min	Durée	Type	Notice	Zone plan	Zone bénévole	idZone	À animer	Reçu	Mécanismes	Thèmes	Tags	Description	Image	Logo	Vidéo
98	Paper Tales	Masato Uesugi	Catch Up Games	2 à 5 joueurs	12 ans	45 mn	Tout public	https://catchupgames.com/media/papertales/papertales_regles.pdf	Esplanade-Ouest 3	Esplanade-Ouest 3a	219	oui	oui	Cartes,Draft	Fantastique, Médiéval	Fantastique, Médiéval,Cartes,Draft	Ouvrez le livre des siècles oubliés pour revivre des temps héroïques, peuplés de créatures fantastiques. Développez votre Royaume à travers les Âges et mesurez-vous à vos adversaires pour écrire votre légende !	https://cdn3.philibertnet.com/552750-large_default/paper-tales-edition-integrale.jpg	https://catchupgames.com/wp-content/uploads/2022/10/logo_fond_blanc.png	https://www.youtube.com/watch?v=1kmGwtUy4eU

 */


export const separator = ";";
export const endOfLine = "\n";

export const headerAttendu: { [key: string]: string } = {
    idJeu: "idJeu",
    nom: "Nom du jeu",
    auteur: "Auteur",
    editeur: "Éditeur",
    nbJoueurs: "nb joueurs",
    ageMin: "âge min",
    duree: "Durée",
    type: "Type",
    notice: "Notice",
    zonePlan: "Zone plan",
    zoneBenevole: "Zone bénévole",
    idZone: "idZone",
    aAnimer: "À animer",
    recu: "Reçu",
    mecanismes: "Mécanismes",
    themes: "Thèmes",
    tags: "Tags",
    description: "Description",
    image: "Image",
    logo: "Logo",
    video: "Vidéo",
};

export type Jeu = {
    idJeu: number,
    nom: string,
    auteur?: string | undefined,
    editeur: string,
    nbJoueurs: string,
    ageMin: number,
    duree?: number | undefined,
    type: TypeJeu,
    notice?: Lien | undefined,
    zonePlan: string,
    zoneBenevole?: string,
    idZone: number,
    aAnimer: boolean,
    recu: boolean,
    mecanismes: string,
    themes: string,
    tags: string,
    description: string,
    image: Lien,
    logo: Lien,
    video: Lien,
};

export enum TypeJeu {
    Tout_public = "Tout public",
    Enfants = "Enfants",
    Experts = "Experts",
    Ambiance = "Ambiance",
    Initiés = "Initiés",
    JDR = "Jeu de rôle",
    Classiques = "Classiques",
}

export function parseTypeJeu(type: string) {
    switch (type) {
        case "Tout public":
            return TypeJeu.Tout_public;
        case "Enfants":
            return TypeJeu.Enfants;
        case "Experts":
            return TypeJeu.Experts;
        case "Ambiance":
            return TypeJeu.Ambiance;
        case "Initiés":
            return TypeJeu.Initiés;
        case "Jeu de rôle":
            return TypeJeu.JDR;
        case "Classiques":
            return TypeJeu.Classiques;
        default:
            throw new Error("Type de jeu inconnu : " + type);
    }
}

export type Lien = string;

export const compareHeader = (headerAttendu: string[], headerRecu: string[]) => {
    headerAttendu.forEach((element) => {
        if (!headerRecu.includes(element)) {
            return false;
        }
    });
    return true;
};

/**
 * Fonction qui parse un fichier csv de jeux
 * @param fichier : fichier csv à parser
 */
export function jeuxParserFichier(fichier: File) {
    let reader = new FileReader();
    reader.readAsText(fichier);
    let data: string[] = [];
    reader.onload = function () {
        let lines = reader.result?.toString().split(endOfLine);
        if (lines) {
            lines.forEach((line) => {
                data.push(line);
            });
        }
    };

    return jeuxParser(data);

}

/**
 * Fonction qui parse un fichier csv de jeux
 * @param data : données du fichier csv à parser
 * @returns : tableau de jeux
 * @throws : erreur si le fichier csv n'a pas le bon format
 */
export function jeuxParser(data: string[]) {


    let headerRecu = validationHeader(data[0]);
    if (headerRecu === null) {
        throw new Error("Erreur : le fichier csv n'a pas le bon format");
    }



    let jeux: Jeu[] = [];

    for (let i = 1; i < data.length; i++) {
        if (data[i] === "") {
            continue;
        }

        let jeu = data[i].split(separator);

        jeux.push(validationJeu(jeu));
    }

    return jeux;
}

export function validationHeader(headerRecu: string): string[] | null {
    let header = headerRecu.split(separator);

    header.forEach((element) => {
        if (element === "") {
            throw new Error("Erreur : le fichier csv n'a pas le bon format");
        }
    });

    if (!compareHeader(Object.values(headerAttendu), header)) {
        throw new Error("Erreur : le fichier csv n'a pas le bon format");
    }

    return header;
}



export function validationJeu(jeu: string[]): Jeu {
    // Nombre de clé de headerAttendu
    const nbKey = Object.keys(headerAttendu).length;


    if (jeu.length !== nbKey) {
        throw new Error("Erreur : le jeu n'a pas le bon format");
    }

    if (jeu[0] === "") {
        throw new Error("Erreur : l'id du jeu " + jeu[0] + " n'a pas le bon format");
    }
    let idJeu = parseInt(jeu[0]);
    if (isNaN(idJeu)) {
        throw new Error("Erreur : l'id du jeu " + jeu[0] + " n'a pas le bon format");
    }

    if (jeu[1] === "") {
        throw new Error("Erreur : le nom du jeu " + jeu[1] + " n'a pas le bon format");
    }
    let nom = jeu[1];

    let auteur: string | undefined = jeu[2];
    if (auteur === "") {
        auteur = undefined;
    }


    if (jeu[3] === "") {
        throw new Error("Erreur : l'éditeur du jeu " + jeu[3] + " n'a pas le bon format");
    }
    let editeur = jeu[3];

    if (jeu[4] === "") {
        throw new Error("Erreur : le nombre de joueurs du jeu " + jeu[4] + " n'a pas le bon format");
    }
    let nbJoueurs = jeu[4];
    let ageMin = parseInt(jeu[5]);

    let duree = undefined;

    if (jeu[6] !== "") {
        duree = parseInt(jeu[6]);
    }

    if (isNaN(ageMin)) {
        throw new Error("Erreur : l'âge min du jeu " + jeu[5] + " n'a pas le bon format");
    }
    let type = parseTypeJeu(jeu[7]);


    let notice: string | undefined = jeu[8];
    if (notice === "") {
        notice = undefined;
    }

    if (notice !== undefined && !notice.startsWith("http")) {
        throw new Error("Erreur : la notice du jeu " + jeu[8] + " n'est pas un lien");
    }


    if (jeu[9] === "") {
        throw new Error("Erreur : la zone du plan du jeu " + jeu[9] + " n'a pas le bon format");
    }
    let zonePlan = jeu[9];


    let zoneBenevole: string | undefined = jeu[10];
    if (zoneBenevole === "") {
        zoneBenevole = undefined;
    }

    if (jeu[11] === "") {
        console.log(jeu);
        throw new Error("Erreur : l'id de la zone du jeu " + jeu[11] + " n'a pas le bon format");
    }
    let idZone = parseInt(jeu[11]);
    if (isNaN(idZone)) {
        throw new Error("Erreur : l'id de la zone du jeu " + jeu[11] + " n'a pas le bon format");
    }


    if (jeu[12] === "" || (jeu[12] !== "oui" && jeu[12] !== "non")) {
        throw new Error("Erreur : le champ à animer du jeu " + jeu[12] + " n'a pas le bon format");
    }
    let aAnimer = jeu[12] === "oui";

    if (jeu[13] === "" || (jeu[13] !== "oui" && jeu[13] !== "non")) {
        throw new Error("Erreur : le champ reçu du jeu " + jeu[13] + " n'a pas le bon format");
    }
    let recu = jeu[13] === "oui";

    if (jeu[14] === "") {
        throw new Error("Erreur : le champ mécanismes du jeu " + jeu[14] + " n'a pas le bon format");
    }
    let mecanismes = jeu[14];

    if (jeu[15] === "") {
        throw new Error("Erreur : le champ thèmes du jeu " + jeu[15] + " n'a pas le bon format");
    }
    let themes = jeu[15];

    if (jeu[16] === "") {
        throw new Error("Erreur : le champ tags du jeu " + jeu[16] + " n'a pas le bon format");
    }
    let tags = jeu[16];

    if (jeu[17] === "") {
        throw new Error("Erreur : le champ description du jeu " + jeu[17] + " n'a pas le bon format");
    }
    let description = jeu[17];

    if (jeu[18] === "") {
        throw new Error("Erreur : le champ image du jeu " + jeu[18] + " n'a pas le bon format");
    }
    let image = jeu[18];

    if (jeu[19] === "") {
        throw new Error("Erreur : le champ logo du jeu " + jeu[19] + " n'a pas le bon format");
    }
    let logo = jeu[19];

    if (jeu[20] === "") {
        throw new Error("Erreur : le champ vidéo du jeu " + jeu[20] + " n'a pas le bon format");
    }
    let video = jeu[20];


    return {
        idJeu,
        nom,
        auteur,
        editeur,
        nbJoueurs,
        ageMin,
        duree,
        type,
        notice,
        zonePlan,
        zoneBenevole,
        idZone,
        aAnimer,
        recu,
        mecanismes,
        themes,
        tags,
        description,
        image,
        logo,
        video,
    };
}