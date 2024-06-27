import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemTarefa } from '../model/itemTarefa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemTarefaService {

  private readonly API = 'http://localhost:8080/rest/item';

  constructor(private httpClient: HttpClient) { }

  public inserir(tarefa: ItemTarefa): Observable<ItemTarefa> {
    return this.httpClient.post<ItemTarefa>(this.API + '/inserir', tarefa);
  }

  public alterar(tarefa: ItemTarefa): Observable<boolean> {
    return this.httpClient.put<boolean>(this.API + '/alterar', tarefa);
  }

  public excluir(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.API + '/excluir/' + id);
  }

  public consultarPorId(id: number): Observable<ItemTarefa> {
    return this.httpClient.get<ItemTarefa>(this.API + '/' + id);
  }

  public listarTodos(): Observable<Array<ItemTarefa>> {
    return this.httpClient.get<Array<ItemTarefa>>(this.API + '/listar');
  }

  public consultarTodosOsItensAssociadoUmaTarefa(id: number):Observable<Array<ItemTarefa>> {
    return this.httpClient.get<Array<ItemTarefa>>(this.API + '/listar/' + id)
  }
}
