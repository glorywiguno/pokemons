import React from 'react';

export const DataContext = React.createContext({ });

/*
 *
 */
function PokemonProvider(props) {
  const { value, children } = props;

  return (
    <DataContext.Provider
      value={{
        ...props.value
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};


export default PokemonProvider;
