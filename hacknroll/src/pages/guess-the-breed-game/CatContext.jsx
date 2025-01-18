import { createContext, useState, useContext } from "react";

const CatContext = createContext()

export const CatProvider = ({children}) => {
    
    const [breed, setBreed] = useState('')

    return (
        <CatContext.Provider value={{breed, setBreed}}>
            {children}
        </CatContext.Provider>
    )
}

export const useCatContext = () => useContext(CatContext)