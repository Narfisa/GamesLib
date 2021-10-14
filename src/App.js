import './App.css';
import * as React from 'react';
import Table from './components/table/table';
import SortSelect from './components/sortSelect/sortSelect';
import Button from '@mui/material/Button';
import redBin from './icons/red bin.png'

const axios = require('axios').default;

function App() {
  const [games, setGames] = React.useState(null);
  const [deletingGame, setDeletingGame] = React.useState(null);
  const URL = 'https://api.npoint.io/35e19105588b7552df5d';
  const [dragOver, setDragOver] = React.useState(false);

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

  function deleteGame(e){
    setDragOver(false);
    let index = games.findIndex(item => item.id === deletingGame.id)
    games.splice(index,1)
    setGames([...games]);
    setDeletingGame(null);
  }

  function deleteDragOver(e){
    e.preventDefault();
    e.target.style.background = "#FFCDD2";
    e.target.style.border = "3px dashed #EF5350";
    setDragOver(true)
  }

  function deleteDragEnd(e){
    setDragOver(false);
    setDeletingGame(null);
  }

  function deleteDragLeave(e){
    setDragOver(false);
    e.target.style.background = "#B2EBF2";
    e.target.style.border = "3px dashed #26C6DA";
  }

  function handleSort(value){
    let arr = games;
    if (value === 'DESC'){
      arr.sort(function (a,b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return -1
        }
        return 1
      })
    } else {
      arr.sort(function (a,b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1
        }
        return 1
      });
    }
    arr = arr.map((item, index) => {
      return {...item, pos: index};
    });
    setGames([...arr]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p> GamesLib </p>
      </header>
      { games ? <div className="table-root">
          <div className="abc"> <SortSelect sortList={handleSort} className="sortSelect"/> </div>
          { deletingGame &&  
          <div className="deleteDrop" 
          onDrop={(e) => deleteGame(e)} 
          onDragOver={(e) => deleteDragOver(e)} 
          onDragLeave={(e) => deleteDragLeave(e)} 
          onDragEnd={(e) => deleteDragEnd(e)}
          > 
            { dragOver ? <img src={redBin} alt="red trash" className="redBin"/> : <span className="deleteText"> Переместите сюда игру чтобы удалить </span>}
          </div>
          }
          <Table key={games} data={games} setDeletingGame={setDeletingGame} setData={setGames} currentGame={deletingGame} setCurrentGame={setDeletingGame}/> 
        </div> :
        <div className="noList-main">
          <p className="noList-text"> У вас еще нет добавленных игр. Нажмите 'Загрузить', чтобы загрузить игры с URL, 
            <br/> или нажмите 'Добавить', чтобы добавить новую игру в ваш список!</p>        
          <div className="noList-buttons">
            <Button size="large" variant="contained" onClick={load} className="noList-LoadButton">
              Загрузить
            </Button>
          </div>
        </div>
      }
    </div>
  );
}

export default App;