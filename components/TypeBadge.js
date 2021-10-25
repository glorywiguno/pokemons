import React from 'react';
import styled from '@emotion/styled';

/**
 * colors for the type are taken from https://bulbapedia.bulbagarden.net/wiki/Type#Icons
 */
const TypeBadge = styled.span`
  background-color: ${props => {
    switch(props.pokemonType) {
      case 'normal':
        return 'rgb(132,142,150)';
      case 'fighting':
        return 'rgb(208,56,95)';
      case 'flying':
        return 'rgb(128,158,213)';
      case 'poison':
        return 'rgb(165,95,190)';
      case 'ground':
        return 'rgb(220,108,67)';
      case 'rock':
        return 'rgb(194,174,131)';
      case 'bug':
        return 'rgb(129,185,54)';
      case 'ghost':
        return 'rgb(68,94,159)';
      case 'steel':
        return 'rgb(72,131,149)';
      case 'fire':
        return 'rgb(255,145,82)';
      case 'water':
        return 'rgb(54,133,204)';
      case 'grass':
        return 'rgb(76,178,86)';
      case 'electric':
        return 'rgb(246,204,69)';
      case 'psychic':
        return 'rgb(255,102,109)';
      case 'ice':
        return 'rgb(91,199,184)';
      case 'dragon':
        return 'rgb(0,98,185)';
      case 'dark':
        return 'rgb(80,73,90)';
      case 'fairy':
        return 'rgb(240,132,223)';
      default:
        return 'rgb(60,60,60)';
    }
  }};
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 1rem;
  font-size: 1.4rem;
  font-weight: 700;
  font-family: 'Fira Sans', sans-serif;
  color: #fff;
  text-transform: uppercase;
  text-align:center;
  text-shadow: 0.1em 0.1em #888;
`;

export default TypeBadge;
