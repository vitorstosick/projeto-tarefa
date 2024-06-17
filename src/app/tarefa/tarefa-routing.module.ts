import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TarefaListagemComponent } from "./tarefa-listagem/tarefa-listagem.component";

const routes: Routes = [
    { path: '', component: TarefaListagemComponent},
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TarefaRoutingModule { }