import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class Album extends React.Component {
  state = {
    bandanome: '',
    albumnome: '',
    albumcompleto: [],
    idBanda: 0,
    carregando: false,
    MusicasFavoritas: [],
    checado: false,
    checar: [false, false, false, false],
  };

  constructor() {
    super();
    this.element = React.createRef();
  }

  componentDidMount() {
    const { albumcompleto } = this.state;
   // console.log("Esse é o album completo," ,albumcompleto);
    this.PegarBanda();
    this.PegarFavoritas();
    /*albumcompleto.slice(1).forEach((el, indice) => {
      this.Verify(el.trackName, indice);
    });*/
  }

  PegarFavoritas = async () => {
    const { albumcompleto } = this.state;
    const listafavoritas = await getFavoriteSongs();
    //console.log('Essa é a lista favoritada ', listafavoritas);
    /* listafavoritas.forEach((fi) => {
    albumcompleto.forEach((al) => {
      fi.trackName === al.trackName
      console.log("Foi achado")
    })
  }) */
    this.setState({
      MusicasFavoritas: listafavoritas,
    });
  };

  PegarBanda = async () => {
    const { history } = this.props;
    const {albumcompleto} = this.state
    const id = history.location.pathname.split('/')[2];
    console.log(id);
    this.setState({
      idBanda: id,
    });
    const banda = await getMusics(id);
    console.log('Essa é a banda ', banda);
    banda.slice(1).forEach((el, indice) => {
      this.Verify(el.trackName, indice);
    });
    this.setState({
      albumcompleto: [...banda],
      bandanome: banda[0].artistName,
      albumnome: banda[0].collectionName,
    }/*,() => {
      albumcompleto.slice(1).forEach((el, indice) => {
        this.Verify(el.trackName, indice);
      });
    }*/);
  };

  MudarCheck = (i) => {
   /* const { checar } = this.state;
    const atualizar = checar;
    console.log('Atualizar antes', atualizar);
    atualizar[i] = !atualizar[i];
    console.log('Valor de atualizar, ', atualizar);
    // checar[i] = atualizar[i]
    // console.log("atualizar checar" ,checar);
    this.setState({
      checar: atualizar,
    });*/
      this.setState((prevState) => {
        const checarAtualizado = [...prevState.checar]; // Crie uma cópia atualizada do estado checar
        checarAtualizado[i] = !checarAtualizado[i]; // Atualize o valor do índice desejado
        return {
          checar: checarAtualizado, // Atualize o estado checar com a cópia atualizada
        };
      });
    
    

  };

  Favoritar = async (e, index) => {
    this.MudarCheck(index);
    /* if (e.target.checked === false) {
      e.target.checked = true;
    } */
   // console.log("Função foi chamada");
    if (e.target.checked === true) {
      this.setState({
        carregando: true,
      });
      const { albumcompleto } = this.state;
      const nomeMusica = e.target.parentNode.firstChild.innerText;
      let musicaFavoritada = '';
      musicaFavoritada = albumcompleto.find((fi) => fi.trackName === nomeMusica);
      // console.log('Esse é o nome da banda ', nomeMusica);
      // console.log('Essa é a musica favoritada ', musicaFavoritada);

      const { idBanda } = this.state;
      console.log('A musica foi favoritada');
      const musicas = await getMusics(idBanda);
      const AdicionarFavoritos = await addSong(musicaFavoritada);
     // console.log(AdicionarFavoritos);
      this.setState({
        carregando: false,
      });
      const mu = musicas.find((fi) => fi.trackName === 'Caftan');
      //console.log('Essas são as musicas ', musicas);
      //console.log(mu);
    }
  };

  Verify = (e, index) => {
    const { MusicasFavoritas, checar } = this.state;
    const update = checar;
    const ch = MusicasFavoritas.some((mu) => (mu.trackName === e));
    checar[index] = ch;
  };

  render() {
    const { bandanome, albumnome, albumcompleto, carregando, MusicasFavoritas, checado, checar } = this.state;
    // { console.log('Esse é o album completo ', albumcompleto); }
    //console.log('Estado das musicas favoritas ', MusicasFavoritas);

    return (
      <>
        {carregando === true ? <Carregando /> : null}
        <div data-testid="page-album" />
        <h1>Pagina de albuns</h1>
        <p data-testid="artist-name">{bandanome}</p>
        <p data-testid="album-name">{albumnome}</p>
        <h1>Albuns</h1>
        {albumcompleto.slice(1).map((al, index) => (
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
              onClick={ (event) => this.Favoritar(event, index) }
              checked={ checar[index] }
              data-testid={ `checkbox-music-${al.trackId}` }
              // ref={meuElementoRef}
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
