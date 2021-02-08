
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { ArticlesService } from 'src/app/services/articles.service';


@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})
export class DetailArticleComponent implements OnInit {

  article: Article;
  code: String;
  
 
  
  constructor(private route: ActivatedRoute, private articlesService: ArticlesService,
               private router: Router) { }

  ngOnInit(): void {
    this.article = new Article();       
    const id = this.route.snapshot.params['id'];
    this.articlesService.getSingleArticle(+id).then(
      (article: Article) => {
        this.article = article;
        this.code = article.codeArt;

        
      }
          );
          
  }

  onBack() {
    this.router.navigate(['/articles']);
  }

   


}