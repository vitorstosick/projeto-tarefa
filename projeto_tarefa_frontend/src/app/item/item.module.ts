import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ItemDetalheComponent } from './item-detalhe/item-detalhe.component';
import { ItemRoutingModule } from './item-routing.module';

@NgModule({
  declarations: [
    ItemDetalheComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ItemRoutingModule
  ]
})

export class ItemModule { }
