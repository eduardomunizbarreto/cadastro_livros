import Livro from "../../models/livro";
import ViewState from "../ViewState";
import AppService from '../../service/app.service'

export class EditarState implements ViewState<Livro> {
    salvar(item: Livro): Promise<any> {
        return AppService.getInstance().editarLivro(item)
    }
}