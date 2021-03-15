import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { cpuUsage } from 'process';
import { Subscription } from 'rxjs';
import { Article } from '../models/Article';
import { Vente } from '../models/Vente';
import { ArticlesService } from '../services/articles.service';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-calculs',
  templateUrl: './calculs.component.html',
  styleUrls: ['./calculs.component.scss']
})
export class CalculsComponent implements OnInit {
  
  quantVente:number = 0;
  dateForm: FormGroup;
  dateForm2: FormGroup;
  minDate: Date;
  maxDate: Date;
  article: Article;
  total: number;
  totalCA: number = 0;
  totalBen: number = 0;
  id: number;
  articles: Article[];
  headsTab = ['LIBELLE', 'CATEGORIE', 'CA', 'BENEFICE'];
  ventes: Vente[]; 
  activCalcul: boolean;
  isNoResult: boolean = false;
  isFormSubmitted: boolean = false;
  stockSubscription: Subscription;
  articleSubscription: Subscription;

  constructor(private formBuilder:FormBuilder, private route: ActivatedRoute, private articlesService: ArticlesService,
    private stockService: StockService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.article = new Article();       
    const id = this.route.snapshot.params['id'];
    this.articlesService.getSingleArticle(+id).then(
      (article: Article) => {
        this.article = article;   
        this.id = id;         
      }
          );
    this.activCalcul = false;   
    this.articleSubscription = this.articlesService.articleSubject.subscribe(
      (articles: Article[]) => {
            this.articles = articles;
          }
        );
        this.articlesService.emitArticles();

    
  this.stockSubscription = this.stockService.venteSubject.subscribe(
          (ventes: Vente[]) => {
                this.ventes = ventes;
              }
            );
            this.stockService.emitVentes();
      }  

      initForm() {
       
        this.dateForm = this.formBuilder.group({
          dateVenteMin: [, Validators.required],
          dateVenteMax: [, Validators.required]
         
        }); 
        this.dateForm2 = this.formBuilder.group({
          dateVenteMin: [, Validators.required],
          dateVenteMax: [, Validators.required]    
        });   
      }

afficher() {
  this.isFormSubmitted = true;
  const dateVenteMin = this.dateForm.get('dateVenteMin').value;
  const dateVenteMax = this.dateForm.get('dateVenteMax').value; 
         this.minDate = new Date(dateVenteMin);
        this.maxDate = new Date(dateVenteMax);           
  
}

  calcCA(code:number) {
    let minDate = this.minDate; 
    let maxDate = this.maxDate;
    let totalCA:number = 0;
    let ventes = this.ventes;
   
    ventes.forEach(function (value)
     { 
       let newDate = new Date(value.dateVente);          
      if (((newDate>=minDate)&&(newDate<=maxDate))&&(value.artVendu.idArt == code))  {
     totalCA = totalCA + value.quantVente*value.venduAPrix;     
        }  
    }); 
  
    totalCA = this.arrondir(totalCA); 
    return totalCA;         
         }

  
  calcBen(code:number) {
    let minDate = this.minDate; 
    let maxDate = this.maxDate;
    let totalBen:number = 0;
    let ventes = this.ventes;
    
    ventes.forEach(function (value) { 
      let newDate = new Date(value.dateVente);
      let prixAchDet = value.artVendu.prixAchat/value.artVendu.qteLot;
      if (((newDate>=minDate)&&(newDate<=maxDate))&&(value.artVendu.idArt == code))  {
    totalBen = totalBen + value.quantVente*(value.venduAPrix-prixAchDet);
      }  
    });   
    totalBen = this.arrondir(totalBen);
    return totalBen;    
  }   

  calcVenteDate() : number {
    this.activCalcul = true;
    const code = this.article.idArt;
    
    const dateVenteMin = this.dateForm2.get('dateVenteMin').value;
    const dateVenteMax = this.dateForm2.get('dateVenteMax').value;
    console.log(dateVenteMax);
    let minDate = new Date(dateVenteMin);
    let maxDate = new Date(dateVenteMax);
    let total:number = 0;
    
    this.ventes.forEach(function (value) {
      let newDate = new Date(value.dateVente); 
      if (((newDate>=minDate)&&(newDate<=maxDate))&&(value.artVendu.idArt == code))  {
         
      total = total + value.quantVente;
           
      }                   
    });   
    this.total = total;
    return this.total;    
  }

  onNouvCalc() {
    this.activCalcul = false;
    this.isFormSubmitted = false;
  }

  getColor(id: number) {
    if(this.articles[id].categorieArt === 'Boisson') {
      return 'red' ;
    } else if (this.articles[id].categorieArt === 'Chocolat'){
      return '#42A948';
    } else if (this.articles[id].categorieArt === 'Bonbon'){
      return '#ee7606e5';
    }
  }

arrondir(nombre: number) { 
  let arrondi = nombre*100;         
  arrondi = Math.round(arrondi); 
  arrondi = arrondi/100;  
  return arrondi;      
}

onBack() {
  this.router.navigate(['/articles']);
}

onArtDet(id: number) {
  this.router.navigate(['/articles', 'view', id]);
}


}

