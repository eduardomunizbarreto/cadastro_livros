import { LivroBuilder } from "../builder/LivroBuilder"

export default class Livro {
    public id: number = null
    public titulo?: string
    public preco?: number
    public capa?: string

    constructor(builder: LivroBuilder) {
        this.id = builder.id
        this.titulo = builder.titulo
        this.preco = builder.preco
        this.capa = builder.capa
    }
}