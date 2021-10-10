import './App.css';
import * as React from 'react';
import Table from './components/table/table';
import Button from '@mui/material/Button';
const axios = require('axios').default;

function App() {
  const [games, setGames] = React.useState(null);
  const URL = 'https://api.npoint.io/35e19105588b7552df5d';

  function load(){
    axios.get(URL)
    .then((response) => {
      let games = response.data.data.map((game, index) => {
        return {...game, id: index, pos: index}
      })
      setGames(games);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  return (
    <div className="App">
      <header className="App-header">
        <p> GamesLib </p>
      </header>
      { games ? <Table data={games}/> :
        <div className="noList-main">
          <p className="noList-text"> У вас еще нет добавленных игр. Нажмите 'Загрузить', чтобы загрузить игры с URL, 
            <br/> или нажмите 'Добавить', чтобы добавить новую игру в ваш список!</p>        
          <div className="noList-buttons">
            <Button variant="contained" onClick={load} className="noList-LoadButton">
              Загрузить
            </Button>
          </div>
        </div>
      }
    </div>
  );
}

export default App;