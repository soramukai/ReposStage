export interface JsonPersonnageLangueCouleur {
    id: number;
    nom: string;
}

export interface JsonVersion {
    id: number;
    nom: string;
    langue_id: number;
}

export interface JsonLigne {
    id: number;
    timeCodeDebut: string;
    timeCodeFin: string;
    zIndex: number;
    texte: string;
    couleur: string;
    couleurHexa: string;
    versionId: number;
    personnageId: number;
}