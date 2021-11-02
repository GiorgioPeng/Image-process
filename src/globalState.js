import React, { useState, createContext, useContext, } from 'react';

const GloalStateContext = createContext(null)

const initState = {
    imageSrc:'',
    image:'',
    imageData:'',
    red:'',
    green:'',
    blue:'',
    alpha:'',

};
export function GlobalStateProvider({ children }) {
    const [state, setState] = useState(initState);

    const updateState = (key, value) => {
        console.log(key, value)
        setState((lastState) => {
            return {
                ...lastState,
                [key]: value
            }
        })
    }
    const resetState = () => {
        setState(initState)
    }
    return (
        <GloalStateContext.Provider value={[state, updateState, resetState]}>
            {children}
        </GloalStateContext.Provider>
    )
}
export function useGlobalState() {
    return useContext(GloalStateContext)
}