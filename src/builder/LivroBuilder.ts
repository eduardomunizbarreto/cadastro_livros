import Livro from "../models/livro";

export class LivroBuilder {

    id: number
    titulo: string
    preco: number
    capa: string

    constructor() { }

    public setId(id: number): LivroBuilder {
        this.id = id
        return this
    }

    public setTitulo(titulo: string): LivroBuilder {
        this.titulo = titulo
        return this
    }

    public setPreco(preco: number): LivroBuilder {
        this.preco = preco
        return this
    }

    public setCapa(capa: string): LivroBuilder {
        this.capa = capa
        return this
    }

    public build(): Livro {
        return new Livro(this)
    }
}