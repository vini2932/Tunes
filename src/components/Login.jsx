import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
  state = {
    nome: '',
    botao: true,
    carregar: false,
  };

  MudarNome = (e) => {
    const { value } = e.target;
    this.setState({
      nome: value,
    }, () => {
      this.VerificarBotao();
    });
  };

  VerificarBotao = () => {
    const { nome } = this.state;
    const tamanhoMaximo = 3;
    const ativar = nome.length >= tamanhoMaximo;
    if (ativar) {
      this.setState({
        botao: false,
      });
    }
  };

  CriarUsuario = async () => {
    const { nome } = this.state;
    const { history } = this.props;
    console.log(this.props);
    console.log('Esse é o history: ', history);
    this.MudarCarregar();
    const usuario = await createUser({ name: nome });
    if (usuario === 'OK') {
      console.log('redirecionando');
      history.push('/search');
    }
  };

  MudarCarregar = () => {
    this.setState((prev) => ({
      carregar: !prev.carregar,
    }));
  };

  render() {
    const { nome, botao, carregar } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="nome">Nome</label>
          :
          <input
            id="nome"
            type="text"
            placeholder="Digite o seu nome"
            value={ nome }
            onChange={ this.MudarNome }
            data-testid="login-name-input"
          />
          {carregar === true ? <Carregando /> : null}
          <button
            disabled={ botao }
            data-testid="login-submit-button"
            type="Button"
            onClick={ this.CriarUsuario }
          >
            Enviar

          </button>
        </form>
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
