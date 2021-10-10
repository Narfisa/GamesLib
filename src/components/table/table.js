import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import './table.css';

export default function Table(props) {
  const [games, setGames] = React.useState(props.data);  
  const [currentGame, setCurrrentGame] = React.useState(null);

  function imgClick(url){
    console.log(url);
    window.open(url);
  }

  function dragStart(e, item){
    setCurrrentGame(item);
  }

  function dragEnd(e){  
    e.target.style.opacity = "1";    
  }

  function dragOver(e){
    e.preventDefault();
    e.target.style.opacity = "0.5";      
  }
  
  function drop(e, item){    
    e.preventDefault();

    setGames(games.map(c => {
        if (c.id === item.id){
            return {...c, pos: currentGame.pos}
        }
        if (c.id === currentGame.id){
            return {...c, pos: item.pos}
        }
        return c 
    }))

    e.target.style.opacity = "1";   
  }

  const sortGames = (a,b) => {
      if (a.pos > b.pos){
        return 1
      }
      return -1
  }

  return (
    <>
        { games && <ImageList cols={4} gap={10}> 
            { games.sort(sortGames).map((item) => (
                <ImageListItem key={item.id} onClick={() => imgClick(item.icon_url)} 
                draggable={true}
                onDragStart={(e) => dragStart(e,item)}
                onDragLeave={(e) => dragEnd(e)}
                onDrop={(e) => drop(e, item)}
                onDragEnd={(e) => dragEnd(e)}
                onDragOver={(e) => dragOver(e)}
                >
                    <img
                        src={item.icon_url}
                        alt={item.name}
                        loading="lazy"
                    />
                    <ImageListItemBar title={item.name} position="bottom"/>
                </ImageListItem>
            ))}
        </ImageList> } 
    </>
  );
}
