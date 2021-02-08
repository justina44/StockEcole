import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HomeComponent } from './home/home.component';
import { CreerArticleComponent } from './article/creer-article/creer-article.component';
import { DetailArticleComponent } from './article/detail-article/detail-article.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './services/auth-guard.service';
import { ModifierArticleComponent } from './article/modifier-article/modifier-article.component';

const routes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'articles', component: HomeComponent },
  { path: 'article/new', canActivate: [AuthGuardService],component: CreerArticleComponent },
  { path: 'articles/view/:id', component: DetailArticleComponent },
  { path: 'articles/change/:id', component: ModifierArticleComponent },
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  { path: '**', redirectTo: 'articles' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
   
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
