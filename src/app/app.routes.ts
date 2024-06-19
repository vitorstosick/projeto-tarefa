import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'tarefa' , loadChildren: () => import('./tarefa/tarefa.module').then(m => m.TarefaModule)},
    { path: 'item', loadChildren: () => import('./item/item.module').then(m => m.ItemModule)},
    { path: 'usuario', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)}
];
