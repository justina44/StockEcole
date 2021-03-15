import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table'


@NgModule({

  imports: [
  
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatTableModule
  
  ],
  
  exports: [
  
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule
  
  ]
  
  })
  
  export class MaterialModule {}