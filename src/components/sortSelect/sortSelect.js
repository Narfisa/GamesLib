import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectAutoWidth(props) {
    const [sort, setSort] = React.useState('');

    const handleChange = (event) => {
      setSort(event.target.value);
      props.sortList(event.target.value);
    };
   
    return (
      <>
        <FormControl sx={{ m: 1, minWidth: 180 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Сортировка</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            autoWidth
            value={sort}
            onChange={handleChange}
            label="Сортировка"
          >
            <MenuItem value='ASC'>По возрастанию</MenuItem>
            <MenuItem value='DESC'>По убыванию</MenuItem>
          </Select>
        </FormControl>
      </>
    );
}