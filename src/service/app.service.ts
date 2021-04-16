import axios, { AxiosInstance } from "axios";
import Livro from "../models/livro";

export default class AppService {
    private static instance: AppService = null
    apiAxios: AxiosInstance = null

    private constructor() {
        this.apiAxios = axios.create({ baseURL: "http://localhost:4200" })
    }

    public static getInstance(): AppService {
        if (AppService.instance == null) {
            AppService.instance = new AppService()
        }
        return AppService.instance
    }

    async getLivros(): Promise<any> {
        const res = await this.apiAxios.get('/livros')
        return res.data
    }

    async adicionarLivro(livro: Livro): Promise<any> {
        const res = await this.apiAxios.post('/livros', livro)
        return res.data
    }

    async editarLivro(livro: Livro): Promise<any> {
        const res = await this.apiAxios.put(`/livros/${livro.id}`, livro)
        return res.data
    }

    async removerLivro(livro: Livro): Promise<any> {
        const res = await this.apiAxios.delete(`/livros/${livro.id}`)
        return res.data
    }
}

