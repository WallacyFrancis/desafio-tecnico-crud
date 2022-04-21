import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { requestData } from "../services/request";
import clientes from '../../backend/API';

class Clientes extends Component {
  constructor() {
    super();

    this.state = {
      clientes: [],
      dataTable: [],
    }

  }

  async requesClients() {
    try {
      const data = await requestData('/clientes');
      this.setState({ clientes: data });
      return this.clientes;
    } catch (e) {
      console.log(e);
    }
  }

  deleteClient(id) {
    const result = clientes.filter((cliente) => cliente.id !== id );
    this.setState({ clientes: result });
    console.log(clientes);
  }

  componentDidMount() {
    this.requesClients();
  }
 
  render() {
    const { clientes } = this.state;
    return(
      <div>
        <header>
          <Link to="/clientes/cadastro">
            Criar Novo <AiOutlineUserAdd/>
          </Link>
        </header>
        <div>
         <table>
         <tr>
            <th>ID</th>
            <th>Nome/Razão Social</th>
            <th>CPF/CNPJ</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Celular</th>
          </tr>
          { 
            clientes.length !== 0 ? clientes.map((cliente) => (
              <tr key={ cliente.id }>
                <td>{ cliente.id }</td>
                <td>{ cliente.nome }</td>
                <td>{ cliente.cpf_cnpj }</td>
                <td>{ cliente.email }</td>
                <td>{ cliente.telefone }</td>
                <td>{ cliente.celular }</td>
                <td onClick={() => console.log(cliente.id)} ><BsFillPencilFill/></td>
                <td onClick={() => this.deleteClient(cliente.id)} ><RiDeleteBack2Line/></td>
              </tr>
            ))  : 'Carregando...'  
          }
         </table>
        </div>
      </div>
    );
  }
}

export default Clientes;
