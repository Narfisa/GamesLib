import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import './table.css';

export default function Table(props) {

  function imgClick(url){
    console.log(url);
    window.open(url);
  }

  return (
    <>
        { props.data && <ImageList cols={4} gap={10}> 
            {props.data.map((item) => (
                <ImageListItem key={item.icon_url} onClick={() => imgClick(item.icon_url)}>
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
