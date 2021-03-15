import { PipeTransform, Pipe } from "@angular/core";
import { Commande } from "../models/commande";

@Pipe({
    name: 'commandeFilter'
})

export class CommandeFilterPipe implements PipeTransform {
    transform (commandes: Commande[], searchComDate: string): Commande [] {
        if (!commandes||!searchComDate) {
            return commandes;
        }
        return commandes.filter(commandes =>
            commandes.artVendu.libelArt == searchComDate);
    }
}

