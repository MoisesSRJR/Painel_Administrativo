import React, { Fragment } from 'react';
import '../style/global.css';
import logoimg from '../image/logo.png';
import vectorimg from'../image/vector.png';
import SimpleModal from '../components/cadastrar/cadastrar';
import { useShop } from '../hooks/Shop';
import ModalEditar from '../components/editar/editar';
import Inativar from '../components/inativar/inativar';
  

export function Home(){
          
    const {DadosCompra}=useShop()
    
    return (
        
        <div id="fundo-painel">
            <div id="fundo-title"> 
                <div>
                    <img src={logoimg}/>
                </div>
                <div id="title">
                    <span>Painel Administrativo</span> 
                </div>
                <div>
                    <SimpleModal/>                
                </div>
                <div>
                    <input id="pesquisa" type="text" placeholder="Pesquisar Estabelecimento"/>
                </div>
                <div>
                    <img id ="lupinha" src={vectorimg}></img>
                </div>
            </div>
            <div id="fundo-filtros">
                <div id="filtro"><span>Nome do estabelecimento</span></div>
                <div id="filtro"><span>CNPJ</span></div>
                <div id="filtro"><span>Data Cadastrada </span></div>
                <div id="filtro"><span>Status</span></div>
                <div id="filtro"><span>Ações</span></div>
            </div>
                <div id="linha">
            </div>
            <div id="fundo-cadastro">
            {DadosCompra.map ((mercados)=>(
                <Fragment>
            <div id="separar-cadastros">
                  
                <img id="img-mercado" src={mercados.img} alt={mercados.nome}/>
                <span id="nome"> {mercados.nome} </span> 
                <span id="cnpj"> {mercados.cnpj} </span> 
                <span id="data"> 00/00/0000 </span>
                <div id="status"> {mercados.status ? (
                    <button id="ativo">Ativo</button>
                    ) : (
                    <button id="inativo">Inativo</button>
                    )} </div>
                <div id="botoes">
                <ModalEditar dadosMercado={mercados} /> 
                <Inativar idMercado={mercados.id} status={mercados.status} nomeMercado={mercados.nome}/>
                </div>
                
            </div>
              
                </Fragment>
           )
           )}
                

           </div>
        </div>
    )
}