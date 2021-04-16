import Livro from "../../models/livro";
import ViewState from "../ViewState";
import AppService from '../../service/app.service'

export class SalvarState implements ViewState<Livro> {
    salvar(item: Livro): Promise<void> {
        return AppService.getInstance().adicionarLivro(item)
    }
}