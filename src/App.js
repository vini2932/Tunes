import React from 'react';
import Paginas from './pages/Paginas';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <p>TrybeTunes</p>
        <Paginas />
      </>
    );
  }
}

export default App;
