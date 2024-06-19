import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsuarioDetalheComponent } from "./usuario-detalhe/usuario-detalhe.component";
import { UsuarioDadosComponent } from "./usuario-dados/usuario-dados.component";

const routes: Routes = [
    { path: 'detalhe', component: UsuarioDetalheComponent},
    { path: 'dados', component: UsuarioDadosComponent}
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UusuarioRoutingModule { }
