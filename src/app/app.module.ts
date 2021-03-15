import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';

import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { CreerArticleComponent } from './article/creer-article/creer-article.component';
import { ModifierArticleComponent } from './article/modifier-article/modifier-article.component';
import { DetailArticleComponent } from './article/detail-article/detail-article.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { ArticlesService } from './services/articles.service';
import { CalculsComponent } from './calculs/calculs.component';
import { CommandesComponent } from './commandes/commandes.component';
import { UpdateComponent } from './articles/update/update.component';
import { UpdateComComponent } from './commandes/update-com/update-com.component';
import { CommandeFilterPipe } from './commandes/commande-filter.pipe';
import { StockService } from './services/stock.service';
import { CommandesService } from './services/commandes.service';
import { MessageModalComponent } from './message-modal/message-modal.component';
import { SortByPipe } from './commandes/sort-by.pipe';
import { CommandesValidesComponent } from './commandes/commandes-valides/commandes-valides.component';

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
    HeaderComponent,
    CalculsComponent,
    CommandesComponent,
    UpdateComponent,
    UpdateComComponent,
    CommandeFilterPipe,
    SortByPipe,
    MessageModalComponent,
    CommandesValidesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    AuthService,
    ArticlesService,
    StockService,
    CommandesService,
    AuthService    
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
