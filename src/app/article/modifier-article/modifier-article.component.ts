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

  achatFormGros: FormGroup;
  venteFormGros: FormGroup;
  achatFormDet: FormGroup;
  venteFormDet:FormGroup;
  quantVente:number = 0;
  quantAchat:number = 0;
  dateVente:number;
  dateAchat:number;
  prixVente:number;
  article: Article;
  id: number;
  quantAchTotal:number = 0;
  achats: Achat[];
  ventes: Vente[];   
  stockSubscription: Subscription;
  messageModal: string;
  displayMessageModal: boolean = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private articlesService: ArticlesService,
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
              this.stockService.emitVentes();        }
          
  

  initForm() {
    this.achatFormGros = this.formBuilder.group({
      quantAchatGros: []             
    }); 

    this.achatFormDet = this.formBuilder.group({
      quantAchatDet: []             
    }); 

    this.venteFormGros = this.formBuilder.group({
      prixVenteGros: [],
      quantVenteGros: []        
    }); 

    this.venteFormDet = this.formBuilder.group({
      prixVenteDet: [],
      quantVenteDet: []        
    });      
    
  }

  onAchat() {
    let quantAchatGros = this.achatFormGros.get('quantAchatGros').value;
    quantAchatGros = this.arrondirEnt(quantAchatGros*this.article.qteLot);
    let quantAchatDet = this.achatFormDet.get('quantAchatDet').value;
    quantAchatDet = this.arrondirEnt(quantAchatDet);
    if (quantAchatGros>0)
    {this.quantAchat = quantAchatGros;    
  }
    if (quantAchatDet>0) {
      this.quantAchat = quantAchatDet;      
    }
    if (this.quantAchat<=0) {
      this.buildMessageModal("Merci de sasir un nombre positif");
      }
      else {
        const newAchat = new Achat(); 
        this.dateAchat = Date.now();    
        newAchat.dateAchat = this.dateAchat
         newAchat.quantAchat = this.quantAchat;
        this.onUpdate();
        newAchat.artAchete = this.article;
        this.stockService.makeNewAchat(newAchat); 
        this.router.navigate(['/articles']);        
      }
  }

  onVente() {
    let quantVenteGros = this.venteFormGros.get('quantVenteGros').value;
    quantVenteGros = this.arrondirEnt(quantVenteGros*this.article.qteLot);    
    let prixVenteGros = this.venteFormGros.get('prixVenteGros').value;
    prixVenteGros = this.arrondirEnt(prixVenteGros/this.article.qteLot);

    let quantVenteDet = this.venteFormDet.get('quantVenteDet').value;
    quantVenteDet = this.arrondirEnt(quantVenteDet);
    let prixVenteDet = this.venteFormDet.get('prixVenteDet').value;
    prixVenteDet = this.arrondirEnt(prixVenteDet);

    if (quantVenteGros*this.article.qteLot>this.article.stockArt) {
      this.buildMessageModal("la quantité n'est pas disponible au stock");
     } 
     
    else if (quantVenteGros>0)  {
    this.quantVente = quantVenteGros;
    if (prixVenteGros>0) { 
    this.prixVente = prixVenteGros/this.article.qteLot;
  }
}
  if (quantVenteDet>this.article.stockArt) {
    this.buildMessageModal("la quantité n'est pas disponible au stock");
   } 
    else if (quantVenteDet>0) {
      this.quantVente = quantVenteDet;
      if (prixVenteDet>0) { 
      this.prixVente = prixVenteDet;
    }
    }
   
    if (this.quantVente<=0) {
      this.buildMessageModal("Merci de sasir un nombre positif");
    }
       else {
        this.dateVente = Date.now();
        const newVente = new Vente();
        newVente.quantVente = this.quantVente;   
        newVente.dateVente = this.dateVente; 
        if (this.prixVente>0){
          newVente.venduAPrix = this.prixVente;
        } else { 
        newVente.venduAPrix = this.article.prixVente;
      }
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

  arrondirEnt(nombre: number) {          
    let arrondi = Math.round(nombre);    
    return arrondi;      
  }

  arrondir(nombre: number) { 
    let arrondi = nombre*100;         
    arrondi = Math.round(arrondi); 
    arrondi = arrondi/100;  
    return arrondi;      
  }
   
  buildMessageModal(msg: string){
    this.messageModal = msg;
    this.displayMessageModal = true;
}

onArtDet(id: number) {
  this.router.navigate(['/articles', 'view', id]);
}

  onBack() {
    this.router.navigate(['/articles']);
  }

  onCommande() {
    this.router.navigate(['/commandes', 'validCom']);
  }
 


}
