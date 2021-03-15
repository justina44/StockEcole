import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from '../models/Article';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articles: Article[];
  articlesSubscription: Subscription;

  constructor(private articlesService: ArticlesService, private router: Router) { }

  ngOnInit(): void {
    this.articlesSubscription = this.articlesService.articleSubject.subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      }
    );
    this.articlesService.emitArticles();
  }

  onNewArticle() {
    this.router.navigate(['/articles', 'new']);
  }

  onDeleteArticle(article: Article) {
    this.articlesService.removeArticle(article);
   }

   onViewArticle(id: number) {
     this.router.navigate(['/articles', 'view', id]);
   }

   onStockArticle(id: number) {
    this.router.navigate(['/articles', 'change', id]);
  }

  onStatArticle(id: number) {
    this.router.navigate(['/articles', 'stats', id]);
  }

  onUpdateArticle(id: number) {
    this.router.navigate(['/articles', 'update', id]);
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

   ngOnDestroy() {
     this.articlesSubscription.unsubscribe();
   }

}
