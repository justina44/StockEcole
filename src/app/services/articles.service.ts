import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Subject } from 'rxjs';
import { Article } from '../models/Article';
import DataSnapshot = firebase.database.DataSnapshot;


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  articles: Article[] = [];
  articleSubject = new Subject<Article[]>();
  newArticle: Article;
  idArt: number;
   

  constructor() {
    this.getArticles();
    
   }

  emitArticles() {
    this.articleSubject.next(this.articles);
  }

  saveArticles() {
    firebase.database().ref('/articles').set(this.articles);
  }

  createNewArticle(newArticle: Article) {
    this.articles.push(newArticle);
    this.saveArticles();
    this.emitArticles();
  }

  getArticles() {
    firebase.database().ref('/articles')
    .on('value', (data: DataSnapshot) => {
        this.articles = data.val() ? data.val() : [];
        this.emitArticles();
      }
    );
    
  }

  updateArticle(id:number, article:Article){
    firebase.database().ref('/articles/' + id).update(article);
  }

  
  removeArticle(article: Article) {
    const articleIndexToRemove = this.articles.findIndex(
      (articleEl) => {
        if(articleEl === article) {
          return true;
        }
      }
    );
    this.articles.splice(articleIndexToRemove, 1);
    this.saveArticles();
    this.emitArticles();
  }

  getSingleArticle(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/articles/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
              }, (error) => {
            reject(error);
          }
        );
      }
    );

}

}
