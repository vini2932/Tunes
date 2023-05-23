import React from 'react';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  state = {
    nome: '',
    carregar: true,
  };

  componentDidMount() {
    this.PegarUser();
  }

  PegarUser = async () => {
    const usuario = await getUser();
    const { name } = usuario;
    this.setState({
      nome: name,
    }, () => this.MudarCarregar());
  };

  MudarCarregar = () => {
    this.setState((prev) => ({
      carregar: !prev.carregar,
    }));
  };

  render() {
    const { nome, carregar } = this.state;
    return (
      <header data-testid="header-component">

        {carregar === true
          ? <Carregando /> : <p data-testid="header-user-name">{nome}</p>}
      </header>
    );
  }
}

export default Header;
