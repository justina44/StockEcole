import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { CreerArticleComponent } from './article/creer-article/creer-article.component';
import { ModifierArticleComponent } from './article/modifier-article/modifier-article.component';
import { DetailArticleComponent } from './article/detail-article/detail-article.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AchatComponent } from './achat/achat.component';
import { VenteComponent } from './vente/vente.component';
import { StockComponent } from './stock/stock.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ArticlesService } from './services/articles.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    CreerArticleComponent,
    ModifierArticleComponent,
    DetailArticleComponent,
    SignupComponent,
    SigninComponent,
    AchatComponent,
    VenteComponent,
    StockComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    ArticlesService,
    AuthService    
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
