import React from 'react';
import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__container">
        <h2 className="about-project__title">О проекте</h2>
        <ul className="about-project__article-list">
          <li className="article">
            <h3 className="article__title">Дипломный проект включал 5 этапов</h3>
            <p className="article__paragraph">
              Составление плана, работу над бэкендом, вёрстку,
              добавление функциональности и финальные доработки.
            </p>
          </li>
          <li className="article">
            <h3 className="article__title">На выполнение диплома ушло 5 недель</h3>
            <p className="article__paragraph">
              У каждого этапа был мягкий и жёсткий дедлайн,
              которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className="scale">
          <div className="scale__small-part">1 неделя</div>
          <div className="scale__big-part">4 недели</div>
          <p className="scale__part-caption">Back-end</p>
          <p className="scale__part-caption">Front-end</p>
        </div>

      </div>
    </section>
  )
}