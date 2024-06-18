import { ItemTarefa } from "./itemTarefa";
import { Usuario } from "./usuario";

export class Tarefa {

    idTarefa: number;
	usuario: Usuario;
	nomeTarefa: string;
	tipoTarefa: string;
	itensTarefa: ItemTarefa[] ;
	realizado: boolean;
	isTemplate: boolean;


}