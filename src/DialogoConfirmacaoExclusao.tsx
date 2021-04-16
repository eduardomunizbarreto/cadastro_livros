import React, { useEffect, useRef, useState } from 'react';
import Livro from './models/livro';

interface ViewProps {
    livro?: Livro
    removerLivro(livro: Livro): void
    close(): void
}

const DialogoConfirmacaoExclusao: React.FC<ViewProps> = (props) => {
    const { livro } = props
    const ref = useRef<HTMLDivElement>(null)

    function cliqueFora(e: any) {
        if (ref.current != null) {
            if (ref.current && !ref.current.contains(e.target))
                props.close()
        }
    }

    useEffect(() => {
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
                    <div className="flex flex-col p-5">
                        <span className="font-semibold">Deseja remover o livro?</span>
                        <span >{livro?.titulo}</span>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={() => props.removerLivro(livro!)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                            Sim, remover
                        </button>
                        <button onClick={props.close} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DialogoConfirmacaoExclusao;