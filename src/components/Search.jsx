import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    pesquisa: '',
    botao: true,
    artista: [],
    // encontrar: false,
    mostrar: '',
  };

  InputPesquisa = (e) => {
    this.setState({
      pesquisa: e.target.value,
    }, () => {
      this.MudarBotao();
    });
  };

  MudarBotao = () => {
    const { pesquisa } = this.state;
    if (pesquisa.length >= 2) {
      this.setState({
        botao: false,
      });
    } else {
      this.setState({
        botao: true,
      });
    }
  };

  Pesquisar = async (e) => {
    e.preventDefault();
    const { pesquisa } = this.state;
    const artistaPesquisa = await searchAlbumsAPI(pesquisa);
    console.log('Essa é a pesquisa, ', artistaPesquisa);
    this.setState({
      mostrar: pesquisa,
    });
    this.setState({
      pesquisa: '',
    });
    this.setState({
      artista: artistaPesquisa,
    }, () => {
      /* const { artista } = this.state;
     if (artista) {
        this.setState({
          encontrar: true,
        }, () => console.log('O artista foi encontrado o nome é ', artista));
      } */
    });
  };

  render() {
    const { pesquisa, botao, artista, mostrar } = this.state;
    return (
      <div data-testid="page-search">
        <form>
          <label htmlFor="pesquisa">Pesquisar Artista</label>
          <input
            type="text"
            id="pesquisa"
            data-testid="search-artist-input"
            value={ pesquisa }
            onChange={ this.InputPesquisa }
          />
          {artista.length > 0 ? (
            <p>
              Resultado de álbuns de:
              {' '}
              {mostrar}
            </p>
          ) : (
            <p>Nenhum álbum foi encontrado</p>
          )}

          {
            artista.map((ar) => (
              <div key={ ar.collectionId }>
                <img src={ ar.artworkUrl100 } alt={ ar.collectionName } />
                <p>{ar.collectionName}</p>
                <Link
                  to={ `album/${ar.collectionId}` }
                  data-testid={ `link-to-album-${ar.collectionId}` }
                >
                  Acesse a pagina

                </Link>
              </div>))
          }

          <button
            disabled={ botao }
            data-testid="search-artist-button"
            onClick={ this.Pesquisar }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
