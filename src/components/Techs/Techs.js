import React from 'react';
import './Techs.css'

export default function Techs() {
  return (
    <section className="techs">
      <div className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <article className="techs__article">
          <h3 className="techs__article-title">7 технологий</h3>
          <p className="techs__article-paragraph">
            На курсе веб-разработки мы освоили технологии,
            которые применили в дипломном проекте.
          </p>
        </article>
        <ul className="techs__list">
          <li className="techs__element">HTML</li>
          <li className="techs__element">CSS</li>
          <li className="techs__element">JS</li>
          <li className="techs__element">React</li>
          <li className="techs__element">Git</li>
          <li className="techs__element">Express.js</li>
          <li className="techs__element">mongoDB</li>
        </ul>
      </div>
    </section>
  )
}