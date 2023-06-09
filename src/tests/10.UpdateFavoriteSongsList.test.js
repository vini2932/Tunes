import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as musicsAPI from '../services/musicsAPI';
import * as favoriteSongsAPI from '../services/favoriteSongsAPI';
import renderPath from './helpers/renderPath';
import { defaultUser, musicAPIDefaultResponse } from './mocks';

describe('10 - Faça a requisição para recuperar as músicas favoritas e atualizar a lista após favoritar uma música', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    localStorage.setItem('user', JSON.stringify(defaultUser));
    localStorage.setItem('favorite_songs', JSON.stringify([]));
  });

  afterEach(() => localStorage.clear());

  it('Será validado se a requisição para `getFavoriteSongs` é feita após favoritar uma música',
    async () => {
      jest.spyOn(musicsAPI, 'default').mockImplementation(
        () => Promise.resolve(musicAPIDefaultResponse),
      );
      
      const spy = jest.spyOn(favoriteSongsAPI, 'getFavoriteSongs');

      renderPath("/album/123");

      await waitFor(
        () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
        { timeout: 3000 }
      );

      userEvent.click(screen.getByTestId('checkbox-music-1484688057'));
      await waitFor(
        () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
        { timeout: 3000 }
      );

      expect(spy).toHaveBeenCalled();
    });



  it('Será validado se o número de checkboxes marcados como checked aumenta quando um checkbox é clicado',
    async () => {
      jest.spyOn(musicsAPI, 'default').mockImplementation(
        () => Promise.resolve(musicAPIDefaultResponse),
      );
      

      renderPath("/album/123");

      await waitFor(
        () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
        { timeout: 3000 }
      );

      expect(screen.queryAllByRole('checkbox', { checked: true })).toHaveLength(0);
      expect(screen.getAllByRole('checkbox', { checked: false })).toHaveLength(4);

      userEvent.click(screen.getByTestId('checkbox-music-1484688057'));
      await waitFor(
        () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
        { timeout: 3000 }
      );

      expect(screen.queryAllByRole('checkbox', { checked: true })).toHaveLength(1);
      expect(screen.queryAllByRole('checkbox', { checked: false })).toHaveLength(3);

      userEvent.click(screen.getByTestId('checkbox-music-1484688223'));
      await waitFor(
        () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
        { timeout: 3000 }
      );

      expect(screen.queryAllByRole('checkbox', { checked: true })).toHaveLength(2);
      expect(screen.queryAllByRole('checkbox', { checked: false })).toHaveLength(2);

    });
});
