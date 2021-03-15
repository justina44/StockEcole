import { Article } from "./Article";

export class Commande {

    dateCommande: number;
    quantCommande: number;
    nbUnitLot: number;
    isValid: boolean;
    artVendu: Article = new Article();

}