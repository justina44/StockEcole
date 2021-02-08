import { Component } from '@angular/core';
import firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyAmX7M5mWVJOda7cm--cJe-TM0FuBn70Jo",
      authDomain: "stockecole.firebaseapp.com",
      projectId: "stockecole",
      databaseURL: 'https://stockecole-default-rtdb.europe-west1.firebasedatabase.app/',
      storageBucket: "stockecole.appspot.com",
      messagingSenderId: "1034699510258",
      appId: "1:1034699510258:web:976ee36546997d5e869b6b",
      measurementId: "G-9N9TY4CX3F"
    };
    firebase.initializeApp(firebaseConfig);
  }
}
