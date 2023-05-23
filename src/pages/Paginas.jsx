import { Switch, Route } from 'react-router-dom/';
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

      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/profile" component={ Profile } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="*" component={ NotFound } />
      </Switch>

    );
  }
}
export default Paginas;
