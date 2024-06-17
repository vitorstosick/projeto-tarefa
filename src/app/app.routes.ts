import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'tarefa' , loadChildren: () => import('./tarefa/tarefa.module').then(m => m.TarefaModule)}
    

];
