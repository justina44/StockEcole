import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Achat } from 'src/app/models/Achat';
import { Article } from 'src/app/models/Article';
import { Commande } from 'src/app/models/commande';
import { ArticlesService } from 'src/app/services/articles.service';
import { CommandesService } from 'src/app/services/commandes.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-commandes-valides',
  templateUrl: './commandes-valides.component.html',
  styleUrls: ['./commandes-valides.component.scss']
})
export class CommandesValidesComponent implements OnInit {

  searchComDate: string;
  headsTab2 = ['LIBELLE', 'NB LOTS', 'PAR', 'SEM'];
  articles: Article[];
  commandes:Commande[];
  commandeSubscription: Subscription;
  articleSubscription: Subscription;

  constructor(private router: Router, private commandesService: CommandesService, private articlesService: ArticlesService,
    private stockService: StockService) { }

  ngOnInit(): void {
    this.commandeSubscription = this.commandesService.commandeSubject.subscribe(
      (commandes: Commande[]) => {
            this.commandes = commandes;
          }
        );
    this.commandesService.emitCommandes(); 
    this.articleSubscription = this.articlesService.articleSubject.subscribe(
      (articles: Article[]) => {
            this.articles = articles;
          }
        );
        this.articlesService.emitArticles();
  }

  onValidCommande(commande:Commande, id:number){
    commande.isValid = true;
    let idArt = commande.artVendu.idArt;
    this.commandesService.updateCommande(id, commande);
    this.router.navigate(['/articles', 'change', idArt]);     
  }

  onUpdateCommande(id: number) {
    this.router.navigate(['/commandes', 'updateCom', id]);
  }

  onDeleteCommande(commande: Commande) {
    if (!commande.isValid) { 
    this.commandesService.removeCommande(commande);
  }
   }

  onBackCom() {
    this.router.navigate(['/commandes']);
  }

 

}
