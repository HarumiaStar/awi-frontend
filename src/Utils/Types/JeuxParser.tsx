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
export async function jeuxParserFichier(fichier: File) {
    let reader = new FileReader();
    reader.readAsText(fichier);
    let data: string[] = [];

    // return le résultat de la fonction après l'exécution de la fonction onload
    return new Promise<Jeu[]>((resolve, reject) => {
        reader.onload = function () {
            if (reader.result === null) {
                reject("Erreur : le fichier csv n'a pas le bon format");
            }

            let lines = reader.result?.toString().split(endOfLine);
            if (lines) {
                lines.forEach((line) => {
                    data.push(line);
                });
            }

            resolve(jeuxParser(data));
        };

        reader.onerror = function () {
            reject("Erreur : le fichier csv n'a pas le bon format");
        };
    });
}

/**
 * Fonction qui parse un fichier csv de jeux
 * @param data : données du fichier csv à parser
 * @returns : tableau de jeux
 * @throws : erreur si le fichier csv n'a pas le bon format
 */
export function jeuxParser(data: string[]) {

    if (data === undefined) {
        throw new Error("Erreur : la donnée est undefined");
    }
    
    if (data.length === 0) {
        throw new Error("Erreur : il n'y a pas de données");
    }

    let headerRecu = validationHeader(data[0]);
    if (headerRecu === null) {
        throw new Error("Erreur : le fichier csv n'a pas le bon format");
    }



    let jeux: Jeu[] = [];

    for (let i = 1; i < data.length; i++) {
        if (data[i] === "") {
            continue;
        }
        // Retirer le \r à la fin de la ligne
        data[i] = data[i].replace("\r", "");

        // Split la ligne en tableau de string en fonction du séparateur et prendre en compte les guilllemets permettant de mettre des séparateurs dans les données
        let jeu = separerLigne(data[i], separator, '"');
        

        jeux.push(validationJeu(jeu));
    }

    return jeux;
}

export function validationHeader(headerRecu: string): string[] {
    // Retirer le \r à la fin de la ligne
    headerRecu = headerRecu.replace("\r", "");
    if(headerRecu === undefined) {
        throw new Error("Erreur : le header est undefined");
    }

    if (headerRecu === "") {
        throw new Error("Erreur : le header n'a pas le bon format");
    }
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

    console.log(jeu);


    if (jeu.length !== nbKey) {
        throw new Error("Erreur : le jeu n'a pas le bon format");
    }

    let idJeu = parseOrFailNumber(jeu[0]);
    let nom = parseOrFailString(jeu[1]);
    let auteur = parseOrUndefinedString(jeu[2]);
    let editeur = parseOrFailString(jeu[3]);
    let nbJoueurs = parseOrFailString(jeu[4]);
    let ageMin = parseOrFailNumber(jeu[5]);
    let duree = parseOrUndefinedNumber(jeu[6]);
    let type = parseTypeJeu(jeu[7]);
    let notice = parseOrUndefinedLien(jeu[8]);
    let zonePlan = parseOrFailString(jeu[9]);
    let zoneBenevole = parseOrUndefinedString(jeu[10]);
    let idZone = parseOrFailNumber(jeu[11]);
    let aAnimer = parseOrFailBoolean(jeu[12]);
    let recu = parseOrFailBoolean(jeu[13]);
    let mecanismes = parseOrFailString(jeu[14]);
    let themes = parseOrFailString(jeu[15]);
    let tags = parseOrFailString(jeu[16]);
    let description = parseOrFailString(jeu[17]);
    let image = parseOrFailLien(jeu[18]);
    let logo = parseOrFailLien(jeu[19]);
    let video = parseOrFailLien(jeu[20]);


    const resJeu : Jeu = {
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


    return resJeu;
}

function parseOrUndefinedString(str: string): string | undefined {
    if (str === "") {
        return undefined;
    }
    return str;
}

function parseOrUndefinedLien(str: string): Lien | undefined {
    if (str === "") {
        return undefined;
    }
    return str;
}

function parseOrUndefinedNumber(str: string): number | undefined {
    if (str === "") {
        return undefined;
    }
    return parseInt(str);
}

function parseOrFailString(str: string): string {
    if (str === "") {
        throw new Error("Erreur : la donnée fournie n'a pas le bon format : " + str);
    }
    return str;
}

function parseOrFailLien(str: string): Lien {
    if (str === "") {
        throw new Error("Erreur : la donnée fournie n'a pas le bon format : " + str);
    }
    return str;
}

function parseOrFailNumber(str: string): number {
    if (str === "") {
        throw new Error("Erreur : la donnée fournie n'a pas le bon format : " + str);
    }
    return parseInt(str);
}

function parseOrFailBoolean(str: string): boolean {
    if (str === "") {
        throw new Error("Erreur : la donnée fournie n'a pas le bon format : " + str);
    }
    return str === "oui";
}




/**
 * Fonction pour séparer une ligne en fonction du séparateur tout en ignorant les séparateurs entre guillemets.
 * @param ligne : ligne à séparer
 * @param separateur : séparateur utilisé (par exemple, ";")
 * @returns Un tableau de chaînes résultant de la séparation
 */
export function separerLigne(ligne: string, separateur: string, ignore: string): string[] {
    const result: string[] = [];
    let champActuel = '';

    for (let i = 0; i < ligne.length; i++) {
        const caractere = ligne[i];

        if (caractere === ignore) {
            // Si nous rencontrons un guillemet, ignorer les séparateurs jusqu'au prochain guillemet
            const prochainGuillemet = ligne.indexOf(ignore, i + 1);
            if (prochainGuillemet !== -1) {
                champActuel += ligne.substring(i + 1, prochainGuillemet);
                i = prochainGuillemet;
            } else {
                // Gestion d'une paire de guillemets non fermée (c'est à vous de définir le comportement souhaité)
                console.error("Erreur : Paire de guillemets non fermée");
            }
        } else if (caractere === separateur) {
            // Si nous rencontrons le séparateur en dehors des guillemets, ajouter le champ au tableau résultant
            result.push(champActuel);
            champActuel = '';
        } else {
            // Ajouter le caractère au champ actuel
            champActuel += caractere;
        }
    }

    // Ajouter le dernier champ au tableau résultant
    result.push(champActuel);

    return result;
}
