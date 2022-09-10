import React from 'react';
import './PromoNav.css';

export default function PromoNav() {
  return (
    <section className='promo__nav'>
      <a className="promo__link" href="#about-project">О проекте</a>
      <a className="promo__link" href="#techs">Технологии</a>
      <a className="promo__link" href="#portfolio">Студент</a>
    </section>
  )
}