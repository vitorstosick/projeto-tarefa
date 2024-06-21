import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TarefaListagemComponent } from "./tarefa-listagem/tarefa-listagem.component";
import { TarefaDetalheComponent } from "./tarefa-detalhe/tarefa-detalhe.component";

const routes: Routes = [
    { path: '', component: TarefaListagemComponent},
    { path: 'detalhe', component: TarefaDetalheComponent},
    { path: 'detalhe/:id', component: TarefaDetalheComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TarefaRoutingModule { }