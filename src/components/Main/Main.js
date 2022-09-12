import React from 'react';
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import Portfolio from "../Portfolio/Portfolio";
import PromoNav from "../PromoNav/PromoNav";

export default function Main() {
  return (
    <main>
      <Promo/>
      <PromoNav />
      <AboutProject/>
      <Techs/>
      <Portfolio/>
    </main>
  )
}