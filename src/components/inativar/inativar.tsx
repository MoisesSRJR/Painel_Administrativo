import React, { Fragment, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import '../../style/global.css';
import '../cadastrar/cadastrar.css';
import '../inativar/inativar.css';
import '../editar/editar.css';
import { useShop } from '../../hooks/Shop';
import { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import falseimg from '../../image/false.png';
import trueimg from '../../image/true.png';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    
    },
  }),
);


interface Styles extends Partial<Record<SwitchClassKey, string>> {
    focusVisible?: string;
  }
  
  interface Props extends SwitchProps {
    classes: Styles;
  }

  interface InativarProps {
      idMercado: string;
      status: boolean;
      nomeMercado: string;
  }

  
export default function Inativar ({idMercado, status, nomeMercado} : InativarProps) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const {DadosCompra, toggleStatus}=useShop()

  const body = (
    <div id="fundo-inativar">
        <div id="divisao-inativar">
            <div>
                <span id="title-inativar">Inativar estabelecimento</span>
            </div>
            <div>
                <button id="bt-x" onClick={handleClose}><b>X</b></button>
            </div>
        </div>
        <div id ="linha-inativar">
        </div>
        <div id="fundo-alert">
        
            <span id="alert">Deseja inativar o supermercado:</span>
        </div>
        <div id="fundo-alert2">
            {/* {DadosCompra.map ((mercados)=>( */}
            <span id="alert2">{nomeMercado}</span>
            {/* <span>{mercados.nome}</span> */}
        {/* ))} */}
        </div>
        <div id="fundo-bt-alert">
            <button id="bt-inativar" onClick={() => {
                toggleStatus(idMercado)
            }}>Inativar</button>
            <button id="bt-cancel" onClick={handleClose}>Cancelar</button>
        </div>
    </div> 
    
    
  );

  return (
    <div>
        {status ? (
            <button id="bt-excluir" type="button" onClick={handleOpen}>
                <img src={falseimg}/>
            </button>
        ) : (
            <button id="bt-excluir" type="button" onClick={() => {
                toggleStatus(idMercado)
            }}>
            <img src={trueimg}/>
            </button>
        )}
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}