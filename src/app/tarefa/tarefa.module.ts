import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefaListagemComponent } from './tarefa-listagem/tarefa-listagem.component';
import { FormsModule } from '@angular/forms';
import { TarefaRoutingModule } from './tarefa-routing.module';



@NgModule({
  declarations: [
    TarefaListagemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TarefaRoutingModule
  ]
})
export class TarefaModule { }
