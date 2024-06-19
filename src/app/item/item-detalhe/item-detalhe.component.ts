import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemTarefaService } from '../../shared/service/itemTarefa.service';
import { ItemTarefa } from '../../shared/model/itemTarefa';
import Swal from 'sweetalert2';
import { Tarefa } from '../../shared/model/tarefa';
import { TarefaService } from '../../shared/service/tarefa.service';

@Component({
  selector: 'app-item-detalhe',
  //standalone: true,
  //imports: [],
  templateUrl: './item-detalhe.component.html',
  styleUrl: './item-detalhe.component.scss'
})
export class ItemDetalheComponent implements OnInit{

  public idItem: number;
  public item: ItemTarefa = new ItemTarefa();
  public tarefas: Array<Tarefa> = new Array();
 


  constructor(
    private router: Router, // COMPONENTE PARA FAZER ROTEAMENTO ENTRA AS TELAS
    private route: ActivatedRoute, //PEGAR OS PARAMETROS DA URL
    private itemService: ItemTarefaService,
    private tarefaService: TarefaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idItem = params['id'];
      if (this.idItem) {
        this.buscarTarefa();
      }
    });

    this.consultarTodasTarefas();
  }

  public buscarTarefa(): void {
    this.itemService.consultarPorId(this.idItem).subscribe(
      (vacina) => {
        this.item = vacina;
      },
      (erro) => {
        Swal.fire('Erro ao buscar uma tarefa!', erro, 'error');
      }
    );
  }


  public salvar(): void {
    if (this.idItem) {
      this.alterar();
    } else {
      this.inserir();
    }
  }

  public alterar(): void {
    this.itemService.alterar(this.item).subscribe(
      (resposta) => {
        Swal.fire('Item atualizada com sucesso!', '', 'success');
        this.voltar();
      },
      (erro) => {
        Swal.fire(
          'Erro ao atualizar o Item: ' + erro.error.mensagem,
          'error'
        );
      }
    );
  }

  public voltar() {
    this.router.navigate(['/']);
  }

  public inserir(): void {
    this.itemService.inserir(this.item).subscribe(
      (resposta) => {
        this.item = resposta;
        Swal.fire('Item salva com sucesso!', '', 'success');
        this.voltar();
      },
      (erro) => {
        Swal.fire('Erro ao salvar um item!', erro, 'error');
      }
    );
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

}
