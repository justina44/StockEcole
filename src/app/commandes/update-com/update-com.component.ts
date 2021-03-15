import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Commande } from 'src/app/models/commande';
import { CommandesService } from 'src/app/services/commandes.service';

@Component({
  selector: 'app-update-com',
  templateUrl: './update-com.component.html',
  styleUrls: ['./update-com.component.scss']
})
export class UpdateComComponent implements OnInit {
  updateCommandeForm: FormGroup;
  commande: Commande;
  id:number;
  messageModal: string;
  displayMessageModal: boolean = false;

  constructor(private formBuilder: FormBuilder, private commandesService: CommandesService,
    private route: ActivatedRoute, private router: Router)
   { }

  ngOnInit(): void {

    this.initForm(); 
    this.commande = new Commande();       
    const id = this.route.snapshot.params['id'];
    this.commandesService.getSingleCommande(+id).then(
      (commande: Commande) => {
        this.commande = commande;   
        this.id = id;         
      }
          );
  }

  initForm() {
    this.updateCommandeForm = this.formBuilder.group({
      quantCom: [],
      quantLot: []          
    });   
  }

  onUpdateCom(){
    let quantCom = this.updateCommandeForm.get('quantCom').value;
    quantCom = this.arrondirEnt(quantCom);
    let quantLot = this.updateCommandeForm.get('quantLot').value;
    quantLot = this.arrondirEnt(quantLot);
    if (quantCom>0) {
    this.commande.quantCommande = quantCom;
    this.commande.nbUnitLot = quantLot;
    this.commandesService.updateCommande (this.id, this.commande ); 
    this.router.navigate(['/commandes']);     
      }
      else {
        this.buildMessageModal('La quantité ne peut pas être zéro ou négative');
      }
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
      this.router.navigate(['/commandes/validCom']);
    }

    }

