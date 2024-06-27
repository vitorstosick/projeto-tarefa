import { Injectable } from '@angular/core';
import { Tarefa } from '../model/tarefa';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TarefaSeletor } from '../model/seletor/tarefaSeletor';
import { TarefaTemplateDTO } from '../model/DTO/TarefaTemplateDTO';
import { ItemTarefa } from '../model/itemTarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private readonly API = 'http://localhost:8080/rest/tarefa';

  constructor(private httpClient: HttpClient) { }


  public inserir(tarefa: Tarefa): Observable<Tarefa> {
    return this.httpClient.post<Tarefa>(this.API + '/inserir', tarefa);
  }

  public alterar(tarefa: Tarefa): Observable<boolean> {
    return this.httpClient.put<boolean>(this.API + '/alterar', tarefa);
  }

  public excluir(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.API + '/excluir/' + id);
  }

  public consultarPorId(id: number): Observable<Tarefa> {
    return this.httpClient.get<Tarefa>(this.API + '/' + id);
  }

  public consultarTodos(): Observable<Array<Tarefa>> {
    return this.httpClient.get<Array<Tarefa>>(this.API + '/listar');
  }

  public consultarPorFiltro(seletor: TarefaSeletor): Observable<Array<Tarefa>> {
    return this.httpClient.post<Array<Tarefa>>(this.API + '/filtro', seletor);
  }

  public criarTarefaAPartirDeTemplate(dto: TarefaTemplateDTO):Observable<Tarefa> {
    return this.httpClient.post<Tarefa>(this.API + '/inserir-template', dto);
  }

  public consultarItensDaTarefa(idTarefa: number): Observable<Array<ItemTarefa>> {
    return this.httpClient.get<Array<ItemTarefa>>(this.API + '/listar-itens/' + idTarefa);
  }

}
