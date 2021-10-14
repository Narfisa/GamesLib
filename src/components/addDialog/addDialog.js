import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog(props) {
  const[name,setName] = React.useState("")
  const[url,setURL] = React.useState("")

  function nameChange(e){
    setName(e.target.value)
  }

  function urlChange(e){
    setURL(e.target.value)
  }

  function handleAdd(){
    if (name && url){
      props.add(name, url);
      props.close()
    }
  };

  function handleClose(){
    props.close()
  };

  return (
    <div>
      <Dialog open={props.isOpen} onClose={handleClose}>
        <DialogTitle>Добавить</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Укажите название игры и url её изображения.
          </DialogContentText>
          <TextField 
            onChange={e => nameChange(e)}
            required autoFocus margin="dense" fullWidth value={name}
            id="Name" label="Название" type="text" variant="standard"
          />
          <TextField
            onChange={e => urlChange(e)}
            required margin="dense" fullWidth value={url}
            id="url" label="URL" type="text" variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button color="success" onClick={handleAdd}>Добавить</Button>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
