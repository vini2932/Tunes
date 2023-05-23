import React from 'react';

class Search extends React.Component {
  state = {
    pesquisa: '',
    botao: true,
  };

  InputPesquisa = (e) => {
    this.setState({
      pesquisa: e.target.value,
    }, () => {
  this.MudarBotao()
    });
  };

  MudarBotao = () => {
    const {pesquisa} = this.state
    if(pesquisa.length >= 2){
    this.setState({
      botao: false,
    });
  } else {
    this.setState({
      botao : true
    })
  }
  };

  render() {
    const { pesquisa, botao } = this.state;
    return (
      <div data-testid="page-search">
        <form>
          <label htmlFor="pesquisa">Pesquisar Artista</label>
          <input type="text" id="pesquisa" data-testid="search-artist-input" value={ pesquisa } onChange={ this.InputPesquisa } />
          <button disabled={ botao } data-testid="search-artist-button">Pesquisar</button>
        </form>
      </div>
    );
  }
}

export default Search;
