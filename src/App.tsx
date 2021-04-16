import React, { useEffect, useState } from 'react';
import DialogoConfirmacaoExclusao from './DialogoConfirmacaoExclusao';
import DialogoSalvarLivro from './DialogoSalvarLivro';
import IconsFactory from './factory/IconsFactory';
import Header from './Header';
import Livro from './models/livro';
import AppService from './service/app.service';
import { EditarState } from './view-state/states/editar.state';
import { SalvarState } from './view-state/states/salvar.state';
import ViewState from './view-state/ViewState';


function App() {

	const [openDialogo, setOpenDialog] = useState(false)
	const [openDialogoExclusao, setOpenDialogExclusao] = useState(false)
	const [livros, setLivros] = useState<Livro[]>([])
	const [livroSelecionado, setLivroSelecionado] = useState<Livro | null>(null)
	const [salvamentoState, setSalvamentoState] = useState<ViewState<Livro> | null>(null)

	let formatter = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumSignificantDigits: 2,
		maximumFractionDigits: 3,
		maximumSignificantDigits: 3
	})

	async function getLivros() {
		const livros = await AppService.getInstance().getLivros()
		setLivros(livros)
	}

	function abrirDialogoCriacao() {
		setSalvamentoState(new SalvarState())
		setLivroSelecionado(null)
		setOpenDialog(true)
	}

	function abrirDialogoEdicao(livro: Livro) {
		setSalvamentoState(new EditarState())
		setLivroSelecionado(livro)
		setOpenDialog(true)
	}

	function fecharDialogo() {
		setOpenDialog(false)
		setLivroSelecionado(null)
	}

	function abrirDialogoExclusao(livro: Livro) {
		setLivroSelecionado(livro)
		setOpenDialogExclusao(true)
	}

	function fecharDialogoExclusao() {
		setOpenDialogExclusao(false)
		setLivroSelecionado(null)
	}

	async function salvarLivro(livro: Livro) {
		const resposta = await salvamentoState.salvar(livro)

		setSalvamentoState(null)
		setLivroSelecionado(null)
		fecharDialogo()
		getLivros()
	}

	async function removerLivro(livro: Livro) {
		const resposta = await AppService.getInstance().removerLivro(livro!)

		setOpenDialogExclusao(false)
		getLivros()
		setLivroSelecionado(null)
	}

	useEffect(() => {
		getLivros()
	}, [])

	return (
		<>
			<Header />
			<div className="flex flex-col max-w-7xl mx-auto p-10">
				<button onClick={() => abrirDialogoCriacao()} className="self-center bg-blue-500 hover:bg-blue-700 p-2 rounded text-white font-semibold focus:outline-none"> Adicionar Novo</button>
				<div className="flex flex-row flex-wrap justify-between">
					{livros.map(livro => {
						return (
							<div key={`livro:${livro.id}`} className="flex flex-row items-center w-96 p-3 m-5 bg-gray-200 rounded text-xl font-semibold">
								<div className="p-5">
									<img className="w-48" src={livro.capa} />
								</div>
								<div className="flex flex-col">
									<span>{livro.titulo}</span>
									<span className="text-lg text-gray-600">{formatter.format(livro.preco)}</span>
									<div className="flex flex-row space-x-5 p-2 self-end">

										<IconsFactory name="edit" onClick={() => abrirDialogoEdicao(livro)} />
										<IconsFactory name="remove" onClick={() => abrirDialogoExclusao(livro)} />
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
			{openDialogo && <DialogoSalvarLivro livro={livroSelecionado} salvarLivro={salvarLivro} close={fecharDialogo} />}
			{(openDialogoExclusao && livroSelecionado) && <DialogoConfirmacaoExclusao livro={livroSelecionado} removerLivro={removerLivro} close={fecharDialogoExclusao} />}
		</>
	);
}

export default App;
