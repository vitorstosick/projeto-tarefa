import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsuarioDetalheComponent } from "./usuario-detalhe/usuario-detalhe.component";

const routes: Routes = [
    { path: 'detalhe', component: UsuarioDetalheComponent},
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UusuarioRoutingModule { }
