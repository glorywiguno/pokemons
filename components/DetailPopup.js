/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, jsx } from '@emotion/react';
import axios from 'axios';
import { Modal, Paper, LinearProgress, CircularProgress, Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { padLeftWithZero } from '../commons/utils.js';
import TypeBadge from './TypeBadge';


/**
 * StyledBar
 * extension of LinearProgress used to show status point for
 * Pokemon Status
 *
 * just a note, the max base stats for a pokemon is 255
 * refer to https://bulbapedia.bulbagarden.net/wiki/Base_stats#:~:text=A%20species%27%20base%20stats%20range,Pok%C3%A9mon%20species%20has%20in%20battle.
 * @param {*} props
 * @returns
 */
const StyledBar = (props) => (
  <LinearProgress
    sx={{
      height: '2.4rem',
      borderRadius: '0.5rem'
    }}
    {...props}
  />
);

/**
 * DetailPopup
 * Popup/modal component to show detailed information about a pokemon
 *
 * @param {*} props
 * @returns
 */
const DetailPopup = (props) => {
  const { isOpen, closeHandler, data } = props;
  const [pokemonData, setPokemonData] = React.useState(null);
  const modalBreakpoint = 600;

  React.useEffect(() => {
    if (data != null) {
      getPokemonData(data)
    }
  }, [data]);

  //
  const getPokemonData = async (id) => {
    const fetchedData = await Promise.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${data}/`),
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${data}/`)
      ])
      .then(res => {
        const [basicDataRes, speciesDataRes] = res;
        const {
          id,
          name,
          stats,
          abilities,
          types,
          weight,
          height
        } = basicDataRes.data;
        const { flavor_text_entries } = speciesDataRes.data;

        // gather the results from the endpoints to get the needed data
        const filteredData = {
          id: id,
          name: name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          height: (height * 0.1).toFixed(2),
          weight: (weight * 0.1).toFixed(2),
          stats: stats.map(item => {
            let statName = item.stat.name;

            // to shorten some status name
            switch (item.stat.name) {
              case 'special-attack':
                statName = 'sp-atk'
                break;
              case 'special-defense':
                statName = 'sp-def'
                break;
              default:
                break;
            }

            return {
              name: statName,
              value: item.base_stat
            };
          }),
          abilities: abilities.map(item => item.ability.name),
          types: types.map(item => item.type.name),
          flavor_text: flavor_text_entries.length > 0 ? flavor_text_entries[0].flavor_text : ''
        };

        // set the state
        setPokemonData(filteredData);

        return filteredData;
      });

    return fetchedData;
  }

  // function for popup handling close
  const handleClose = (e) => {
    setPokemonData(null);
    closeHandler(e);
  }

  return(
    <Modal
      cx={{outline:'none'}}
      open={isOpen}
      onClose={handleClose}
    >
      <Paper
        css={css`
          position: absolute;
          display: flex;
          flex-flow: column nowrap;
          justify-content: flex-start;
          align-items: stretch;
          overflow: visible;
          &::before {
            border-radius: 2rem;
            z-index: 2;
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            display: block;
            height: 4.5rem;
            background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 60%);
          }

          @media(max-width: ${modalBreakpoint -1}px) {
            bottom: 0;
            left: 0;
            width: 100%;
            height: 75%;
            padding-left: 6.5%;
            padding-right: 6.5%;
          }

          @media(min-width: ${modalBreakpoint}px) {
            top: 55%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 65vw;
            max-height: 60vh;
            padding: 2rem;
          }
        `}
      >
        {pokemonData != null
          ? (
            <>
              <img
                src={pokemonData.image}
                css={css`
                  display: block;
                  position: absolute;
                  background: #e9e9e9;
                  border-radius: 100%;
                  box-shadow: 0 0 0 0.8rem #fff;

                  @media(max-width: ${modalBreakpoint - 1}px) {
                    top: 0;
                    left: 2.5rem;
                    width: 14rem;
                    transform: translate(0, -50%);
                  }
                  @media(min-width: ${modalBreakpoint}px) {
                    z-index: 5;
                    top: 0;
                    left: 0;
                    width: 16rem;
                    transform: translate(-20%, -50%);
                  }
                `}
                dragabble="false"
              />
              <button
                onClick={handleClose}
                css={css`
                position: absolute;
                z-index:6;
                background-color: #F26666;
                border: none;
                border-radius: 100%;
                width: 1em;
                height: 1em;
                padding: 0;
                font-size: 4.2rem;
                text-align: center;
                line-height: 1;
                color: #fff;
                border: 3px solid #fff;
                cursor: pointer;
                transition: all 0.3s ease-out;

                &:hover,
                &:focus {
                  background-color: #c22e2e;
                }

                > .MuiSvgIcon-root {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
                @media(max-width: ${modalBreakpoint - 1}px) {
                  top: -2rem;
                  right: 1rem;
                }
                @media(min-width: ${modalBreakpoint}px) {
                  top: -2rem;
                  right: -2rem;
                }
              `}><CloseIcon/></button>
              <section
                css={css`
                  overflow: scroll;
                  padding-bottom: 4rem;
                  @media(max-width: ${modalBreakpoint - 1}px) {
                    margin-top: 10.5rem;
                    height: 100%;
                  }
                  @media(min-width: ${modalBreakpoint}px) {
                    margin-top: 7.4rem;
                  }
                `}
              >
                <h2
                  css={css`
                    position: absolute;
                    display: block;
                    margin-top: 0;
                    margin-bottom: 0;
                    font-size: 1.8em;
                    font-family: 'Fira Sans', sans-serif;
                    line-height: 1.2;
                    text-transform: capitalize;
                    letter-spacing: 0.02em;
                    z-index: 4;

                    .pokemon-id {
                      opacity: 0.6;
                    }

                    .pokemon-name,
                    .pokemon-id {
                      position: relative;
                    }

                    @media(max-width: ${modalBreakpoint - 1}px) {
                      padding-left: 6.5%;
                      padding-right: 6.5%;
                      top: 3rem;
                      left: 0;
                      width: 100%;
                      text-align: right;

                      .pokemon-id {
                        display: block;
                        font-size: 1.8rem;
                        margin-bottom: 2.2rem;
                      }
                    }

                    @media(min-width: ${modalBreakpoint}px) {
                      display: inline-block;
                      top: 0;
                      left: 14.6rem;
                      max-width: calc(100% - 9rem);
                      transform: translate(0, -50%);

                      &::before {
                        position: absolute;
                        content: "";
                        display: block;
                        width: 155%;
                        height: 145%;
                        top: 50%;
                        left: 40%;
                        transform: translate(-50%, -50%) skew(19deg);
                        background: #e5f5ff;
                        border-radius: 0.4rem;
                        box-shadow: 0.8rem 0.8rem 0 0 #93a6c2;
                      }
                    }
                  `}
                >
                  <div className="pokemon-id">
                    #&nbsp;{padLeftWithZero(pokemonData.id,3)}
                  </div>
                  <div class="pokemon-name">{pokemonData.name.slice()}</div>
                </h2>
                <div>
                  <table
                    css={css`
                      width: 100%;
                      vertical-align: top;
                      tr {
                        align-item: center;
                      }
                      td, th {
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        vertical-align: top;
                      }
                      th {
                        font-weight: 700;
                        text-align: left;
                        padding-right: 0.4rem;
                      }
                    `}
                  >
                    <tr>
                      <th>TYPE</th>
                      <td>
                        {pokemonData.types.map((type, idx) => {
                          return (
                            <TypeBadge css={css`:not(:last-child) {margin-right: 0.4rem}`}pokemonType={type} key={'psttp'+pokemonData+idx}>{type}</TypeBadge>
                          );
                        })}
                      </td>
                    </tr>

                    <tr>
                      <th>HEIGHT</th>
                      <td> {pokemonData.height}m </td>
                    </tr>
                    <tr>
                      <th>WEIGHT</th>
                      <td> {pokemonData.weight}kg </td>
                    </tr>
                    <tr>
                      <th>NOTES</th>
                      <td>
                        {pokemonData.flavor_text}
                      </td>
                    </tr>

                    {pokemonData.stats.map((item, idx) => {
                      return (
                        <tr
                          key={'pst' + pokemonData.id + item.name + idx}
                        >
                          <th>{item.name.replace('-', ' ').toUpperCase()}</th>
                          <td >
                            <div
                              css={css`
                                position: relative;

                                .stat-num {
                                  line-height: 1;
                                  position: absolute;
                                  top: 50%;
                                  left: 0.8rem;
                                  z-index: 10;
                                  color: #fff;
                                  text-shadow: 0.1em 0.1em #888;
                                  transform: translate(0, -50%)
                                }
                              `}
                            >
                              <div className="stat-num"><b>{item.value}</b></div>
                              <StyledBar variant="determinate" value={item.value/256 * 100} />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </table>

                </div>
              </section>
            </>
          )
          : (
            <div style={{display: 'block', width: '100%', height: '100%'}}><CircularProgress /></div>
        )}

      </Paper>
    </Modal>
  )
}

export default DetailPopup;
