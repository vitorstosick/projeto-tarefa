import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';
import { UsuarioService } from '../../shared/service/usuario.service';
import { ActivatedRoute, Route } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-dados',
  //standalone: true,
  //imports: [],
  templateUrl: './usuario-dados.component.html',
  styleUrl: './usuario-dados.component.scss'
})
export class UsuarioDadosComponent implements OnInit{


  usuario: Usuario;
  idUsuario: number;
  router: any;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    
  }

  public buscarUsuario(): void {
    this.usuarioService.consultarPorId(this.idUsuario).subscribe(
      (usuario) => {
        this.usuario = usuario;
      },
      (erro) => {
        Swal.fire('Erro ao buscar os dados do usuário!', erro, 'error');
      }
    );
  }

  public voltar() {
    this.router.navigate(['/tarefa/']);
  }

}
