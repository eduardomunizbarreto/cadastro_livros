import React, { useEffect, useRef, useState } from 'react';
import Livro from './models/livro';
import { LivroBuilder } from './builder/LivroBuilder';
import IntlCurrencyInput from "react-intl-currency-input"

const currencyConfig = {
    locale: "pt-BR",
    formats: {
        number: {
            BRL: {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            },
        },
    },
};

interface ViewProps {
    livro?: Livro | null
    close(): void
    salvarLivro(livro: Livro): void
}

const DialogoSalvarLivro: React.FC<ViewProps> = (props) => {

    const [title, setTitle] = useState("Adicionar livro")
    const ref = useRef<HTMLDivElement>(null)

    const [error, setError] = useState(null)
    const [titulo, setTitulo] = useState("")
    const [preco, setPreco] = useState(0)
    const [capa, setCapa] = useState("")

    function cliqueFora(e: any) {
        if (ref.current != null) {
            if (ref.current && !ref.current.contains(e.target))
                props.close()
        }
    }

    const handleChange = (event, value, maskedValue) => {
        event.preventDefault();
        setPreco(value)
    };

    function salvarLivro() {

        if (titulo.length === 0) {
            setError("Você precisa preencher o campo titulo")
            return
        }

        if (preco === 0) {
            setError("Você precisa preencher o campo preco corretamente")
            return
        }

        if (capa.length === 0) {
            setError("Você precisa preencher o campo capa")
            return
        }

        let builder = new LivroBuilder()
        if (props.livro)
            builder.setId(props.livro.id)

        builder.setTitulo(titulo)
            .setPreco(preco)
            .setCapa(capa)
        props.salvarLivro(builder.build())
    }

    useEffect(() => {
        if (props.livro) {
            setTitulo(props.livro.titulo)
            setPreco(props.livro.preco)
            setCapa(props.livro.capa)
            setTitle("Editar livro")
        }

        window.addEventListener('mousedown', cliqueFora)
        return () => {
            window.removeEventListener('mousedown', cliqueFora)
        }
    }, [])

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div ref={ref} className=" inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="p-5">
                        <div className="w-full flex flex-col">
                            <div className="flex flex-row items-center">
                                <h3 className="ml-2 text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    {title}
                                </h3>
                            </div>
                            <div className="w-full text-center">
                                {error && <div className="border border-red-400 rounded p-2 my-2 text-red-500 font-semibold"> {error}</div>}
                                <div className="mt-2">
                                    <div className="mt-5 w-full">
                                        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" className="w-full bg-gray-200 p-2 rounded" />
                                    </div>
                                    <div className="mt-5 w-full">
                                        <IntlCurrencyInput currency="BRL" value={preco} config={currencyConfig} onChange={handleChange} placeholder="Preco" type="tel" className="w-full bg-gray-200 p-2 rounded" />
                                    </div>
                                    <div className="mt-5 w-full">
                                        <input value={capa} onChange={(e) => setCapa(e.target.value)} placeholder="Capa" type="tel" className="w-full bg-gray-200 p-2 rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={() => salvarLivro()} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                            Salvar
                        </button>
                        <button onClick={props.close} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DialogoSalvarLivro;