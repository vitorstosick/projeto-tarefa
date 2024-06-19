import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../../shared/model/tarefa';
import { TarefaSeletor } from '../../shared/model/seletor/tarefaSeletor';
import { TarefaService } from '../../shared/service/tarefa.service';
import { UsuarioService } from '../../shared/service/usuario.service';
import { ItemTarefaService } from '../../shared/service/itemTarefa.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../shared/model/usuario';
import { TarefaTemplateDTO } from '../../shared/model/DTO/TarefaTemplateDTO';
import { ItemTarefa } from '../../shared/model/itemTarefa';



@Component({
  selector: 'app-tarefa-listagem',
  //standalone: true,
 //imports: [],
  templateUrl: './tarefa-listagem.component.html',
  styleUrl: './tarefa-listagem.component.scss'
})
export class TarefaListagemComponent implements OnInit{

  public usuario: Usuario = new Usuario();
  public tarefas: Tarefa[] = new Array();
  public idTarefa: number;
  public seletor: TarefaSeletor = new TarefaSeletor();
  public totalPaginas: Number = 0;
  public readonly TAMANHO_PAGINA: number = 0;
  public showForm: boolean = false;
  public isTemplate: boolean = false;
  itemTarefa: ItemTarefa;

  constructor(
    private tarefaService: TarefaService,
    private usuarioService: UsuarioService,
    private itemTarefaService: ItemTarefaService,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  private consultarTodasTarefas() {
    this.tarefaService.consultarTodos().subscribe(
      (resultado) => {
        this.tarefas = resultado;
      },
      (erro) => {
        console.error('erro ao consultar todas as tarefas', erro);
      }
    );
  }

  public pesquisar() {
    this.tarefaService.consultarPorFiltro(this.seletor).subscribe(
      (resultado) => {
        this.tarefas = resultado;
      },
      (erro) => {
        console.error('erro ao consultar tarefas por filtros', erro);
      }
    );
  }

  public limpar() {
    this.seletor = new TarefaSeletor();
  }

  public atualizar(idTarefaSelecionada: number) {
    this.router.navigate(['/tarefa/detalhe/', idTarefaSelecionada]);
  }

  public excluir(tarefaSelecionada: Tarefa) {
    Swal.fire({
      title: 'Deseja excluir esta Tarefa?',
      text: 'Essa ação não poderá ser desfeita',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.tarefaService.excluir(tarefaSelecionada.idTarefa).subscribe(
          (resultado) => {
            this.pesquisar();
            Swal.fire('Sucesso!', 'Tarefa excluída com sucesso! ', 'success');
          },
          (erro) => {
            Swal.fire(
              'Erro!',
              'Erro ao excluir tarefa: ' + erro.error.mensagem,
              'error'
            );
          }
        );
      }
    });
  }

  public voltar() {
    this.router.navigate(['/tarefa/']);
  }

  toggleExpanded(tarefa: Tarefa): void {
    tarefa.expanded = !tarefa.expanded;
  }

  public excluirItem(itemSelecionado: ItemTarefa) {
    Swal.fire({
      title: 'Deseja excluir este Item?',
      text: 'Essa ação não poderá ser desfeita',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.itemTarefaService.excluir(itemSelecionado.idItem).subscribe(
          (resultado) => {
            this.pesquisar();
            Swal.fire('Sucesso!', 'Item excluída com sucesso! ', 'success');
          },
          (erro) => {
            Swal.fire(
              'Erro!',
              'Erro ao excluir tarefa: ' + erro.error.mensagem,
              'error'
            );
          }
        );
      }
    });
  }

  public alterarItem(item: ItemTarefa) {
    this.router.navigate(['/item/detalhe/', item]);
  }

}