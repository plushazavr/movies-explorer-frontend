import React from 'react';
import './Promo.css';
import illustration from "../../images/web-pic.svg";

export default function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>   
      <img className="promo__main-illustration" src={illustration} alt="WEB"/>
    </section>
  )
}