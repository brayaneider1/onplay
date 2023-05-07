import React, { createContext } from "react"

export const themes = {
    dark: {
        color: 'white',
        background: 'black'
    },
    ligth: {
        color: 'black',
        background: 'white'
    },
}


const ThemeContext = React.createContext(themes.dark)
export default ThemeContext;
