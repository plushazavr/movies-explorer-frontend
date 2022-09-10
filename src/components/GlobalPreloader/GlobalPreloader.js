import React from 'react';
import './GlobalPreloader.css'
import Preloader from "../Preloader/Preloader";

export default function GlobalPreloader({ isLoading }) {
  return (
    <div className={`global-preloader ${isLoading && 'global-preloader_enabled'}`}>
      <Preloader/>
    </div>
  )
}