import React, { useState, useEffect } from 'react';
import lozad from 'lozad'

import data from "./../data.json";

import Book from './Book';
import SideNav from './SideNav';
import Home from './Home';

function App({ routeProps }) {
  console.log( routeProps );

  const isHome = routeProps.match.path !== '/sketchbook/:page';


  /* 
    Lazy Load Images
  */
  const { observe } = lozad("[data-use-lozad]", {
    threshold: 0.1,
    loaded: (el) => {
      el.classList.add("is-Visible");
    },
  });

  useEffect(() => {
    observe();
  }, [observe]);

  useEffect(() => {
    console.log(data);
  }, [observe]);

  return (
    <div className="Content">
          <SideNav sketchbooks={data.sketchbooks} />
          {isHome
            ? <Home data={data} />
            : <Book data={data} current={routeProps.match.params.page} />
          }
    </div>
  );
}

export default App;