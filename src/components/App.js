import React, { useState, useEffect } from 'react';
import lozad from 'lozad'

import Book from './Book';
import SideNav from './SideNav';
import Home from './Home';

function App({ routeProps }) {

  const isHome = routeProps.match.url === "/" && routeProps.match.isExact;
  const [data, setData] = useState([]);

  const getData = () => {
    fetch('data.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        myJson.sketchbooks = myJson.sketchbooks.reverse();
        setData(myJson)
      });
  }
  useEffect(() => {
    getData()
  }, []);

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

  return (
    <div className="Content">
      {
        Object.keys(data).length > 0 ? <>
          <SideNav sketchbooks={data.sketchbooks} />
          {isHome
            ? <Home data={data} />
            : <Book data={data} current={routeProps.match.params.page} />
          }
        </> : <p>Loading ...</p>
      }
    </div>
  );
}

export default App;