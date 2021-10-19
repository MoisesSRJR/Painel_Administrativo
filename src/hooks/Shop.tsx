import { createContext, ReactNode, useContext, useState } from 'react';

interface ShopProviderProps { children: ReactNode }
export interface ProdutosProps { id: number; nome: string; valor: number; imagem: string; quantidade:number; slides?:string[]}
interface ShopContextState {DadosCompra:EnderecoProps[]; AddEndereco(endereco:EnderecoProps):void; toggleStatus(id: string): void, editarMercado(dadosMercado: EnderecoProps): void}
export interface EnderecoProps {id:string; nome:string; cnpj:string; senha:string; celular:string; telefone:string; cep:string; endereco:string; numero:string; bairro:string; cidade:string; uf:string; complemento:string; img?: string; imagem: string; status:boolean }

const ShopContext = createContext({} as ShopContextState)

export function ShopProvider({ children }: ShopProviderProps) {
    const [ProdutosCarrinho, setProdutosCarrinho] = useState<ProdutosProps[]>(() => {
        const prod = localStorage.getItem('BestCartProdutos')
        if (prod) { return JSON.parse(prod) } return [] as ProdutosProps[]
    })
    const [DadosCompra, setDadosCompra] = useState<EnderecoProps[]>(()=>{
        const total = localStorage.getItem('BestCartCompra')
        if (total) { return JSON.parse(total) } return []
    })
    
    
    function AddEndereco(endereco:EnderecoProps){
        setDadosCompra([...DadosCompra, endereco]) 
        localStorage.setItem ('BestCartCompra', JSON.stringify([...DadosCompra, endereco]))
    }

    function toggleStatus(id: string){

        setDadosCompra((oldState) => {
            oldState.forEach((item) => {
                if(item.id === id) {
                    item.status = !item.status
                }
            })
            localStorage.setItem ('BestCartCompra', JSON.stringify([...oldState]))
            return [...oldState]
        })
    }

    function editarMercado(dadosMercado: EnderecoProps){
        setDadosCompra((oldState) => {
            oldState.forEach((item) => {
                if(item.id === dadosMercado.id) {
                    item.nome = dadosMercado.nome;
                    item.cnpj = dadosMercado.cnpj;
                    item.senha = dadosMercado.senha;
                    item.celular = dadosMercado.celular;
                    item.telefone = dadosMercado.telefone;
                    item.cep = dadosMercado.cep;
                    item.endereco = dadosMercado.endereco;
                    item.numero = dadosMercado.numero;
                    item.bairro = dadosMercado.bairro;
                    item.cidade = dadosMercado.cidade;
                    item.uf = dadosMercado.uf;
                    item.complemento = dadosMercado.complemento;
                }
            })
            localStorage.setItem ('BestCartCompra', JSON.stringify([...oldState]))
            return [...oldState]
        })
    }

    return (
        <ShopContext.Provider value={{  AddEndereco, DadosCompra, toggleStatus, editarMercado }}>
            {children}
        </ShopContext.Provider>
    )
}

export function useShop() {
    const context = useContext(ShopContext)
    if (!context) {
        throw new Error('useShop must be used within a ShopProvider');
    }
    return context
}