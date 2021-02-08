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
      codeArt: ['', Validators.required],
      libelArt: ['', Validators.required],
      categorieArt: ['', Validators.required],
      conditArt: ['', Validators.required],
      prixAchat: ['', Validators.required],
      prixVente: ['', Validators.required],
     
    });
   
  }

  ifArtExiste(code: string): boolean{
    let test = this.test;
    this.articles.forEach(function (value) {
       if (value.codeArt === code)
       { 
       test = true;
        
      }         
    });   
    return test;  
    
  }


  onSaveArticle() {
    const codeArt = this.articleForm.get('codeArt').value;
    const libelArt = this.articleForm.get('libelArt').value;
    const categorieArt = this.articleForm.get('categorieArt').value;
    const conditArt = this.articleForm.get('conditArt').value;
    const prixAchat = this.articleForm.get('prixAchat').value;
    const prixVente = this.articleForm.get('prixVente').value;
    const stockArt = 0;
    const newArticle = new Article();
    newArticle.codeArt = codeArt;
    newArticle.libelArt = libelArt;
    newArticle.categorieArt = categorieArt;
    newArticle.conditArt = conditArt;
    newArticle.stockArt = stockArt;
    newArticle.prixAchat = prixAchat;
    newArticle.prixVente = prixVente;
    this.test = this.ifArtExiste(newArticle.codeArt);
      if (this.test) {
      console.log("cette article existe déjà");
    }
    else { 
    this.articlesService.createNewArticle(newArticle);    
    this.router.navigate(['/articles']);
  }
        
  }
 
}
