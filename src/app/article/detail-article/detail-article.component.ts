
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/Article';
import { Vente } from 'src/app/models/Vente';
import { ArticlesService } from 'src/app/services/articles.service';
import { StockService } from 'src/app/services/stock.service';


@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})
export class DetailArticleComponent implements OnInit {

  article: Article;
  code: String;
  ventes: Vente[];
  stockSubscription: Subscription;
  
 
  
  constructor(private route: ActivatedRoute, private articlesService: ArticlesService,
            private stockService: StockService,  private router: Router) { }

  ngOnInit(): void {
    this.article = new Article();       
    const id = this.route.snapshot.params['id'];
    this.articlesService.getSingleArticle(+id).then(
      (article: Article) => {
        this.article = article;
               
      }
          );
          this.stockSubscription = this.stockService.venteSubject.subscribe(
            (ventes: Vente[]) => {
                  this.ventes = ventes;
                }
              );
              this.stockService.emitVentes();        }
       
  

  calcVenteTotal(): number {
    const code = this.article.idArt;
    let total:number = 0;
    this.ventes.forEach(function (value) {
      if (value.artVendu.idArt == code) { 
      total = total + value.quantVente;      
          }      
    });      
    return total;
      
  }

  calcCATotal(): number {
    let total:number = 0;
    const code = this.article.idArt;
    this.ventes.forEach(function (value) {
      if (value.artVendu.idArt == code) { 
     total = total + value.quantVente*value.artVendu.prixVente;  
      }          
    });   
    total=this.arrondir(total);
    return total;    
  }

  calcBenefTotal(): number {
    let total:number = 0;
    const code = this.article.idArt;
    this.ventes.forEach(function (value) {
         
      if (value.artVendu.idArt == code) { 
        let prixAchDet = value.artVendu.prixAchat/value.artVendu.qteLot;
     total = total + value.quantVente*(value.artVendu.prixVente-prixAchDet); 
    
      }         
    });   
     total=this.arrondir(total);
     return total;    
  }

  calcQteGros() {
   return this.arrondir( this.article.stockArt/this.article.qteLot);
  }

  arrondir(nombre: number) { 
    let arrondi = nombre*100;         
    arrondi = Math.round(arrondi); 
    arrondi = arrondi/100;  
    return arrondi;      
  }

  onStatArticle(id: number) {
    this.router.navigate(['/articles', 'stats', id]);
  }

  onAcheterVendre(id: number) {
    this.router.navigate(['/articles', 'change', id]);
  }

  onBack() {
    this.router.navigate(['/articles']);
  }

   
  getColor() {
    if(this.article.categorieArt === 'Boisson') {
      return 'red';
    } else if (this.article.categorieArt === 'Chocolat')  {
      return '#42A948';
    }
    else if (this.article.categorieArt === 'Bonbon')  {
      return '#ee7606e5';
    }
}


}