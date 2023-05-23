import { BrowserRouter, Route, Switch } from 'react-router-dom';

import React from 'react';
import Login from '../components/Login';
import Search from '../components/Search';
import Album from '../components/Album';
import Profile from '../components/Profile';
import ProfileEdit from '../components/ProfileEdit';
import Favorites from '../components/Favorites';
import NotFound from '../components/NotFound';

class Paginas extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search"><Search /></Route>
          <Route path="/album/:id"><Album /></Route>
          <Route path="/profile/edit"><ProfileEdit /></Route>
          <Route path="/profile" component={ Profile } />
          <Route path="/favorites"><Favorites /></Route>
          <Route path="*"><NotFound /></Route>
        </Switch>
      </BrowserRouter>

    );
  }
}
export default Paginas;
