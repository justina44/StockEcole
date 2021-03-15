import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModifierArticleComponent } from '../article/modifier-article/modifier-article.component';
import { Article } from '../models/Article';
import { Commande } from '../models/commande';
import { ArticlesService } from '../services/articles.service';
import { CommandesService } from '../services/commandes.service';


@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {

  articles: Article[];
  commandes: Commande[];
  headsTab = ['ARTICLE', 'LIVRE PAR', 'CAT', 'QTE', 'STOCK', 'COMMANDE', ''];
  articleSubscription: Subscription;
  commandeSubscription: Subscription;
  today = Date.now();
  searchComDate: string;
  messageModal: string;
  displayMessageModal: boolean;
 

  constructor(private articlesService: ArticlesService, 
    private commandesService: CommandesService, private router: Router) { }

  ngOnInit(): void {
    this.articleSubscription = this.articlesService.articleSubject.subscribe(
      (articles: Article[]) => {
            this.articles = articles;
          }
        );
        this.articlesService.emitArticles();
        
     this.commandeSubscription = this.commandesService.commandeSubject.subscribe(
          (commandes: Commande[]) => {
                this.commandes = commandes;
              }
            );
        this.commandesService.emitCommandes();            
  }

  calculStockGros(article: Article) {
    let stockGros;
    stockGros = article.stockArt/article.qteLot;
    stockGros = this.arrondir(stockGros);
    return stockGros;
  }
    
  calculCommande(article: Article) {
   let aCommander: number;
   let stockGros = this.calculStockGros(article);
   aCommander = article.comHebd - stockGros;
   if (aCommander<0){
     aCommander = 0;
   }
   return aCommander;
  }

  onCommande(article:Article){
    let qteCommandee = this.calculCommande(article); 
    if (qteCommandee<=0) {
      this.buildMessageModal("La valeur doit être positive");
    }
   
    else {
    const com = new Commande;
    com.artVendu = article;
    com.isValid = false;
    com.dateCommande = Date.now();
    com.quantCommande = qteCommandee; 
    com.nbUnitLot = article.qteLot;
    this.commandesService.createNewCommande(com);
    this.buildMessageModal("La nouvelle commande est créée");
      
    }
  }

  arrondir(nombre: number) {          
    let arrondi = Math.round(nombre);    
    return arrondi;      
  }


  commandesVisibles(){
    this.router.navigate(['/commandes', 'validCom']);
}

isWrongDate(article: Article){
   let res = article.comHebd-article.stockArt; 
   if (res<=0) { 
   return true;  
  }
}

buildMessageModal(msg: string){
  this.messageModal = msg;
  this.displayMessageModal = true;
}
  

} 
