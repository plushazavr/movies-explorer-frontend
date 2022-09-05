import React from "react";
import "./Menu.css"
import Navigation from "../Navigation/Navigation";

export default function Menu(props) {
  return (
    <div className={`menu ${props.isOpen && "menu_opened"}`}>
      <div className="menu__container">
        <button
          className="menu__close-button"
          onClick={props.onClose}
        />
        <Navigation onClose={props.onClose}/>
      </div>
    </div>
  )
}