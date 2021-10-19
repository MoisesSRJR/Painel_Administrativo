import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import '../../style/global.css';
import '../cadastrar/cadastrar.css';
import '../editar/editar.css';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import {useShop,EnderecoProps} from '../../hooks/Shop';
import uploadimg from '../../image/upload.png';
import groupimg from '../../image/group.png';
import editimg from '../../image/edit.png';


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

  interface ModalEditarProps {
    dadosMercado: EnderecoProps;
  }

export default function ModalEditar ({dadosMercado}: ModalEditarProps) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {AddEndereco, editarMercado}=useShop()
    
    const [altdados, setaltdados] = useState ({ 
        status:true, id:dadosMercado.id, nome: dadosMercado.nome || "", cnpj: dadosMercado.cnpj || "", senha:dadosMercado.senha || "", imagem:dadosMercado.imagem || "", celular:dadosMercado.celular || "", telefone:dadosMercado.telefone || "", cep:dadosMercado.cep || "",
        endereco:dadosMercado.endereco || "", numero:dadosMercado.numero || "", bairro:dadosMercado.bairro || "", cidade:dadosMercado.cidade || "", complemento:dadosMercado.complemento || "", uf:dadosMercado.uf || ""})
    
    function AlteraEnd (event:React.FormEvent<HTMLInputElement>){
        const name = event.currentTarget.name
        setaltdados({...altdados,[name]: event.currentTarget.value})
    }

   
    function OnSubmit (dados:any){
        // AddEndereco(altdados)
        editarMercado(altdados)
        dados.preventDefault()
        
    }

  const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }),)(({ classes, ...props }: Props) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

  
    const [state, setState] = React.useState({
      checkedA: true,
      checkedB: true,
      
    });
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };

  const body = (
    <div id="fundo-cadastrar2">
        <div id="divisao1">
            <div>
                <span id="title-cadastrar">Editar estabelecimento</span>
            </div>
            <div>
                <button id="bt-x" onClick={handleClose}><b>X</b></button>
            </div>
        </div>
        <div id ="linha2">
        </div>
       <form onSubmit={OnSubmit}>
        <div id="divisao2">
            <div>
                <span id="sub-title">Nome do estabelecimento</span><br></br>
                <input id="digite3" placeholder="Digite aqui" name="nome" type="text" value={altdados.nome} onChange={AlteraEnd}></input>
            </div>
            <div>
                <span id="sub-title">CNPJ</span><br></br>
                <input id="digite3" placeholder="00.000.000/0000-00" name="cnpj" type="text" value={altdados.cnpj} onChange={AlteraEnd}></input>
            </div>
            <div>
                <span id="sub-title">Senha</span><br></br>
                <input id="digite3" placeholder="Digite aqui" name="senha" type="text" value={altdados.senha} onChange={AlteraEnd}></input>
            </div>
        </div>
        <div id="divisao3">
            <div>
                <span id="sub-title">Imagem</span><br></br>
                <label id="bt-label"> <img src={uploadimg}/> Carregar imagem <input type="file" name="img"  value={altdados.imagem} onChange={AlteraEnd}></input></label>    
            </div>
            <div>
                <span id="sub-title"></span><br></br>
                <button id="x-img">X</button>
            </div>
            <div>
                <span id="sub-title">Celular</span><br></br>
                <input id="digite2" placeholder="(00) 00000-0000" name="celular" type="text" value={altdados.celular} onChange={AlteraEnd}></input>
            </div>
            <div>
                <span id="sub-title">Telefone para contato</span><br></br>
                <input id="digite2" placeholder="(00) 00000-0000" name="telefone" type="text" value={altdados.telefone} onChange={AlteraEnd}></input>
            </div>
        </div>
        <div id ="linha3">
        </div>
        
        <div id="divisao4">
            <div>
                <span id="sub-title">CEP</span><br></br>
                <input id="digite2" placeholder="00000-000" name="cep" type="text" value={altdados.cep} onChange={AlteraEnd}></input>
            </div>
            <div>
                <span id="sub-title">Endereço</span><br></br>
                <input id="digite4" placeholder="Digite aqui" name="endereco" type="text" value={altdados.endereco} onChange={AlteraEnd}></input>
            </div>
            <div>
                <span id="sub-title">Número</span><br></br>
                <input id="digite1" placeholder="000"></input>
            </div>
            <div>
                <span id="sub-title">Bairro</span><br></br>
                <input id="digite3" placeholder="Digite aqui"></input>
            </div>
        </div>
        <div id="divisao4">
            <div>
                <span id="sub-title">Cidade</span><br></br>
                <input id="digite4" placeholder="Digite aqui"></input>
            </div>
            <div>
                <span id="sub-title">UF</span><br></br>
                <select id="digite1">
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AM">AM</option>
                    <option value="AP">AP</option>
                    <option value="BA">BA</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="GO">GO</option>
                    <option value="MA">MA</option>
                    <option value="MG">MG</option>
                    <option value="MS">MS</option>
                    <option value="MT">MT</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="PE">PE</option>
                    <option value="PI">PI</option>
                    <option value="PR">PR</option>
                    <option value="RJ">RJ</option>
                    <option value="RN">RN</option>
                    <option value="RO">RO</option>
                    <option value="RR">RR</option>
                    <option value="RS">RS</option>
                    <option value="SP">SP</option>
                    <option value="SC">SC</option>
                    <option value="SE">SE</option>
                    <option value="TO">TO</option> 
                </select>
            </div>
            <div>
                <span id="sub-title">Complemento</span><br></br>
                <input id="digite5" placeholder="Digite aqui"></input>
            </div>
        </div>
        <div id ="linha4">
        </div>
        <div id="divisao5">
            <div>
                <span id="checkbox">O supermecado realiza entrega ?</span>
            </div>
        <FormGroup>
                {<IOSSwitch checked={state.checkedA} onChange={handleChange} name="checkedA"/>}
        </FormGroup>
            <div>
                <span id="checkbox">O supermecado permite retirada ?</span>
            </div>
        <FormGroup>
                {<IOSSwitch checked={state.checkedB} onChange={handleChange} name="checkedB"/>}
        </FormGroup>
        </div>
        <div id="divisao6">
            <button  id="bt1" type="submit"> <img src={groupimg}/> Editar</button>

            <button onClick={handleClose} id="bt-voltar">voltar</button>
        </div>
        </form>
    </div>  
    
    
  );

  return (
    <div>
      <button id="bt-editar" type="button" onClick={handleOpen}>
        <img src={editimg}/>
      </button>
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