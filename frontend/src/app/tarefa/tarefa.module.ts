import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefaListagemComponent } from './tarefa-listagem/tarefa-listagem.component';
import { FormsModule } from '@angular/forms';
import { TarefaRoutingModule } from './tarefa-routing.module';
import { TarefaDetalheComponent } from './tarefa-detalhe/tarefa-detalhe.component';


@NgModule({
  declarations: [
    TarefaListagemComponent,
    TarefaDetalheComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TarefaRoutingModule
  ]
})

export class TarefaModule { }
