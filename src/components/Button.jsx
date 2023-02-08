import React from 'react'
import style from "./Button.css"

function Button({text, color}) {
  return (
    <button className={color}>{text}</button>
  )
}

export default Button