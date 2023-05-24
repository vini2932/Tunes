import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class Album extends React.Component {
  state = {
    bandanome: '',
    albumnome: '',
    albumcompleto: [],
    idBanda: 0,
    carregando: false,
  };

  componentDidMount() {
    this.PegarBanda();
  }

  PegarBanda = async () => {
    const { history } = this.props;
    const id = history.location.pathname.split('/')[2];
    console.log(id);
    this.setState({
      idBanda: id,
    });
    const banda = await getMusics(id);
    console.log('Essa é a bandsa ', banda);
    this.setState({
      albumcompleto: [...banda],
      bandanome: banda[0].artistName,
      albumnome: banda[0].collectionName,
    });
  };

  Favoritar = async (e) => {
    if (e.target.checked === true) {
      this.setState({
        carregando: true,
      });
      const { albumcompleto } = this.state;
      const nomeMusica = e.target.parentNode.firstChild.innerText;
      let musicaFavoritada = '';
      musicaFavoritada = albumcompleto.find((fi) => fi.trackName === nomeMusica);
      console.log('Esse é o nome da banda ', nomeMusica);
      console.log('Essa é a musica favoritada ', musicaFavoritada);

      const { idBanda } = this.state;
      console.log('A musica foi favoritada');
      const musicas = await getMusics(idBanda);
      const AdicionarFavoritos = await addSong(musicaFavoritada);
      console.log(AdicionarFavoritos);
      this.setState({
        carregando: false,
      });
      const mu = musicas.find((fi) => fi.trackName === 'Caftan');
      console.log('Essas são as musicas ', musicas);
      console.log(mu);
    }
  };

  render() {
    const { bandanome, albumnome, albumcompleto, carregando } = this.state;
    // { console.log('Esse é o album completo ', albumcompleto); }
    return (
      <>
        {carregando === true ? <Carregando /> : null}
        <div data-testid="page-album" />
        <h1>Pagina de albuns</h1>
        <p data-testid="artist-name">{bandanome}</p>
        <p data-testid="album-name">{albumnome}</p>
        <h1>Albuns</h1>
        {albumcompleto.slice(1).map((al) => (
          <div key={ al.trackName }>
            <p>{al.trackName }</p>
            <label
              htmlFor="favorits"
            >
              Favorita

            </label>
            <input
              type="checkbox"
              id="favorits"
              onChange={ this.Favoritar }
              data-testid={ `checkbox-music-${al.trackId}` }
            />
            <audio data-testid="audio-component" src={ al.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
            </audio>

          </div>
        ))}
      </>
    );
  }
}

Album.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }) }.isRequired;
export default Album;
