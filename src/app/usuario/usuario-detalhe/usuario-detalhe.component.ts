import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../shared/service/usuario.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuario-detalhe',
  //standalone: true,
  //imports: [],
  templateUrl: './usuario-detalhe.component.html',
  styleUrl: './usuario-detalhe.component.scss'
})
export class UsuarioDetalheComponent implements OnInit{

  public usuarios: Usuario[] = new Array();
  public usuario: Usuario = new Usuario();
  public idUsuario: number;

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idUsuario = params['id'];
      if (this.idUsuario) {
        this.buscarUsuario();
      }
    });
  }

  public salvar(): void {
    if (this.idUsuario) {
      this.atualizar();
    } else {
      this.inserir();
    }
  }

  public inserir(): void {
    this.usuarioService.inserir(this.usuario).subscribe(
      (resposta) => {
        this.usuario = resposta;
        Swal.fire('Usuário cadastrado com sucesso!', '', 'success');
        this.voltar();
      },
      (erro) => {
        Swal.fire('Erro ao cadastrar um usuário!', erro.error.mensagem, 'error');
      }
    );
  }

  public atualizar(): void {
    this.usuarioService.alterar(this.usuario).subscribe(
      (resposta) => {
        Swal.fire('Usuário atualizada com sucesso!', '', 'success');
        this.voltar();
      },
      (erro) => {
        Swal.fire(
          'Erro ao atualizar um usuário: ' + erro.error.mensagem,
          'error'
        );
      }
    );
  }

  public buscarUsuario(): void {
    this.usuarioService.consultarPorId(this.idUsuario).subscribe(
      (resposta) => {
        this.usuario = resposta;
      },
      (erro) => {
        Swal.fire('Erro ao buscar um usuario!', erro, 'error');
      }
    );
  }

  public voltar() {
    this.router.navigate(['/tarefa/']);
  }

  public compareById(r1: any, r2: any): boolean {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }

  validarNome(){
    let estiloInput = 'form-control';

    if(this.ngForm && this.ngForm.invalid){
      if(this.usuario.nome != null && this.usuario.nome.length < 3){
        estiloInput = 'form-control is-invalid';
      }
    }
    return estiloInput;
  }

  validarEmail(){
    let estiloInput = 'form-control';

    if(this.ngForm && this.ngForm.invalid){
      if(this.usuario.email != null && this.usuario.email.length < 3){
        estiloInput = 'form-control is-invalid';
      }
    }

  }
}
