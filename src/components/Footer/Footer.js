import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">© 2021</p>
        <ul className="footer__list">
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://praktikum.yandex.ru/web/"
              rel="noreferrer"
              target="_blank">Яндекс.Практикум</a>
          </li>
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://github.com/plushazavr"
              rel="noreferrer"
              target="_blank">Github</a>
          </li>          
        </ul>
      </div>
    </footer>
  )
}