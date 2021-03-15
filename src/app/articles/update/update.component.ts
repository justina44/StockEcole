import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  updateArticleForm: FormGroup;
  article: Article;
  id: number;
  messageModal: string;
  displayMessageModal: boolean = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private articlesService: ArticlesService,
   private router: Router) { }


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
  }

  initForm() {
    this.updateArticleForm = this.formBuilder.group({
      condDetNouv: [],
      condGrosNouv: [],
      prixVenteNouv: [],
      prixAchatNouv: [],
      qteLotNouv: [],
      stockMaxNouv: []
       
    }); 
  }


  onUpdateArticle() {
    let prixVente = this.updateArticleForm.get('prixVenteNouv').value;
    prixVente = this.arrondir(prixVente);
    let prixAchat = this.updateArticleForm.get('prixAchatNouv').value;
    prixAchat = this.arrondir(prixAchat);
    let qteLot = this.updateArticleForm.get('qteLotNouv').value;
    qteLot = this.arrondirEnt(qteLot);
    let maxStock = this.updateArticleForm.get('stockMaxNouv').value;
    maxStock = this.arrondirEnt(maxStock);
    let condGros = this.updateArticleForm.get('condGrosNouv').value;
    let condDet = this.updateArticleForm.get('condDetNouv').value;
    console.log(prixVente);
    console.log(prixAchat);
    console.log(qteLot);
    console.log(maxStock);
    console.log(condGros);
    console.log(condDet);



       if ((prixVente<=0)||(prixAchat<=0)||(qteLot<1)||(maxStock<1)) {
          this.buildMessageModal('Les prix et les quantités doivent être postifs');
       }
       else { 
    if ((prixVente!=0)&&(prixVente>0)) { 
      this.article.prixVente = prixVente;
    }else { 
      this.article.prixVente = this.article.prixVente;
    }
    if ((prixAchat!=0)&&(prixAchat>0)) { 
      this.article.prixAchat = prixAchat;
    }else { 
      this.article.prixAchat = this.article.prixAchat;
    }
    if ((qteLot!=0)&&(qteLot>=1)) { 
      this.article.qteLot = qteLot;
    }else { 
      this.article.qteLot = this.article.qteLot;
    }
    if (condGros!=null) { 
      this.article.conditArtGros = condGros;
    }else { 
      this.article.conditArtGros = this.article.conditArtGros;
    }
    if (condDet!=null) { 
      this.article.conditArt = condDet;
    }else { 
      this.article.conditArt = this.article.conditArt;
    }
    if ((maxStock!=0)&&(maxStock>=1)) { 
      this.article.comHebd = maxStock;
    }else { 
      this.article.comHebd = this.article.comHebd;
    }
    this.articlesService.updateArticle (this.id, this.article ); 
    this.router.navigate(['/articles']);     
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
