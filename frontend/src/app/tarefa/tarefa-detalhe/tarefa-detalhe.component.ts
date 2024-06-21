import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemTarefa } from '../../shared/model/itemTarefa';
import { Tarefa } from '../../shared/model/tarefa';
import { ActivatedRoute, Router } from '@angular/router';
import { TarefaService } from '../../shared/service/tarefa.service';
import { UsuarioService } from '../../shared/service/usuario.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../shared/model/usuario';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tarefa-listagem',
  //standalone: true,
  //imports: [],
  templateUrl: './tarefa-detalhe.component.html',
  styleUrl: './tarefa-detalhe.component.scss'
})
export class TarefaDetalheComponent implements OnInit {

  public itens: ItemTarefa[] = new Array();
  public itemTarefa: ItemTarefa = new ItemTarefa();
  public tarefa: Tarefa = new Tarefa();
  public idTarefa: number;
  public usuarios: Array<Usuario> = new Array();


  @ViewChild('ngForm')
  public ngForm: NgForm;


  constructor(
    private tarefaService: TarefaService,
    private router: Router, // COMPONENTE PARA FAZER ROTEAMENTO ENTRA AS TELAS
    private usuarioService: UsuarioService,
    private route: ActivatedRoute //PEGAR OS PARAMETROS DA URL
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idTarefa = params['id'];
      if (this.idTarefa) {
        this.buscarTarefa();
      }
    });

    this.consultarTodosUsuarios()
  }

  public salvar(): void {
    if (this.idTarefa) {
      this.alterar();
    } else {
      this.inserir();
    }
  }

  public inserir(): void {
    this.tarefaService.inserir(this.tarefa).subscribe(
      (resposta) => {
        this.tarefa = resposta;
        Swal.fire('Tarefa salva com sucesso!', '', 'success');
        this.voltar();
      },
      (erro) => {
        Swal.fire('Erro ao salvar uma tarefa!', erro, 'error');
      }
    );
  }

  public alterar(): void {
    this.tarefaService.alterar(this.tarefa).subscribe(
      (resposta) => {
        Swal.fire('Tarefa atualizada com sucesso!', '', 'success');
        this.voltar();
      },
      (erro) => {
        Swal.fire(
          'Erro ao atualizar a tarefa: ' + erro.error.mensagem,
          'error'
        );
      }
    );
  }

  public buscarTarefa(): void {
    this.tarefaService.consultarPorId(this.idTarefa).subscribe(
      (vacina) => {
        this.tarefa = vacina;
      },
      (erro) => {
        Swal.fire('Erro ao buscar uma tarefa!', erro, 'error');
      }
    );
  }

  public voltar() {
    this.router.navigate(['/tarefa/']);
  }

  private consultarTodosUsuarios() {
    this.usuarioService.consultarTodos().subscribe(

    (resposta) => {
      this.usuarios = resposta;
    },
    (erro) => {
      Swal.fire('Erro ao consultar todos usuários', '', 'error');
    }
  )
  }

  validarNome(){
    let estiloInput = 'form-control';

    if(this.ngForm && this.ngForm.invalid){
      if(this.tarefa.nomeTarefa != null && this.tarefa.nomeTarefa.length < 3){
        estiloInput = 'form-control is-invalid';
      }
    }

    return estiloInput;
  }
}
