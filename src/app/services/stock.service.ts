import { Injectable } from '@angular/core';
import {Subject } from 'rxjs';
import firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { Achat } from '../models/Achat';
import { Vente } from '../models/Vente';

@Injectable({
  providedIn: 'root'
})
export class StockService {

 
  achats: Achat[] = [];
  ventes: Vente[] = [];
  achatSubject = new Subject<Achat[]>();
  venteSubject = new Subject<Vente[]>();
  

  constructor() {
    this.getAchats();
    this.getVentes();
    
   }

  emitAchats() {
    this.achatSubject.next(this.achats);
  }

  emitVentes() {
    this.venteSubject.next(this.ventes);
  }

  getAchats() {
    firebase.database().ref('/achats')
    .on('value', (data: DataSnapshot) => {
        this.achats = data.val() ? data.val() : [];
        this.emitAchats();
      }
    );
  }

  getVentes() {
    firebase.database().ref('/ventes')
    .on('value', (data: DataSnapshot) => {
        this.ventes = data.val() ? data.val() : [];
        this.emitVentes();
      }
    );
  }

    
  saveAchats() {
    firebase.database().ref('/achats').set(this.achats);
  }

    
  saveVentes() {
    firebase.database().ref('/ventes').set(this.ventes);
  }

  makeNewAchat(newAchat: Achat) {
    this.achats.push(newAchat);
    this.saveAchats();
    this.emitAchats();
  }

  makeNewVente(newVente: Vente) {
    this.ventes.push(newVente);
    this.saveVentes();
    this.emitVentes();
  }
  
  }
  


