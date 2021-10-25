/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, jsx } from '@emotion/react';
import axios from 'axios';
import { Autocomplete, TextField, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SearchBar = (props) => {
  return (
    <div
      css={css`
        display: block;
        width: 100%;
        background: blue;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
      `}
    >
      <Autocomplete
        freeSolo
        options={['a,b,c,d']}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />
    </div>
  )
};

export default SearchBar;
