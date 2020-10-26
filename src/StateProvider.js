import React, { createContext, useContext, useReducer } from 'react';

//create data layer (state)
export const StateContext = createContext();

//Consuming data from the children or put data from the children to data layer (state) using useReducer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Pull information form data layer
export const useStateValue = () => useContext(StateContext);
