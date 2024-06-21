import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ItemDetalheComponent } from "./item-detalhe/item-detalhe.component";


const routes: Routes = [
{ path: 'detalhe', component: ItemDetalheComponent},

];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ItemRoutingModule { }
