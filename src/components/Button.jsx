import React from 'react'
import style from "./Button.css"

function Button({text, color, onclick}) {
  return (
    <button onClick={onclick} className={color}>{text}</button>
  )
}

export default Button