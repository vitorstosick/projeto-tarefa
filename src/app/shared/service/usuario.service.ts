import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = 'http://localhost:8080/backend_projeto_tarefa/rest/usuario';

  constructor(private httpClient: HttpClient) { }


  public inserir(tarefa: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.API + '/inserir', tarefa);
  }

  public alterar(tarefa: Usuario): Observable<boolean> {
    return this.httpClient.put<boolean>(this.API + '/alterar', tarefa);
  }

  public excluir(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.API + '/excluir/' + id);
  }

  public consultarPorId(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.API + '/' + id);
  }




}
