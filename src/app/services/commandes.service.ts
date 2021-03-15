import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Subject } from 'rxjs';
import { Commande } from '../models/commande';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class CommandesService {

  commandes: Commande[] = [];
  commandeSubject = new Subject<Commande[]>();
  newCommande: Commande;
  idCom: number;
   

  constructor() {
    this.getCommandes();  
   }

  emitCommandes() {
    this.commandeSubject.next(this.commandes);
  }

  saveCommandes() {
    firebase.database().ref('/commandes').set(this.commandes);
  }

  createNewCommande(newCommande: Commande) {
    this.commandes.push(newCommande);
    this.saveCommandes();
    this.emitCommandes();
  }

  getCommandes() {
    firebase.database().ref('/commandes')
    .on('value', (data: DataSnapshot) => {
        this.commandes = data.val() ? data.val() : [];
        this.emitCommandes();
      }
    );
    
  }

  updateCommande(id:number, commande:Commande){
    firebase.database().ref('/commandes/' + id).update(commande);
  }

  
  removeCommande(commande: Commande) {
    const commandeIndexToRemove = this.commandes.findIndex(
      (commandeEl) => {
        if(commandeEl === commande) {
          return true;
        }
      }
    );
    this.commandes.splice(commandeIndexToRemove, 1);
    this.saveCommandes();
    this.emitCommandes();
  }

  getSingleCommande(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/commandes/' + id).once('value').then(
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