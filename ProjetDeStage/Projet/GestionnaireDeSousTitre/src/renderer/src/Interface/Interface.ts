export interface JsonLigne {
    ligne_id_interne: number;
    ligne_id: number;
    ligne_timecode_Debut: string;
    ligne_timecode_Fin: string;
    ligne_z_index: number;
    ligne_texte: string;
    version_id: number;
    ligne_couleur: string;
    ligne_couleur_hexa: string;
    personnage_id: number|undefined|null;
    version: JsonVersion;
    personnage: JsonPersonnage
}

export interface JsonVersion{
    version_id: number;
    version_nom: string;
    langue: JsonLangue;
}

export interface JsonLangue{
    langue_id: number|undefined;
    langue_nom: string;
}

export interface JsonPersonnage{
    personnage_id: number|undefined;
    personnage_nom: string;
}

export interface JsonCouleur{
    nom: string;
    code: string;
}