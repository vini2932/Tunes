import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';

import Carregando from './Carregando';
import { getUser } from '../services/userAPI';

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
        <BrowserRouter>
          <Link to="/favorites" data-testid="link-to-favorites">Musica Favorita</Link>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/album">Album</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </BrowserRouter>
        {carregar === true
          ? <Carregando /> : <p data-testid="header-user-name">{nome}</p>}
      </header>
    );
  }
}

export default Header;
