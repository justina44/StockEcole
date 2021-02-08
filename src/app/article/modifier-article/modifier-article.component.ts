import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Achat } from 'src/app/models/Achat';
import { Article } from 'src/app/models/Article';
import { Vente } from 'src/app/models/Vente';
import { ArticlesService } from 'src/app/services/articles.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-modifier-article',
  templateUrl: './modifier-article.component.html',
  styleUrls: ['./modifier-article.component.scss']
})
export class ModifierArticleComponent implements OnInit {

  achatForm: FormGroup;
  venteForm: FormGroup;
  dateForm: FormGroup;
  quantAchat:number = 0;
  quantVente:number = 0;
  dateVente:number;
  dateAchat:number;
  article: Article;
  id: number;
  quantAchTotal:number = 0;
  achats: Achat[];
  ventes: Vente[];   
  total = 0;
  activCalcul: boolean;
  stockSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private articlesService: ArticlesService,
    private stockService: StockService, private router: Router) { }

  ngOnInit(): void {
    this.initForm(); 
    this.activCalcul = false;
    this.article = new Article();       
    const id = this.route.snapshot.params['id'];
    this.articlesService.getSingleArticle(+id).then(
      (article: Article) => {
        this.article = article;   
        this.id = id; 
        
      }
          );

    this.stockSubscription = this.stockService.achatSubject.subscribe(
        (achats: Achat[]) => {
              this.achats = achats;
            }
          );
          this.stockService.emitAchats();

    this.stockSubscription = this.stockService.venteSubject.subscribe(
            (ventes: Vente[]) => {
                  this.ventes = ventes;
                }
              );
              this.stockService.emitVentes();
        }
          
  

  initForm() {
    this.achatForm = this.formBuilder.group({
      quantAchat: [, Validators.required]    
    }); 
    this.venteForm = this.formBuilder.group({
      quantVente: [, Validators.required]    
    }); 
    this.dateForm = this.formBuilder.group({
      dateVenteMin: [, Validators.required],
      dateVenteMax: [, Validators.required]    
    });          
  }

  
  onSaveAchat () {
    this.quantAchat = this.achatForm.get('quantAchat').value;
    const newAchat = new Achat();
    newAchat.quantAchat = this.quantAchat;
    this.dateAchat = Date.now();   
    newAchat.dateAchat = this.dateAchat;
    this.onUpdate();
    newAchat.artAchete = this.article;
    this.stockService.makeNewAchat(newAchat);  
    this.router.navigate(['/articles']);
        
  }

  onSaveVente () {
    this.quantVente = this.venteForm.get('quantVente').value;
    if (this.quantVente>this.article.stockArt) {
      console.log("la quantité n'est pas suffisante");
    } else {

    const newVente = new Vente();
    newVente.quantVente = this.quantVente;
    this.dateVente = Date.now();   
    newVente.dateVente = this.dateVente;
    this.onUpdate();
    newVente.artVendu = this.article;
    this.stockService.makeNewVente(newVente);  
    this.router.navigate(['/articles']);
    }     
  }

  onUpdate() {
    this.article.stockArt = this.article.stockArt+this.quantAchat-this.quantVente;
    this.articlesService.updateArticle (this.id, this.article );  
    
  }

  calcVenteTotal(): number {
    const code = this.article.codeArt;
    let total:number = 0;
    this.ventes.forEach(function (value) {
      if (value.artVendu.codeArt == code) { 
      total = total + value.quantVente;
          }      
    });   
    
    return total;
    
  }

  calcCATotal(): number {
    let total:number = 0;
    const code = this.article.codeArt;
    this.ventes.forEach(function (value) {
      if (value.artVendu.codeArt == code) { 
     total = total + value.quantVente*value.artVendu.prixVente;
      }          
    });   
    total=this.arrondir(total);
    return total;    
  }

  calcBenefTotal(): number {
    let total:number = 0;
    const code = this.article.codeArt;
    this.ventes.forEach(function (value) {
      if (value.artVendu.codeArt == code) { 
     total = total + value.quantVente*(value.artVendu.prixVente-value.artVendu.prixAchat); 
    
      }         
    });   
     total=this.arrondir(total);
     return total;    
  }

  arrondir(nombre: number) { 
  let arrondi = nombre*100;         
  arrondi = Math.round(arrondi); 
  arrondi = arrondi/100;  
  return arrondi;      
}



  calcVenteDate() : number {
    this.activCalcul = true;
    const code = this.article.codeArt;
    const dateVenteMin = this.dateForm.get('dateVenteMin').value;
    const dateVenteMax = this.dateForm.get('dateVenteMax').value;
    let minDate = new Date(dateVenteMin);
    let maxDate = new Date(dateVenteMax);
    let total:number = 0;
    
    this.ventes.forEach(function (value) {
      let newDate = new Date(value.dateVente);
      
      if (((newDate>=minDate)&&(newDate<=maxDate))&&(value.artVendu.codeArt == code))    {
        total = total + value.quantVente;
        
      }
                   
    });   
    this.total = total;
    return this.total;    
  }

  onNouvCalc() {
    this.activCalcul = false;
  }

  onBack() {
    this.router.navigate(['/articles']);
  }


}
