import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/Article';
import { ArticlesService } from 'src/app/services/articles.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-creer-article',
  templateUrl: './creer-article.component.html',
  styleUrls: ['./creer-article.component.scss'] 
})
export class CreerArticleComponent implements OnInit {

  articleForm: FormGroup;
  articles: Article[];
  articlesSubscription: Subscription;
  test: boolean;
  messageModal: string;
  displayMessageModal: boolean = false;
    

  constructor(private formBuilder: FormBuilder, private articlesService: ArticlesService,
     private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.test = false;
    this.articlesSubscription = this.articlesService.articleSubject.subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      }
    );
    this.articlesService.emitArticles();
  }
  

  initForm() {
    this.articleForm = this.formBuilder.group({
      libelArt: ['', Validators.required],
      categorieArt: ['', Validators.required],
      conditArt: ['', Validators.required],
      conditArtGros: [],
      prixAchat: ['', Validators.required],
      prixVente: ['', Validators.required],
      comHebd: ['', Validators.required],
      qteLot: ['', Validators.required]
     
    });   
  }

  ifArtExiste(nom: string): boolean{
    let test = this.test;
    this.articles.forEach(function (value) {
       if (value.libelArt === nom)
       { 
       test = true;
        
      }         
    });   
    return test;  
    
  }


  onSaveArticle() {
    const libelArt = this.articleForm.get('libelArt').value;
    const categorieArt = this.articleForm.get('categorieArt').value;
    const conditArt = this.articleForm.get('conditArt').value;
    const conditArtGros = this.articleForm.get('conditArtGros').value;
    const prixAchat = this.articleForm.get('prixAchat').value;
    const prixVente = this.articleForm.get('prixVente').value;
    const comHebd = this.articleForm.get('comHebd').value;
    const qteLot = this.articleForm.get('qteLot').value;
    if ((prixAchat<=0)||(prixVente<=0)||(comHebd<0)||(qteLot<1)) {
      this.buildMessageModal(
        'Les prix doivent être au-dessus de zéro, la quantité de lot est au moins égale à 1,' 
           + 'le stock hebdo ne peut pas être négative');
    }
    else { 
    const stockArt = 0;
    const newArticle = new Article();
    newArticle.libelArt = libelArt;
    newArticle.categorieArt = categorieArt;
    newArticle.conditArt = conditArt;
    newArticle.conditArtGros = conditArtGros;
    newArticle.stockArt = stockArt;
    newArticle.isCdeValid = true;
    newArticle.prixAchat = this.arrondir(prixAchat);
    newArticle.prixVente = this.arrondir(prixVente);
    newArticle.comHebd = this.arrondirEnt(comHebd);
    newArticle.qteLot = this.arrondirEnt(qteLot);
    if (this.articles.length>0) { 
    newArticle.idArt = this.articles[(this.articles.length - 1)].idArt + 1;
  } else  {
    newArticle.idArt = 0};
    this.test = this.ifArtExiste(newArticle.libelArt);
      if (this.test) {
        this.buildMessageModal('Article avec ce nom existe déjà');
    }
    else { 
    this.articlesService.createNewArticle(newArticle);    
    this.router.navigate(['/articles']);
  }
}
        
  }

  arrondir(nombre: number) { 
    let arrondi = nombre*100;         
    arrondi = Math.round(arrondi); 
    arrondi = arrondi/100;  
    return arrondi;      
  }

  arrondirEnt(nombre: number) {          
    let arrondi = Math.round(nombre);    
    return arrondi;      
  }

  buildMessageModal(msg: string){
    this.messageModal = msg;
    this.displayMessageModal = true;
}

onBack() {
  this.router.navigate(['/articles']);
}
 
}
