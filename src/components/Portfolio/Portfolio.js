import React from 'react';
import './Portfolio.css';
import avatar from '../../images/avatar.jpg'

export default function Portfolio() {
  return (
    <section className="portfolio" id='portfolio'>
      <div className="portfolio__container">
        <h2 className="portfolio__title">Студент</h2>
        <article className="about">
          <div>
            <h3 className="about__name">Екатерина</h3>
            <p className="about__profession">Фронтенд-разработчик, 28 лет</p>
            <p className="about__bio">Я родилась в Чите, сейчас живу в Санкт-Петербурге. Закончила лечебный факультет ЧГМА.  Люблю читать комиксы и геймить, воспитываю двух собак и кота. Недавно начала кодить. Сейчас работаю в компании «Lifetime+». Прошла курс по веб-разработке и хочу связать свою дальнейшую карьеру с дизайном и разработкой веб-интерфейсов.
            </p>
            <ul className="about__links-list">
               <li className="about__links-element">
                <a className="about__link"
                   href="https://github.com/plushazavr"
                   rel="noreferrer"
                   target="_blank">Github
                </a>
              </li>
            </ul>
          </div>
          <img className="about__photo" src={avatar} alt="Аватар"/>
        </article>
        <h3 className="portfolio__subtitle">Портфолио</h3>
        <ul className="portfolio__links-list">
          <li className="portfolio__links-element">
            <a
              className="portfolio__link"
              href="https://github.com/plushazavr/how-to-learn"
              rel="noreferrer"
              target="_blank">Статичный сайт
              <div className="portfolio__arrow">↗</div>
            </a>
          </li>
          <li className="portfolio__links-element">
            <a
              className="portfolio__link"
              href="https://github.com/plushazavr/russian-travel"
              rel="noreferrer"
              target="_blank">Адаптивный сайт
              <div className="portfolio__arrow">↗</div>
            </a>
          </li>
          <li className="portfolio__links-element">
            <a
              className="portfolio__link"
              href="https://github.com/plushazavr/react-mesto-api-full"
              rel="noreferrer"
              target="_blank">Одностраничное приложение
              <div className="portfolio__arrow">↗</div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}