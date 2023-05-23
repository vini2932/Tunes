import React from 'react';

class Profile extends React.Component {
  Funcao = () => {
    console.log(this.props);
  };

  render() {
    return (
      <div data-testid="page-profile">
        <h1>Pagina do Profile</h1>
        <button onClick={ this.Funcao }>Teste</button>
      </div>
    );
  }
}

export default Profile;
