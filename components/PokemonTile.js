/** @jsxImportSource @emotion/react */
import React from 'react';
import { Paper } from '@mui/material';
import { css, jsx } from '@emotion/react';

import { padLeftWithZero } from '../commons/utils.js';
import TypeBadge from './TypeBadge';

const PokemonTile = (props) => {
  const { data, clickHandler } = props;
  const tileBreakpoint = 360;

  // React.useEffect(() => {

  // }, []);

  // const getPokemonType = async (id) => {
  //   const typesData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  // }

  return (
    <Paper
      component="a"
      css={css`
        display: block;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease-out;
        text-decoration: none;
        cursor: pointer;

        &:hover,
        &:focus {
          transform: translate(0, -0.6rem);
          background-color: #e5f5ff;
        }

        @media (max-width: ${tileBreakpoint - 1}px) {
          padding-bottom: 1.6rem;
        }
        @media (min-width: ${tileBreakpoint}px) {
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          align-items: stretch;
        }
      `}
      onClick={ (e) => {
        e.__payload = data.id;
        clickHandler(e);
      }}
    >
      <figure
        css={css`
          margin: 0;
          object-position: center;
          object-fit: contain;
          background: rgba(0,0,0, 0.05);
          border-radius: 1.2rem;

          > img {
            display: block;
            width: 100%;
            height: 100%;
          }

          @media (min-width: ${tileBreakpoint}px) {
            flex: 9.6rem 1 0;
          }
        `}
      >
        <img
          src={data.image}
          draggable="false"
        />
      </figure>
      <div
        css={css`
          margin: 0;
          @media (max-width: ${tileBreakpoint -1}px) {
            margin-top: 1.2rem;
            text-align: center;
          }
          @media (min-width: ${tileBreakpoint}px){
            flex: 50% 2 1;
            padding-left: 1.2rem;
            padding-top: 0.4rem;
          }
        `}
      >
        <p css={css`
          margin-top: 0;
          margin-bottom: 0.3em;
          color: #555;
          font-size: 1.5rem;
          font-family: 'Fira Sans', sans-serif;
          font-weight: 700;
          letter-spacing: 0.04em;
          line-height: 1;
        `}
        >#&nbsp;{padLeftWithZero(data.id, 3)}</p>
        <p
          css={css`
            margin-top: 0.3em;
            font-size: 2rem;
            font-weight: 700;
            text-transform: capitalize;
          `}
        >{data.name}</p>
        <div css={css`
           > *:not(:last-child) {
            margin-right: 0.6rem
           }
        `}>
          {data.types && data.types.map((type, idx) => {
            return (
              <TypeBadge pokemonType={type} key={idx}>{type}</TypeBadge>
            );
          })}
        </div>
      </div>
    </Paper>
  );
}

export default PokemonTile;
