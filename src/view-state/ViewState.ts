export default interface ViewState<T> {
    salvar(item: T): Promise<void>
}